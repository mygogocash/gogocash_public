// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title CashbackLedger
 * @notice Handles airdrops (utility token) and cashback withdrawals (stablecoin)
 *         using EIP-712 signed authorizations.
 *
 * Key design points
 *  - User withdrawals DO NOT store conversion IDs on-chain (they are only emitted).
 *  - An off-chain worker with WORKER_ROLE records conversion IDs later in one place.
 *  - Strict duplicate prevention: recording reverts if any conversionId was seen before.
 *  - Replay protection for signed messages via used-withdraw digest mapping.
 *  - Admin can update token/stablecoin addresses (with events) if contracts migrate.
 *
 * Glossary
 *  - userid: off-chain user identifier (string). We hash it for on-chain mapping.
 *  - conversionId: off-chain order/conversion number (uint256) recorded to avoid duplicates.
 *  - signerAddress: backend address that signs EIP-712 messages.
 *  - WORKER_ROLE: allowed to record conversion IDs after a withdrawal is processed.
 */
contract CashbackLedger is EIP712, Pausable, ReentrancyGuard, AccessControl {
    using ECDSA for bytes32;
    using SafeERC20 for IERC20;

    // ---------- Custom Errors ----------
    error ZeroAddress();                // provided address is address(0)
    error ZeroAmount();                 // provided amount is 0
    error Expired();                    // signed message is past its expireAt time
    error WalletMismatch();             // msg.sender does not match authorized userAddress
    error BadSigner();                  // signature not produced by signerAddress
    error ReplayMsg();                  // signed message already used
    error HashMismatch();               // client-provided conversionIdsHash does not match recomputed rolling hash
    error DuplicateConversionId();      // a conversionId has already been recorded

    // ---------- Roles ----------
    bytes32 public constant ADMIN_ROLE  = keccak256("ADMIN_ROLE");
    bytes32 public constant WORKER_ROLE = keccak256("WORKER_ROLE");

    // ---------- EIP-712 Typehashes ----------
    // We hash the structured data below with these typehash constants.
    bytes32 public constant AIRDROP_MESSAGE_TYPEHASH =
        keccak256("AirDropMessage(string userid,address userAddress,uint256 pointAmount,uint64 expireAt)");
    bytes32 public constant WITHDRAW_AUTH_BATCH_TYPEHASH =
        keccak256("WithdrawAuthBatch(string userid,address userAddress,uint256 amount,uint64 expireAt,bytes32 conversionIdsHash)");
    bytes32 public constant WITHDRAW_AUTH_SINGLE_TYPEHASH =
        keccak256("WithdrawAuthSingle(string userid,address userAddress,uint256 amount,uint64 expireAt,uint256 conversionId)");

    // ---------- Structs ----------
    /// @dev Signed by backend to allow a utility-token airdrop.
    struct AirDropMessage {
        string userid;          // off-chain user id (plain string)
        address userAddress;    // wallet that will receive the utility token
        uint256 pointAmount;    // amount of utility token to send
        uint64  expireAt;       // unix timestamp; message invalid after this
    }

    /// @dev Signed by backend to authorize a cashback withdrawal (batch of conversions).
    /// @notice The list of conversionIds is not stored here; only its keccak256 hash is signed.
    struct WithdrawAuthBatch {
        string  userid;             // off-chain user id
        address userAddress;        // wallet that will receive stablecoin
        uint256 amount;             // total stablecoin to transfer
        uint64  expireAt;           // unix timestamp; message invalid after this
        bytes32 conversionIdsHash;  // keccak256 hash of the conversionIds array (computed client-side)
    }

    /// @dev Signed by backend to authorize a single-conversion cashback withdrawal.
    struct WithdrawAuthSingle {
        string  userid;
        address userAddress;
        uint256 amount;         // stablecoin to transfer
        uint64  expireAt;
        uint256 conversionId;   // single conversion id covered by this withdrawal
    }

    // ---------- Configurable State ----------
    address public signerAddress;          // backend signer for EIP-712 authorizations
    IERC20  public token;                  // utility token used for airdrops (settable by admin)
    IERC20  public stablecoin;             // stablecoin used for cashback withdrawals (settable by admin)

    // ---------- Replay Protection ----------
    /// @dev digest (EIP-712 hash) => used?
    mapping(bytes32 => bool) public usedWithdrawMsg;

    // ---------- Worker Conversion Tracking ----------
    /// @dev Global record to prevent duplicate conversion IDs ever being re-used
    mapping(uint256 => bool) private _recorded;

    /// @dev Per-user list of recorded conversion IDs (keyed by keccak256(userid))
    mapping(bytes32 => uint256[]) private _conversionIdsByUser;

    // ---------- Events ----------
    event SignerUpdated(address indexed signer);
    event WorkerSet(address indexed worker, bool enabled);

    event AirdropExchanged(string userid, address indexed userWallet, uint256 amount);
    event CashbackWithdrawn(string userid, address indexed userWallet, uint256 amount, uint256[] conversionIds);
    event CashbackWithdrawnSingle(string userid, address indexed userWallet, uint256 amount, uint256 conversionId);

    event ConversionRecordedBatch(string userid, uint256[] conversionIds);

    event TokenAdded(address indexed from, uint256 amount);
    event StableCoinAdded(address indexed from, uint256 amount);
    event TokenWithdrawn(address indexed to, uint256 amount);
    event StableCoinWithdrawn(address indexed to, uint256 amount);

    event TokenUpdated(address indexed newToken);
    event StableCoinUpdated(address indexed newStableCoin);

    // ---------- Constructor ----------
    /**
     * @param _admin             address with admin powers
     * @param _tokenAddress      ERC20 address for utility token airdrops
     * @param _stableCoinAddress ERC20 address for stablecoin cashback
     * @param _signerAddress     backend signer for EIP-712 messages
     * @param _worker            initial worker account allowed to record conversion IDs
     */
    constructor(
        address _admin,
        address _tokenAddress,
        address _stableCoinAddress,
        address _signerAddress,
        address _worker
    ) EIP712("CashbackLedger", "1") {
        // Basic input validation
        if (
            _admin == address(0) ||
            _tokenAddress == address(0) ||
            _stableCoinAddress == address(0) ||
            _signerAddress == address(0)
        ) revert ZeroAddress();

        // Set up roles
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(ADMIN_ROLE, _admin);
        _grantRole(WORKER_ROLE, _worker);

        // Set initial state
        token = IERC20(_tokenAddress);
        stablecoin = IERC20(_stableCoinAddress);
        signerAddress = _signerAddress;

        emit SignerUpdated(_signerAddress);
    }

    // ---------- Admin Controls ----------
    /// @notice Update backend signer address used to verify EIP-712 signatures.
    /// @param _signer New signer address.
    function setSigner(address _signer) external onlyRole(ADMIN_ROLE) {
        if (_signer == address(0)) revert ZeroAddress();
        signerAddress = _signer;
        emit SignerUpdated(_signer);
    }

    /// @notice Grant or revoke the WORKER_ROLE for recording conversions.
    /// @param worker Worker address to grant/revoke.
    /// @param enabled True to grant, false to revoke.
    function setWorker(address worker, bool enabled) external onlyRole(ADMIN_ROLE) {
        if (worker == address(0)) revert ZeroAddress();
        if (enabled) _grantRole(WORKER_ROLE, worker);
        else _revokeRole(WORKER_ROLE, worker);
        emit WorkerSet(worker, enabled);
    }

    /// @notice Update the stablecoin address.
    /// @param _stableCoinAddress New ERC20 stablecoin address.
    function setStableCoin(address _stableCoinAddress) external onlyRole(ADMIN_ROLE) {
        if (_stableCoinAddress == address(0)) revert ZeroAddress();
        stablecoin = IERC20(_stableCoinAddress);
        emit StableCoinUpdated(_stableCoinAddress);
    }

    /// @notice Update the utility token address.
    /// @param _tokenAddress New ERC20 token address.
    function setToken(address _tokenAddress) external onlyRole(ADMIN_ROLE) {
        if (_tokenAddress == address(0)) revert ZeroAddress();
        token = IERC20(_tokenAddress);
        emit TokenUpdated(_tokenAddress);
    }

    /// @notice Pause all state-changing functions guarded by whenNotPaused.
    function pause() external onlyRole(ADMIN_ROLE) { _pause(); }

    /// @notice Unpause previously paused functionality.
    function unpause() external onlyRole(ADMIN_ROLE) { _unpause(); }

    // ---------- EIP-712 Hash Helpers ----------
    /// @dev Compute EIP-712 digest for AirDropMessage.
    /// @param m AirDropMessage struct to hash.
    function _hashAirDrop(AirDropMessage calldata m) internal view returns (bytes32) {
        return _hashTypedDataV4(
            keccak256(
                abi.encode(
                    AIRDROP_MESSAGE_TYPEHASH,
                    keccak256(bytes(m.userid)),
                    m.userAddress,
                    m.pointAmount,
                    m.expireAt
                )
            )
        );
    }

    /// @dev Compute EIP-712 digest for WithdrawAuthBatch.
    /// @param m WithdrawAuthBatch struct to hash.
    function _hashWithdrawBatch(WithdrawAuthBatch calldata m) internal view returns (bytes32) {
        return _hashTypedDataV4(
            keccak256(
                abi.encode(
                    WITHDRAW_AUTH_BATCH_TYPEHASH,
                    keccak256(bytes(m.userid)),
                    m.userAddress,
                    m.amount,
                    m.expireAt,
                    m.conversionIdsHash
                )
            )
        );
    }

    /// @dev Compute EIP-712 digest for WithdrawAuthSingle.
    /// @param m WithdrawAuthSingle struct to hash.
    function _hashWithdrawSingle(WithdrawAuthSingle calldata m) internal view returns (bytes32) {
        return _hashTypedDataV4(
            keccak256(
                abi.encode(
                    WITHDRAW_AUTH_SINGLE_TYPEHASH,
                    keccak256(bytes(m.userid)),
                    m.userAddress,
                    m.amount,
                    m.expireAt,
                    m.conversionId
                )
            )
        );
    }

    // ---------- Airdrop (Utility Token) ----------
    /**
     * @notice Send utility tokens to a user according to a signed airdrop message.
     * @dev Signature is validated against signerAddress using EIP-712 typed data.
     * @param msg_ Signed airdrop message.
     * @param signature Backend signature that proves authorization.
     */
    function exchangeAirDrop(
        AirDropMessage calldata msg_,
        bytes calldata signature
    ) external whenNotPaused nonReentrant {
        if (msg_.userAddress == address(0)) revert ZeroAddress();
        if (block.timestamp > msg_.expireAt) revert Expired();

        // Validate signature
        address recovered = ECDSA.recover(_hashAirDrop(msg_), signature);
        if (recovered != signerAddress) revert BadSigner();

        // Transfer utility token
        token.safeTransfer(msg_.userAddress, msg_.pointAmount);
        emit AirdropExchanged(msg_.userid, msg_.userAddress, msg_.pointAmount);
    }

    // ---------- Withdraw (Stablecoin) — no on-chain storage of conversion IDs ----------
    /**
     * @notice Withdraw cashback with a batch authorization. The list of conversion IDs is not stored,
     *         only emitted. A worker later records the same IDs for deduplication and auditing.
     * @param msg_          Signed withdraw batch message with hashed conversion IDs.
     * @param conversionIds Raw conversion IDs corresponding to msg_.conversionIdsHash.
     * @param signature     EIP-712 signature by signerAddress.
     */
    function withdrawCashback(
        WithdrawAuthBatch calldata msg_,
        uint256[] calldata conversionIds,
        bytes calldata signature
    ) external whenNotPaused nonReentrant {
        // Basic checks
        if (msg_.userAddress != msg.sender) revert WalletMismatch();
        if (block.timestamp > msg_.expireAt) revert Expired();

        // Replay protection
        bytes32 digest = _hashWithdrawBatch(msg_);
        if (usedWithdrawMsg[digest]) revert ReplayMsg();

        // Signature verification
        address recovered = ECDSA.recover(digest, signature);
        if (recovered != signerAddress) revert BadSigner();

        // Recompute rolling hash to ensure the provided IDs match the signed hash
        bytes32 rolling;
        for (uint256 i; i < conversionIds.length; ) {
            rolling = keccak256(abi.encodePacked(rolling, conversionIds[i]));
            unchecked { ++i; }
        }
        if (rolling != msg_.conversionIdsHash) revert HashMismatch();

        // Mark message used and pay stablecoin
        usedWithdrawMsg[digest] = true;
        stablecoin.safeTransfer(msg_.userAddress, msg_.amount);

        // Emit the IDs for off-chain processing (not stored here)
        emit CashbackWithdrawn(msg_.userid, msg_.userAddress, msg_.amount, conversionIds);
    }

    /**
     * @notice Withdraw cashback for a single conversion ID.
     * @dev Works the same as batch, but includes the ID directly in the signed struct.
     * @param msg_       Signed withdraw single message.
     * @param signature  EIP-712 signature by signerAddress.
     */
    function withdrawCashbackSingle(
        WithdrawAuthSingle calldata msg_,
        bytes calldata signature
    ) external whenNotPaused nonReentrant {
        if (msg_.userAddress != msg.sender) revert WalletMismatch();
        if (block.timestamp > msg_.expireAt) revert Expired();

        // Replay protection
        bytes32 digest = _hashWithdrawSingle(msg_);
        if (usedWithdrawMsg[digest]) revert ReplayMsg();

        // Signature verification
        address recovered = ECDSA.recover(digest, signature);
        if (recovered != signerAddress) revert BadSigner();

        // Mark message used and pay stablecoin
        usedWithdrawMsg[digest] = true;
        stablecoin.safeTransfer(msg_.userAddress, msg_.amount);

        emit CashbackWithdrawnSingle(msg_.userid, msg_.userAddress, msg_.amount, msg_.conversionId);
    }

    // ---------- Worker Record (post-withdrawal) ----------
    /**
     * @notice Record conversion IDs after a withdrawal has been processed.
     * @dev Reverts immediately if ANY ID in the batch was already recorded, ensuring strict
     *      deduplication. This lets backends retry safely knowing partial writes won't happen.
     * @param userid        Off-chain user id used as the logical owner of these conversions.
     * @param conversionIds Array of conversion IDs to record. Reverts if any is a duplicate.
     */
    function recordConversionId(
        string calldata userid,
        uint256[] calldata conversionIds
    ) external onlyRole(WORKER_ROLE) whenNotPaused {
        bytes32 key = keccak256(bytes(userid));
        uint256 n = conversionIds.length;
        for (uint256 i; i < n; ) {
            uint256 id = conversionIds[i];

            // Strict duplicate check
            if (_recorded[id]) revert DuplicateConversionId();

            _recorded[id] = true;
            _conversionIdsByUser[key].push(id);

            unchecked { ++i; }
        }
        emit ConversionRecordedBatch(userid, conversionIds);
    }

    // ---------- View Functions ----------
    /// @notice Return all recorded conversion IDs for a given userid.
    /// @param userid Off-chain user id to query.
    function getConversionIdsByUserId(string calldata userid)
        external
        view
        returns (uint256[] memory)
    {
        return _conversionIdsByUser[keccak256(bytes(userid))];
    }

    /// @notice Check if a conversionId has ever been recorded.
    /// @param conversionId Conversion ID to check.
    function isRecorded(uint256 conversionId) external view returns (bool) {
        return _recorded[conversionId];
    }

    // ---------- Treasury (admin-managed balances) ----------
    /// @notice Deposit utility token into the contract treasury.
    /// @param amount Amount of utility token to add.
    function addToken(uint256 amount) external onlyRole(ADMIN_ROLE) whenNotPaused {
        if (amount == 0) revert ZeroAmount();
        token.safeTransferFrom(msg.sender, address(this), amount);
        emit TokenAdded(msg.sender, amount);
    }

    /// @notice Deposit stablecoin into the contract treasury.
    /// @param amount Amount of stablecoin to add.
    function addStableCoin(uint256 amount) external onlyRole(ADMIN_ROLE) whenNotPaused {
        if (amount == 0) revert ZeroAmount();
        stablecoin.safeTransferFrom(msg.sender, address(this), amount);
        emit StableCoinAdded(msg.sender, amount);
    }

    /// @notice Withdraw utility token from the treasury to a recipient.
    /// @param to Recipient address to receive the utility token.
    /// @param amount Amount of utility token to withdraw.
    function withdrawToken(address to, uint256 amount) external onlyRole(ADMIN_ROLE) {
        if (to == address(0)) revert ZeroAddress();
        token.safeTransfer(to, amount);
        emit TokenWithdrawn(to, amount);
    }

    /// @notice Withdraw stablecoin from the treasury to a recipient.
    /// @param to Recipient address to receive the stablecoin.
    /// @param amount Amount of stablecoin to withdraw.
    function withdrawStableCoin(address to, uint256 amount) external onlyRole(ADMIN_ROLE) {
        if (to == address(0)) revert ZeroAddress();
        stablecoin.safeTransfer(to, amount);
        emit StableCoinWithdrawn(to, amount);
    }

    /// @dev Register my contract on Sonic FeeM
    function registerMe() external {
        (bool _success,) = address(0xDC2B0D2Dd2b7759D97D50db4eabDC36973110830).call(
            abi.encodeWithSignature("selfRegister(uint256)", 208)
        );
        require(_success, "FeeM registration failed");
    }


}
