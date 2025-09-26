import Button from '@/components/common/button';
import TitleSeparator from '@/components/common/titleSeparator';
// import Facebook2Icon from '@/components/icons/Facebook2Icon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { Mail, Wallet } from 'lucide-react';
import React, { memo } from 'react';
import { Title } from '@/features/desktop/profile/views/form/title';
import { useRouter } from 'next/navigation';
import { IProps } from './interface';
import { signIn } from 'next-auth/react';
import { useCrossmintLoginContext } from '@/providers/CrossmintLoginContext';

const Component = ({
  title,
  subTitle,
  isLogin,
  setIsOpen,
  _isOpen,
  handleModal,
}: IProps) => {
  const router = useRouter();
  const { login } = useCrossmintLoginContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function handleLoginWallet() {
    try {
      // Dynamic import เพื่อหลีกเลี่ยง top-level await
      const { BlockchainTypes, CrossmintEVMWalletAdapter } = await import(
        '@crossmint/connect'
      );

      const crossmintConnect = new CrossmintEVMWalletAdapter({
        projectId: process.env.NEXT_PUBLIC_CROSSMINT_PROJECT_ID,
        chain: BlockchainTypes.ETHEREUM, // You can also use POLYGON or BSC
      });

      const walletAddress = await crossmintConnect.connect();
      console.log('walletAddress', walletAddress);

      if (walletAddress) {
        signIn('credentials', {
          wallet: walletAddress,
          redirect: true,
        });
      } else {
        console.log('User declined to connect the wallet.');
      }
    } catch (error) {
      console.error('Error connecting to Crossmint wallet:', error);
    }
  }

  return (
    <div className="p-[48px] flex items-start justify-center flex-col w-full h-full space-y-10">
      <Title title={title} subTitle={subTitle} showLogo />
      <div className="space-y-2 w-full">
        <Button
          icon={<GoogleIcon />}
          backgroundColor="bg-white text-black border-grey-2 border"
          text={`${isLogin ? 'Login' : 'Sign up'} with Google`}
          onClick={function (): void {
            // signIn('google');
            handleModal?.(false);
            // handleLoginWallet();
            login();
          }}
          fullWidth
        />
        {/* <Button
          icon={<Facebook2Icon />}
          backgroundColor="bg-white text-black border-grey-2 border"
          text={`${isLogin ? 'Login' : 'Sign up'} with Facebook`}
          onClick={function (): void {
            signIn('facebook');
          }}
          fullWidth
        /> */}
        <Button
          icon={<Mail />}
          backgroundColor="bg-white text-black border-grey-2 border"
          text={`${isLogin ? 'Login' : 'Sign up'} with E-mail`}
          onClick={function (): void {
            if (isLogin) {
              setIsOpen?.(isLogin ? 'login' : 'default');
            }
          }}
          fullWidth
        />
        <div className="w-full space-y-8 pt-1">
          <TitleSeparator text={`or ${isLogin ? 'login' : 'sign up'} with`} />
          <Button
            icon={<Wallet />}
            backgroundColor="bg-white text-black border-grey-2 border"
            text="Connect with Wallet"
            onClick={async function (): Promise<void> {
              handleModal?.(false);
              // handleLoginWallet();
              login();
            }}
            fullWidth
          />
        </div>
      </div>
      <div className="w-full space-y-8">
        <TitleSeparator text="You're new here?" />

        <Button
          backgroundColor="bg-white text-black border-primary-4 border rounded-full h-[56px]"
          text={!isLogin ? 'LOGIN' : 'Sign Up'}
          onClick={function (): void {
            if (!isLogin) {
              setIsOpen?.(isLogin ? 'login' : 'default');
            } else {
              handleModal?.(false);
              router.push('/sign-up');
            }
          }}
          fullWidth
          center
        />
      </div>
    </div>
  );
};

export default memo(Component);
