import Button from '@/components/common/button';
import WalletBigIcon from '@/components/icons/WalletBigIcon';
import Tab from '@/components/common/tab';
import { list } from './constant';
import History from './views/history';
import React from 'react';
import Drawer from '@/components/common/drawer';
import Withdraw from './views/withdraw';
import Payment from './views/payment';
import MethodPayment from './views/methodPayment';
import { ResponseWithdrawCheck } from '../withdraw/interface';
import useSWR from 'swr';
import { fetcherPost } from '@/lib/client';
import { formatNumber } from '@/lib/utils';
import { useRouter } from 'next/navigation';
const Component = () => {
  const [isOpenWithdraw, setIsOpenWithdraw] = React.useState(false);
  const [isOpenAddWithdraw, setIsOpenAddWithdraw] = React.useState(false);
  const [isOpenEditWithdraw, setIsOpenEditWithdraw] = React.useState(false);
  const router = useRouter();

  const data = [`/withdraw/check`];
  const { data: dataConversion } = useSWR<ResponseWithdrawCheck>(
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
    <div className="container-inner md:space-y-20 space-y-3 md:mb-[88px] md:mt-[40px] my-[10px]">
      {/* <div className="hidden md:flex-row flex-col md:flex items-center justify-between">
        <h1 className="text-black-5 font-bold text-[24px] md:text-[36px]">
          Picked for You
        </h1>
        <div className="max-w-[400px] w-full">
          <Search />
        </div>
      </div> */}
      <h1 className="flex md:hidden text-black-5 font-bold text-[24px] md:text-[36px]">
        Wallet
      </h1>
      <div className=" flex items-center justify-center">
        <div className="md:pr-[10rem] relative max-w-[572px] w-full pl-5 md:pl-0 py-5 md:py-0 md:min-h-[197px] md:h-[197px] flex md:items-center justify-center flex-col gap-3 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] rounded-[16px]">
          <WalletBigIcon className="md:absolute top-[52px] left-[-102px] md:block hidden" />

          <p className="text-black-5 text-[14px] md:text-[24px] font-bold md:font-medium">
            Your Balance
          </p>
          <Drawer isOpen={isOpenWithdraw} setIsOpen={setIsOpenWithdraw}>
            <Withdraw />
          </Drawer>
          <Drawer isOpen={isOpenAddWithdraw} setIsOpen={setIsOpenAddWithdraw}>
            <Payment />
          </Drawer>

          <Button
            text="Withdraw"
            backgroundColor={
              'bg-primary-4 rounded-full text-white h-[44px] absolute right-[29px] top-[32px]'
            }
            onClick={() => router.push('/withdraw')}
          />
          <h1 className="text-black-5 font-bold text-[24px] md:text-[36px]">
            ${formatNumber(dataConversion?.netAmount || 0)}
          </h1>
        </div>
      </div>

      <Tab
        list={list.map((item) => ({
          ...item,
          content:
            item.id === 2 ? (
              <MethodPayment
                setIsOpenAddWithdraw={setIsOpenAddWithdraw}
                isOpenAddWithdraw={isOpenAddWithdraw}
                isOpenEditWithdraw={isOpenEditWithdraw}
                setIsOpenEditWithdraw={setIsOpenEditWithdraw}
              />
            ) : (
              <History
                dataConversion={dataConversion as ResponseWithdrawCheck}
              />
            ),
        }))}
      />
    </div>
  );
};

export default Component;
