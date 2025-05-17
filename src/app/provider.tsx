'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import {
  CrossmintProvider,
  CrossmintAuthProvider,
} from '@crossmint/client-sdk-react-ui';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';

export const customCache = new Map();
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig value={{ provider: () => customCache }}>
      <SessionProvider>
        <CrossmintProvider
          apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? ''}
        >
          <CrossmintAuthProvider
            embeddedWallets={{
              type: 'evm-smart-wallet',
              createOnLogin: 'all-users',
            }}
            onLoginSuccess={() => {
              console.log('onLoginSuccess');
            }}
            loginMethods={['web3']} // Only show email, Google, and Farcaster login methods
          >
            <Toaster />
            <>{children}</>
          </CrossmintAuthProvider>
        </CrossmintProvider>
      </SessionProvider>
    </SWRConfig>
  );
};

export default Provider;
