'use client';
import { ReactNode } from 'react';
import {
  CrossmintProvider,
  CrossmintAuthProvider,
} from '@crossmint/client-sdk-react-ui';

export const customCache = new Map();
const Setting = ({ children }: { children: ReactNode }) => {
  // Skip Crossmint in development if no valid API key
  const apiKey = process.env.NEXT_PUBLIC_CROSSMINT_API_KEY;
  const isValidApiKey =
    apiKey && apiKey.startsWith('ck_') && apiKey.length > 20;

  if (!isValidApiKey) {
    console.warn(
      '⚠️ Crossmint API key not configured properly. Skipping Crossmint providers in development.'
    );
    return <>{children}</>;
  }

  return (
    <CrossmintProvider apiKey={apiKey}>
      <CrossmintAuthProvider
        embeddedWallets={{
          type: 'evm-smart-wallet',
          createOnLogin: 'all-users',
        }}
        onLoginSuccess={() => {
          console.log('onLoginSuccess');
          //   setIsAfterLogin(true);
          window.sessionStorage.setItem('isAfterLogin', 'true');
        }}
        loginMethods={['web3', 'google']} // Only show email, Google, and Farcaster login methods
      >
        <>{children}</>
      </CrossmintAuthProvider>
    </CrossmintProvider>
  );
};

export default Setting;
