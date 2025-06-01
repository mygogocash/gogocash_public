'use client';
import { ReactNode, Suspense, lazy } from 'react';

export const customCache = new Map();

// Lazy load Crossmint components
const CrossmintProviders = lazy(() =>
  import('@crossmint/client-sdk-react-ui').then((module) => ({
    default: ({
      children,
      apiKey,
    }: {
      children: ReactNode;
      apiKey: string;
    }) => {
      const { CrossmintProvider, CrossmintAuthProvider } = module;
      return (
        <CrossmintProvider apiKey={apiKey}>
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
            {children}
          </CrossmintAuthProvider>
        </CrossmintProvider>
      );
    },
  }))
);

const Setting = ({ children }: { children: ReactNode }) => {
  // ใช้ค่า default หรือค่าจาก NEXT_PUBLIC env var
  const clientSecret = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_SECRET || '';

  // ตรวจสอบว่ามี valid API key หรือไม่
  const hasValidApiKey =
    clientSecret &&
    (clientSecret.startsWith('ck_') || clientSecret.startsWith('sk_'));

  // ถ้าไม่มี valid API key ให้ render children โดยตรง
  if (!hasValidApiKey) {
    console.warn(
      '⚠️ Crossmint: No valid API key found. Skipping Crossmint initialization.'
    );
    return <>{children}</>;
  }

  return (
    <Suspense fallback={<>{children}</>}>
      <CrossmintProviders apiKey={clientSecret}>{children}</CrossmintProviders>
    </Suspense>
  );
};

export default Setting;
