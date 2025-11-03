'use client';

import useWithdrawWeb3, { chainAll } from '@/hooks/useWithdrawWeb3';
import { ChevronLeft, Loader2, Wallet2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ResponseWithdrawCheck } from './interface';
import useSWR from 'swr';
import { fetcherPost } from '@/lib/client';
import Select from '@/components/common/select';
import * as Form from '@radix-ui/react-form';
import React from 'react';

const Component = () => {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const dataUrl = [`/withdraw/check`];
  const {
    data: dataConversion,
    mutate,
    // error,
  } = useSWR<ResponseWithdrawCheck>(dataUrl, fetcherPost, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    // use cache
  });
  const {
    withdrawCashback,
    account,
    chainId,
    connectWallet,
    switchNetwork,
    loading,
    setLoading,
    chainIdSelect,
    setChainIdSelect,
  } = useWithdrawWeb3();
  const { data } = useSession();
  const session = data as unknown as {
    accessToken: string;
    user: { _id: string };
  };
  const handleWithdraw = async () => {
    try {
      setLoading(true);
      fetcherPost('/withdraw/check')
        .then(async (res: ResponseWithdrawCheck) => {
          if (res) {
            if (!res || res.netAmount === 0) {
              toast.error('No amount available for withdrawal.');
              setLoading(false);
              return;
            }
            if (!account) {
              toast.error('Please connect your wallet first.');
              setLoading(false);
              return;
            }
            // const id = session?.user._id || '';
            // const idT = item.aff_sub1?.split(':')[1] || '';
            // console.log('id, idT match:', id, idT);
            if (session?.user._id && res) {
              // if (id == idT) {
              // console.log('add', account, chainId);

              // toast.success('User ID matches. Proceeding with withdrawal.');
              if (account) {
                if (chainId !== chainIdSelect) {
                  await switchNetwork();
                  setLoading(false);
                  return;
                }
                await withdrawCashback({
                  userid: session?.user._id?.toString(),
                  userAddress: account,
                  totalCashbackAmount: res.netAmount?.toString(), // 10 tokens with 6 decimals
                  conversionIdHashes: res?.data.map(
                    (item) => item.conversion_id as number
                  ),
                  // conversionIdHashes: [578760651, 578760751],
                  expireAt: Math.floor(Date.now() / 1000) + 20 * 60, // 20 minutes from now
                  info: res,
                }).then(() => {
                  mutate();
                  setTimeout(() => {
                    setLoading(false);
                  }, 5000);
                  // toast.success('Withdrawal successful.');
                });
              } else {
                await connectWallet();
                setLoading(false);
                return;
              }
              // } else {
              //   toast.error('User ID does not match. Withdrawal aborted.');
              // }
            } else {
              toast.error('User not logged in. Please log in to withdraw.');
            }
          }
        })
        .catch(() => {
          toast.error('This transaction is already completed');
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.error('Withdraw failed:', error);
    }
  };
  return (
    <div className="px-5 space-y-5">
      <div className="flex items-center gap-5 relative pt-5 pb-2">
        <ChevronLeft onClick={() => router.back()} />
        <h1 className="text-[20px] font-medium text-black-6 text-center">
          Cashback Transaction
        </h1>
      </div>
      <div className="space-y-3">
        <div className="shadow-[0px_1px_10px_0px_rgba(0,0,0,0.25)] rounded-[8px] py-[16px]">
          {dataConversion && dataConversion?.data?.length > 0 ? (
            <>
              {dataConversion?.data.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="px-[16px] flex items-center justify-between">
                      <div>
                        <div
                          className={`${
                            item.conversion_status === 'approved'
                              ? 'text-primary-6 bg-primary-1'
                              : 'text-[#5e5e31] bg-[#f0f0eb]'
                          } text-[10px] w-fit rounded-[8px] py-[4px] px-[8px]  flex items-center gap-1`}
                        >
                          {item.conversion_status}
                        </div>
                        <p className="text-[14px] text-black-6 font-medium">
                          {item.offer_name}
                        </p>
                        <p className="text-[12px] text-gray-500 font-medium">
                          {item.adv_sub2 || ''}
                        </p>
                      </div>
                      <div>
                        <div>
                          <p className="text-[14px] text-black-6 font-normal">
                            <span className="text-black-4 text-[10px]">
                              Sale:{' '}
                            </span>{' '}
                            {item.currency} {item.sale_amount}
                          </p>
                          <p className="text-[14px] text-black-6 font-normal">
                            <span className="text-black-4 text-[10px]">
                              Payout:{' '}
                            </span>{' '}
                            {item.currency} {item.payout}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-b-[1px] border-b-black-2 my-3" />
                  </div>
                );
              })}
            </>
          ) : (
            <p className="text-[14px] text-black-6 font-medium px-[16px] mb-3">
              No Transactions
            </p>
          )}
        </div>

        <div className="shadow-[0px_1px_10px_0px_rgba(0,0,0,0.25)] rounded-[8px] p-[16px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[14px] text-black-6 font-medium">
                Total: {dataConversion?.totalUSDAmount || 0} USD
              </p>
              <p className="text-[14px] text-black-6 font-medium">
                Fee: {dataConversion?.feeAmount || 0} USD
              </p>
              <p className="text-[14px] text-black-6 font-medium">
                Net: {dataConversion?.netAmount || 0} USD
              </p>
            </div>
            {account && (
              <div>
                <p className="text-[14px] text-black-6 font-medium">
                  To Wallet: {`${account?.slice(0, 6)}...${account?.slice(-4)}`}
                </p>
                <p className="text-[14px] text-black-6 font-medium">
                  Network:{' '}
                  {chainIdSelect ==
                  Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_SONIC)
                    ? 'Sonic'
                    : chainIdSelect ==
                      Number(process.env.NEXT_PUBLIC_CHAIN_ID_WITHDRAW_POLYGON)
                    ? 'Polygon'
                    : 'BNB'}
                </p>
              </div>
            )}
            <div>
              <Form.Root
                className="w-full mb-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  console.log('Submitted:', Object.fromEntries(formData));
                  // setIsOpenModal(true);
                }}
              >
                <Select
                  open={isOpenModal}
                  onOpenChange={() => {
                    setIsOpenModal(!isOpenModal);
                  }}
                  value={chainIdSelect || chainAll?.[0]?.value}
                  onClick={(value: number) => {
                    setChainIdSelect(Number(value));
                  }}
                  options={chainAll}
                  name="network"
                />
              </Form.Root>
              <button
                disabled={loading}
                onClick={() => {
                  handleWithdraw();
                }}
                className="cursor-pointer text-[10px] bg-primary-1 rounded-[8px] py-[4px] px-[8px] text-primary-6 flex items-center gap-1"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                ) : (
                  <Wallet2 color="#0b5a2d" />
                )}{' '}
                {account
                  ? chainId != chainIdSelect
                    ? 'Switch Network'
                    : 'Withdraw'
                  : 'Connect Wallet'}
              </button>
            </div>
          </div>
          <p className="text-[10px] text-black-3 mt-3">
            Withdraw was incomplete due to issues with your payment method. The
            amount have been returned to your wallet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Component;
