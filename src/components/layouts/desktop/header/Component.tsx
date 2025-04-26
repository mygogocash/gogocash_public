import Image from 'next/image';
import InfoIcon from '../../../icons/InfoIcon';
import Button from '@/components/common/button';
import React from 'react';
import { MenuHeader } from './constants';
import WalletIcon from '@/components/icons/WalletIcon';
import IconButton from '@/components/common/IconButton';
import Link from 'next/link';
import Drawer from '@/components/common/drawer';
import { BeforeLogin } from '@/features/desktop/profile/views/form';
import { AlignJustifyIcon } from 'lucide-react';
import MenuProfile from '@/features/desktop/profile/views/menuProfile';
import { useSession } from 'next-auth/react';
import { useAuth } from '@crossmint/client-sdk-react-ui';
import { Notification } from '@/features/desktop/notification';
import NotificationIcon from '@/components/icons/NotificationIcon';

const Component = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenNotification, setIsOpenNotification] = React.useState(false);

  const { data } = useSession();
  const { user } = useAuth();
  console.log('user', user);
  console.log('data', data);

  return (
    <header className="h-[82px] bg-white py-[16px] shadow-lg sticky top-0 z-[9] w-full md:block hidden">
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <BeforeLogin handleModal={setIsOpen} />
      </Drawer>
      <Drawer isOpen={isOpenNotification} setIsOpen={setIsOpenNotification}>
        <Notification />
      </Drawer>
      <div className="container-inner flex items-center justify-between ">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={84} height={50} />
        </Link>
        {(data?.user || user) && (
          <div className="md:flex items-center gap-2 hidden">
            <ul className="flex items-center gap-3">
              {MenuHeader.map((item) => {
                return (
                  <Link key={item.title} href={item.link}>
                    <li className=" cursor-pointer text-[var(--black-5)]">
                      {item.title}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        )}
        {data?.user || user ? (
          <div className="hidden md:flex items-center gap-2">
            <IconButton icon={<WalletIcon />} />
            <IconButton
              icon={<NotificationIcon />}
              onClick={function (): void {
                setIsOpenNotification(true);
              }}
            />
            <IconButton icon={<InfoIcon />} />
            <MenuProfile />
          </div>
        ) : (
          <>
            <div className="hidden md:flex  items-center gap-2">
              <Button
                backgroundColor="bg-[var(--primary-4)] text-white"
                text="Hi! Log in or Sign up here"
                onClick={function (): void {
                  setIsOpen(!isOpen);
                  // throw new Error('Function not implemented.');
                }}
              />
              <InfoIcon />
            </div>
          </>
        )}

        <div
          className="md:hidden flex  items-center gap-2"
          onClick={function (): void {
            setIsOpen(!isOpen);
          }}
        >
          <IconButton icon={<AlignJustifyIcon />} />
        </div>
      </div>
    </header>
  );
};

export default Component;
