import React from 'react';
import MethodPayment from '../wallet/views/methodPayment';
import Drawer from '@/components/common/drawer';
import Payment from '../wallet/views/payment';
import TitleBar from '../home/views/TitleBar';
import { EditProfile } from './views/editProfile';
import { Social } from './views/social';
import { CopyIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { ResponseGetMyOffers } from './interface';
import { fetcherPost } from '@/lib/client';
const Component = () => {
  const [isOpenAddWithdraw, setIsOpenAddWithdraw] = React.useState(false);
  const [isOpenEditWithdraw, setIsOpenEditWithdraw] = React.useState(false);
  const router = useRouter();
  const data = [`/offer/my-offers`, { limit: 10, page: 1 }];
  const { data: dataMyOffers } = useSWR<ResponseGetMyOffers[]>(
    data,
    fetcherPost,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      // use cache
    }
  );

  return (
    <div className="container-inner space-y-3 md:space-y-8 my-[10px] md:my-[40px]">
      <Drawer isOpen={isOpenAddWithdraw} setIsOpen={setIsOpenAddWithdraw}>
        <Payment />
      </Drawer>
      {/* <div className="hidden md:flex items-center justify-between">
        <h1 className="text-black-5 font-bold text-[24px] md:text-[36px]">
          Picked for You
        </h1>
        <div className="max-w-[400px] w-full">
          <Search />
        </div>
      </div> */}
      <TitleBar title={'Personal Information'} />
      <EditProfile />
      <TitleBar
        title={'My Affiliate link'}
        button={{ text: 'Withdraw', onClick: () => router.push(`withdraw`) }}
      />
      <div className="p-5 space-y-5 md:max-w-[600px] mx-auto">
        {/* <p className="text-[20px] font-medium text-black-6">
          My Affiliate link
        </p> */}
        {dataMyOffers?.map((item) => {
          return (
            <div
              key={item._id}
              onClick={() => {
                router.push(`/history/${item.offer_id}`);
              }}
              className="shadow-[0px_1px_10px_0px_rgba(0,0,0,0.25)] rounded-[8px] flex items-center gap-3 p-[16px]"
            >
              {/* <ArrowDown color="#E60E0E" size={20} /> */}
              <div className="w-full">
                <div className="flex items-center justify-between w-full">
                  <p className="text-[16px] font-medium text-black-6">
                    Offer : {item.offer_name}
                  </p>
                  {/* <p className="text-[20px] font-medium text-[#E60E0E]">+$20</p> */}
                </div>
                <p className="text-gray-400 text-[10px]">Earn Cashback</p>
                <p className="text-gray-400 text-[10px] mt-3">
                  Create Link Date: {new Date(item.createdAt).toLocaleString()}
                </p>
                <p className="text-black-6 text-[10px] flex items-center gap-2">
                  {item.deeplink}{' '}
                  <CopyIcon
                    size={`13`}
                    className="cursor-pointer transition-colors duration-200 hover:text-blue-500 active:text-blue-700"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigator.clipboard.writeText(item.deeplink);
                    }}
                  />
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <MethodPayment
        setIsOpenAddWithdraw={setIsOpenAddWithdraw}
        isOpenAddWithdraw={isOpenAddWithdraw}
        isOpenEditWithdraw={isOpenEditWithdraw}
        setIsOpenEditWithdraw={setIsOpenEditWithdraw}
      />
      <Social />
    </div>
  );
};

export { Component };
