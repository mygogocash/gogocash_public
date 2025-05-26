'use client';
import { ReactNode } from 'react';
import {
  CrossmintProvider,
  CrossmintAuthProvider,
} from '@crossmint/client-sdk-react-ui';

export const customCache = new Map();
const Setting = ({ children }: { children: ReactNode }) => {
  // Get Crossmint configuration
  const clientSecret = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_SECRET || '';

  return (
    <CrossmintProvider apiKey={clientSecret}>
      <CrossmintAuthProvider
        embeddedWallets={{
          type: 'evm-smart-wallet',
          createOnLogin: 'all-users',
        }}
        onLoginSuccess={() => {
          console.log('🎉 Crossmint onLoginSuccess triggered');
          window.sessionStorage.setItem('isAfterLogin', 'true');
        }}
        loginMethods={['email', 'google', 'twitter', 'web3']}
      >
        <>{children}</>
      </CrossmintAuthProvider>
    </CrossmintProvider>
  );
};

export default Setting;
