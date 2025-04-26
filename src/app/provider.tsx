'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import {
  CrossmintProvider,
  CrossmintAuthProvider,
} from '@crossmint/client-sdk-react-ui';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <CrossmintProvider
        apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? ''}
      >
        <CrossmintAuthProvider
          // embeddedWallets={{
          //   type: 'evm-smart-wallet',
          //   defaultChain: 'polygon',
          //   createOnLogin: 'all-users',
          // }}
          loginMethods={['web3']} // Only show email, Google, and Farcaster login methods
        >
          <>{children}</>
        </CrossmintAuthProvider>
      </CrossmintProvider>
    </SessionProvider>
  );
};

export default Provider;
