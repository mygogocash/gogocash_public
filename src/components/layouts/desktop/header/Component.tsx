import Image from 'next/image';
import InfoIcon from '../../../icons/InfoIcon';
import Button from '@/components/common/button';
import React, { useCallback } from 'react';
import { MenuHeader } from './constants';
import WalletIcon from '@/components/icons/WalletIcon';
import IconButton from '@/components/common/IconButton';
import Link from 'next/link';
import Drawer from '@/components/common/drawer';
import BeforeLogin from '@/features/desktop/profile/views/form';
import { AlignJustifyIcon, Loader2 } from 'lucide-react';
import MenuProfile from '@/features/desktop/profile/views/menuProfile';
import { useSession } from 'next-auth/react';
import { Notification } from '@/features/desktop/notification';
import NotificationIcon from '@/components/icons/NotificationIcon';
import Help from '@/features/desktop/help';
import { useCrossmintLoginContext } from '@/providers/CrossmintLoginContext';

const Component = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenNotification, setIsOpenNotification] = React.useState(false);
  const [isOpenHelpCenter, setIsOpenHelpCenter] = React.useState(false);
  const { data } = useSession();
  const {
    login,
    user: crossmintUser,
    wallet,
    loginState,
  } = useCrossmintLoginContext();

  const checkLogIn = useCallback(() => {
    return data?.user;
  }, [data?.user]);

  // Function to get user display info (email or wallet address)
  const getUserDisplayInfo = useCallback(() => {
    // First try to get email from session data
    const sessionUser = data?.user as { email?: string };
    if (sessionUser?.email) {
      return sessionUser.email;
    }

    // Then try to get email from crossmint user
    if (crossmintUser?.email) {
      return crossmintUser.email;
    }

    // Finally try to get wallet address
    if (wallet?.address) {
      // Show shortened wallet address (first 6 and last 4 characters)
      const address = wallet.address;
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    return 'User';
  }, [data?.user, crossmintUser?.email, wallet?.address]);

  const handleLogin = useCallback(() => {
    try {
      if (typeof login === 'function') {
        console.log('✅ Calling Crossmint login function...');

        // Call the login function which should show the modal
        login();
        console.log('✅ Login function called successfully');
      } else {
        console.error('❌ Login function not available');
        console.error(
          'Available context properties:',
          Object.keys({
            login,
            user: crossmintUser,
            wallet,
            loginState,
          })
        );
        alert('Crossmint login not available. Please check configuration.');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      alert(
        `Login error: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }, [login, loginState, crossmintUser, wallet]);

  return (
    <header className="h-[82px] bg-white py-[16px] shadow-lg sticky top-0 z-[9] w-full md:block hidden">
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <BeforeLogin handleModal={setIsOpen} />
      </Drawer>
      <Drawer isOpen={isOpenNotification} setIsOpen={setIsOpenNotification}>
        <Notification />
      </Drawer>
      <Drawer isOpen={isOpenHelpCenter} setIsOpen={setIsOpenHelpCenter}>
        <Help />
      </Drawer>
      <div className="container-inner flex items-center justify-between ">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={84} height={50} />
        </Link>
        {checkLogIn() && (
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
        {checkLogIn() ? (
          <div className="hidden md:flex items-center gap-2">
            {/* User Info Display */}
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-600">Welcome,</span>
              <span
                className="text-sm font-medium text-gray-800"
                title={
                  wallet?.address ||
                  crossmintUser?.email ||
                  (data?.user as { email?: string })?.email ||
                  ''
                }
              >
                {getUserDisplayInfo()}
              </span>
              {/* Show loading indicator if login is in progress */}
              {loginState?.isLoggingIn && (
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              )}
            </div>
            <IconButton
              onClick={() => {
                // Future: Implement wallet connection functionality
                console.log('Wallet button clicked');
              }}
              icon={<WalletIcon />}
            />
            <IconButton
              icon={<NotificationIcon />}
              onClick={function (): void {
                setIsOpenNotification(true);
              }}
            />
            <IconButton
              onClick={function (): void {
                setIsOpenHelpCenter(true);
              }}
              icon={<InfoIcon />}
            />
            <MenuProfile />
          </div>
        ) : (
          <>
            <div className="hidden md:flex  items-center gap-2">
              <Button
                backgroundColor="bg-[var(--primary-4)] text-white"
                text={
                  loginState?.isLoggingIn
                    ? 'Logging in...'
                    : 'Hi! Log in or Sign up here'
                }
                onClick={handleLogin}
                disabled={loginState?.isLoggingIn}
              />
              {loginState?.isLoggingIn && (
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              )}
              <InfoIcon
                onClick={function (): void {
                  setIsOpenHelpCenter(true);
                }}
              />
            </div>
            {/* Show error message if login failed */}
            {loginState?.error && (
              <div className="absolute top-full left-0 right-0 bg-red-100 border border-red-400 text-red-700 px-4 py-2 text-sm">
                Login failed: {loginState.error}
              </div>
            )}
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
