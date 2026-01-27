'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';
import SettingCrossmint from '@/lib/crossmint/Setting';
import { CrossmintLoginContext } from '@/providers/CrossmintLoginContext';
import { PostHogProvider } from '@/providers/PostHogProvider';
import PostHogPageView from '@/components/PostHogPageView';

export const customCache = new Map();
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <PostHogProvider>
      <SWRConfig value={{ provider: () => customCache }}>
        <SessionProvider>
          <SettingCrossmint>
            <CrossmintLoginContext>
              <Toaster />
              <PostHogPageView />
              {children}
            </CrossmintLoginContext>
          </SettingCrossmint>
        </SessionProvider>
      </SWRConfig>
    </PostHogProvider>
  );
};

export default Provider;
