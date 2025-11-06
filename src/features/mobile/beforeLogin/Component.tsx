'use client';
import Button from '@/components/common/button';
import TitleSeparator from '@/components/common/titleSeparator';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { useAuth } from '@crossmint/client-sdk-react-ui';
import { ArrowLeftIcon, Mail, Wallet } from 'lucide-react';
// import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const Component = () => {
  const { login } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="bg-primary-4 min-h-screen">
      <div className="w-full">
        <div className="relative  h-full w-full p-[16px]">
          <div className="flex items-center justify-between">
            <ArrowLeftIcon stroke="white" onClick={() => router.back()} />
          </div>
          <Image
            src={`/logoWhite.svg`}
            alt="logo"
            width={100}
            height={80}
            className="w-[100px] h-[80px] mx-auto mb-2 mt-20"
          />
          <p className="text-white text-[20px] font-normal text-center max-w-[220px] mx-auto">
            Get Instant Castback on every spend
          </p>
        </div>
      </div>
      <div className="space-y-2 w-full p-[16px] h-[calc(100vh-300px)] flex items-center justify-end flex-col">
        <Button
          icon={<GoogleIcon />}
          backgroundColor="bg-white text-black border-grey-2 border"
          text={`${pathname === '/sign-up' ? 'Sign up' : 'Login'} with Google`}
          onClick={function (): void {
            login();
            // signIn('google', { redirect: true, callbackUrl: '/' });
          }}
          fullWidth
        />
        {/* <Button
          icon={<Facebook2Icon />}
          backgroundColor="bg-white text-black border-grey-2 border"
          text={`Login with Facebook`}
          onClick={function (): void {
            signIn('facebook', { redirect: true, callbackUrl: '/' });
          }}
          fullWidth
        /> */}
        <Button
          icon={<Mail />}
          backgroundColor="bg-white text-black border-grey-2 border"
          text={`${pathname === '/sign-up' ? 'Sign up' : 'Login'} with E-mail`}
          onClick={function (): void {
            // router.push(`/login`);
            login();
          }}
          fullWidth
        />
        <div className="w-full space-y-8 pt-1">
          <TitleSeparator
            text={`or login with`}
            bgText="bg-primary-4 text-white"
          />
          <Button
            icon={<Wallet />}
            backgroundColor="bg-white text-black border-grey-2 border"
            text="Connect with Wallet"
            onClick={function (): void {
              //   handleModal?.(false);
              login();
              // throw new Error('Function not implemented.');
            }}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default Component;
