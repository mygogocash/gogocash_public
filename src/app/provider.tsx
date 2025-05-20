'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';
import Setting from '@/lib/crossmint/Setting';
import { CrossmintLoginContext } from '@/providers/CrossmintLoginContext';

export const customCache = new Map();
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig value={{ provider: () => customCache }}>
      <SessionProvider>
        <Setting>
          <CrossmintLoginContext>
            <Toaster />
            {children}
          </CrossmintLoginContext>
        </Setting>
      </SessionProvider>
    </SWRConfig>
  );
};

export default Provider;
