'use client';
import { ReactNode } from 'react';
import {
  CrossmintProvider,
  CrossmintAuthProvider,
} from '@crossmint/client-sdk-react-ui';

export const customCache = new Map();
const Setting = ({ children }: { children: ReactNode }) => {
  return (
    <CrossmintProvider apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? ''}>
      <CrossmintAuthProvider
        embeddedWallets={{
          type: 'evm-smart-wallet',
          createOnLogin: 'all-users',
        }}
        onLoginSuccess={() => {
          console.log('onLoginSuccess');
        //   setIsAfterLogin(true);
        }}
        loginMethods={['web3', 'google']} // Only show email, Google, and Farcaster login methods
      >
        <>{children}</>
      </CrossmintAuthProvider>
    </CrossmintProvider>
  );
};

export default Setting;
