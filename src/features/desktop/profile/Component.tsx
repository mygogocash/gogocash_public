import React from 'react';
import Search from '../search';
import MethodPayment from '../wallet/views/methodPayment';
import Drawer from '@/components/common/drawer';
import Payment from '../wallet/views/payment';
import TitleBar from '../home/views/TitleBar';
import { EditProfile } from './views/editProfile';
import { Social } from './views/social';
const Component = () => {
  const [isOpenAddWithdraw, setIsOpenAddWithdraw] = React.useState(false);
  const [isOpenEditWithdraw, setIsOpenEditWithdraw] = React.useState(false);

  return (
    <div className="container-inner space-y-3 md:space-y-20 my-[10px] md:my-[88px]">
      <Drawer isOpen={isOpenAddWithdraw} setIsOpen={setIsOpenAddWithdraw}>
        <Payment />
      </Drawer>
      <div className="hidden md:flex items-center justify-between">
        <h1 className="text-[var(--black-5)] font-bold text-[24px] md:text-[36px]">
          Picked for You
        </h1>
        <div className="max-w-[400px] w-full">
          <Search />
        </div>
      </div>
      <TitleBar title={'Personal Information'} />
      <EditProfile />
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
