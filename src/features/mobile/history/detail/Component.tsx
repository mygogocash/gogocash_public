'use client';

// import PaypalIcon from '@/components/icons/PaypalIcon';
import { ResponseConversion } from '@/features/desktop/profile/interface';
import { ChevronLeft, Wallet2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Component = ({
  dataConversion,
}: {
  dataConversion: ResponseConversion;
}) => {
  const router = useRouter();
  return (
    <div className="px-5 space-y-5">
      <div className="flex items-center gap-5 relative pt-5 pb-2">
        <ChevronLeft onClick={() => router.back()} />
        <h1 className="text-[20px] font-medium text-black-6 text-center">
          Cashback Transaction
        </h1>
      </div>
      <div className="space-y-3">
        {/* <div className="shadow-[0px_1px_10px_0px_rgba(0,0,0,0.25)] rounded-[8px] flex items-center justify-center flex-col gap-3 p-[16px]">
          <h1 className="text-[36px] font-bold text-black-6">$ 49.11</h1>
          <div className="text-[10px] bg-primary-1 rounded-[8px] py-[4px] px-[8px] text-primary-3">
            Withdraw is Complete
          </div>
        </div> */}
        {/* <div className="shadow-[0px_1px_10px_0px_rgba(0,0,0,0.25)] rounded-[8px] py-[16px]">
          <div className="px-[16px]">
            <p className="text-black-6 text-[12px]">Withdraw to</p>
            <div className="flex items-center gap-3">
              <PaypalIcon />
              <p className="text-[14px] text-black-6 font-medium">
                Method to *0000
              </p>
            </div>
          </div>
          <div className="border-b-[1px] border-b-black-2 my-3" />
          <div className="px-[16px] flex items-center justify-between">
            <p className="text-[14px] text-black-6 font-medium">
              Method to *0000
            </p>
            <p className="text-[14px] text-black-6 font-normal">$ 50.00</p>
          </div>
          <div className="border-b-[1px] border-b-black-2 my-3" />

          <div className="px-[16px] flex items-center justify-between">
            <p className="text-[14px] text-black-6 font-medium">
              Method to *0000
            </p>
            <p className="text-[14px] text-black-6 font-normal">$ 50.00</p>
          </div>
          <div className="border-b-[1px] border-b-black-2 my-3" />

          <div className="px-[16px] flex items-center justify-between">
            <p className="text-[14px] text-black-6 font-medium">
              Method to *0000
            </p>
            <p className="text-[14px] text-black-6 font-normal">$ 50.00</p>
          </div>
        </div> */}

        <div className="shadow-[0px_1px_10px_0px_rgba(0,0,0,0.25)] rounded-[8px] py-[16px]">
          {dataConversion?.status === 'success' &&
          dataConversion.data?.data?.length > 0 ? (
            <>
              {dataConversion.data?.data.map((item, index) => {
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
                      </div>
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
            <p className="text-[14px] text-black-6 font-medium">Notice</p>
            <div className="cursor-pointer text-[10px] bg-primary-1 rounded-[8px] py-[4px] px-[8px] text-primary-6 flex items-center gap-1">
              <Wallet2 color="#0b5a2d" /> Withdraw
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
