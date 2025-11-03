import { ethers, keccak256, solidityPacked } from 'ethers';
import contractPolygonAbi from '@/constants/abi/CashbackLedgerPolygonAbi.json';
import contractBNBAbi from '@/constants/abi/CashbackLedgerBNBAbi.json';
import contractSonicAbi from '@/constants/abi/CashbackLedgerSonicAbi.json';
import { useEffect, useState } from 'react';
import client from '@/lib/client';
import toast from 'react-hot-toast';
import { ResponseWithdrawCheck } from '@/features/desktop/withdraw/interface';
// Extend Window interface to include ethereum property
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}
export const chainAll = [
  {
    label: 'Sonic',
    value: Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_SONIC),
  },
  {
    label: 'Polygon',
    value: Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_POLYGON),
  },
  {
    label: 'BNB',
    value: Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_BNB),
  },
];
export class CreateWithdrawDto {
  tx_hash?: string;
  address?: string;
  account_name?: string;
  bank_name?: string;
  account_number?: string;
  conversion_ids?: number[];
  percent_fee?: number;
  amount_total?: number;
  amount_net?: number;
  method?: string;
  currency?: string;
  chain?: number;
}

const useWithdrawWeb3 = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [chainIdSelect, setChainIdSelect] = useState<number | null>(
    chainAll?.[0]?.value
  ); //14601 80002 97
  const [loading, setLoading] = useState<boolean>(false);
  const checkAccount = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        if (provider) {
          const signer = await provider.getSigner();
          const network = await provider.getNetwork();
          const address = await signer.getAddress();

          setAccount(address);
          setChainId(Number(network.chainId));

          //   console.log('✅ Wallet connected:', address);
          //   console.log('🌐 Chain ID:', network.chainId);
        }
      }
    } catch (err) {
      console.error('❌ Check account failed:', err);
    }
  };
  useEffect(() => {
    checkAccount();
  }, []);
  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert('🚨 Please install MetaMask first!');
        return;
      }

      // ขอสิทธิ์เข้าถึงบัญชีใน MetaMask
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      const address = await signer.getAddress();

      setAccount(address);
      setChainId(Number(network.chainId));

      console.log('✅ Wallet connected:', address);
      console.log('🌐 Chain ID:', network.chainId);
    } catch (err) {
      console.error('❌ Connect wallet failed:', err);
    }
  }
  const singnatureForWithdraw = async (msg: {
    userid: string;
    userAddress: string;
    totalCashbackAmount: string;
    conversionIdHashes: number[];
    expireAt: number;
    chain: number;
  }) => {
    try {
      const signature = await client.post(`/withdraw/signature`, { ...msg });
      return signature.data;
    } catch (err) {
      console.error('❌ failed to get signature:', err);
      return false;
    }
  };

  const createWithdraw = async (data: CreateWithdrawDto) => {
    try {
      // Implementation for creating a withdraw record in the backend
      const dt = await client.post(`/withdraw`, data);
      console.log('dt', dt);

      if (dt.status === 201) {
        console.log('✅ Withdraw record created:', dt.data);
        toast.success('Withdraw record created successfully.');
      } else {
        toast.error('Failed to create withdraw record.');
      }
    } catch (err) {
      console.error('❌ Create withdraw failed:', err);
      toast.error('Failed to create withdraw record.');
    }
  };

  const switchNetwork = async (): Promise<void> => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${Number(
              chainIdSelect ===
                Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_POLYGON)
                ? process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_POLYGON
                : chainIdSelect ===
                  Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_BNB)
                ? process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_BNB
                : process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_SONIC
            ).toString(16)}`,
          },
        ],
      });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      console.log('✅ Switched to chain ID:', network.chainId);
      setChainId(Number(network.chainId));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        console.log('Network not found, please add it to MetaMask first');
      }
      throw switchError;
    }
  };
  async function withdrawCashback(msg_: {
    userid: string;
    userAddress: string;
    totalCashbackAmount: string;
    conversionIdHashes: number[];
    expireAt: number;
    info: ResponseWithdrawCheck;
  }) {
    try {
      //   console.log('Initiating withdrawCashback with message:', msg_);

      // await connectWallet();
      if (!window.ethereum) throw new Error('MetaMask not found');

      if (!account) {
        toast.error('Please connect wallet first.');
        throw new Error('Wallet not connected');
      }
      const chainIdCheck =
        chainIdSelect ===
        Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_POLYGON)
          ? Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_POLYGON)
          : chainIdSelect ===
            Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_BNB)
          ? Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_BNB)
          : Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_SONIC);
      if (chainIdSelect !== chainIdCheck) {
        // await switchNetwork();
        toast.error('Please connect to the correct network.');
        throw new Error('Incorrect network');
      }
      const msgForSign = {
        userid: msg_.userid,
        userAddress: msg_.userAddress,
        totalCashbackAmount: msg_.totalCashbackAmount,
        conversionIdHashes: msg_.conversionIdHashes.map((id) => id),
        expireAt: msg_.expireAt,
        chain: chainIdSelect!,
      };
      const signature = await singnatureForWithdraw(msgForSign);

      if (!signature) {
        toast.error('Failed to get signature for withdrawal.');
        throw new Error('Signature generation failed');
      }
      // ขอสิทธิ์เชื่อมต่อกับ MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // provider + signer จาก MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // สร้าง instance ของ contract
      const contractAddress =
        chainIdSelect ===
        Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_POLYGON)
          ? process.env.NEXT_PUBLIC_CONTRACT_WITHDRAW_ADDRESS_POLYGON!
          : chainIdSelect ===
            Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_BNB)
          ? process.env.NEXT_PUBLIC_CONTRACT_WITHDRAW_ADDRESS_BNB!
          : process.env.NEXT_PUBLIC_CONTRACT_WITHDRAW_ADDRESS_SONIC!;

      const abi =
        chainIdSelect ===
        Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_POLYGON)
          ? contractPolygonAbi
          : chainIdSelect ===
            Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_BNB)
          ? contractBNBAbi
          : contractSonicAbi;
      const contract = new ethers.Contract(contractAddress, abi, signer);

      let rolling = ethers.ZeroHash;
      for (const id of msg_.conversionIdHashes) {
        rolling = keccak256(
          solidityPacked(['bytes32', 'uint256'], [rolling, id])
        );
      }
      const conversionIdsHash = rolling;

      const decimal =
        chainIdSelect === Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_BNB)
          ? 18
          : 6;

      const dt = {
        userid: msg_.userid,
        userAddress: msg_.userAddress,
        amount: ethers.parseUnits(msg_.totalCashbackAmount, decimal).toString(),
        expireAt: BigInt(msg_.expireAt),
        conversionIdsHash: conversionIdsHash,
      };
      console.log('dt', dt);

      //   const tx = await signer.sendTransaction({
      //     to: process.env.NEXT_PUBLIC_CONTRACT_WITHDRAW_ADDRESS_POLYGON!,
      //     from: account,
      //     data: contract.interface.encodeFunctionData('withdrawCashback', [
      //       dt,
      //       msg_.conversionIdHashes,
      //       signature,
      //     ]),
      //   });

      const tx = await contract.withdrawCashback(
        dt,
        msg_.conversionIdHashes,
        signature
      );
      const receipt = await tx.wait();
      //   console.log('Transaction sent:', tx.hash);
      //   console.log('Transaction receipt:', receipt);
      if (receipt && msg_?.info) {
        createWithdraw({
          tx_hash: receipt.hash,
          address: account,
          method: 'web3',
          currency:
            chainIdSelect ===
            Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_SONIC)
              ? 'USDC'
              : 'USDT',
          account_name: '',
          bank_name: '',
          account_number: '',
          percent_fee: msg_.info?.feePercentage || 0,
          amount_total: msg_.info?.totalUSDAmount || 0,
          amount_net: msg_.info?.netAmount || 0,
          conversion_ids: msg_.conversionIdHashes,
          chain: chainIdSelect,
        });
      }

      //   console.log('✅ Withdraw successful:', receipt);
    } catch (err) {
      console.error('❌ Withdraw failed:', err);
      toast.error('Withdrawal failed. Please try again.');
      throw new Error('Withdrawal failed. Please try again.');
    }
  }
  return {
    withdrawCashback,
    account,
    chainId,
    connectWallet,
    switchNetwork,
    loading,
    setLoading,
    chainIdSelect,
    setChainIdSelect,
  };
};

export default useWithdrawWeb3;
