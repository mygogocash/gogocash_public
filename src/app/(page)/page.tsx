'use client';
import Home from '@/features/desktop/home';
import { IntroMobile } from '@/features/mobile/intro';
import { HomeMobile } from '@/features/mobile/home';
import { useEffect, useState } from 'react';
import Layout from '@/components/layouts';

export default function Index() {
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const introValue = window.localStorage.getItem('intro');
    setShowIntro(introValue !== 'true');
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timer = setTimeout(() => {
      if (window.localStorage.getItem('intro') === 'false') {
        setShowIntro(false);
        window.localStorage.setItem('intro', 'true');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <Layout intro={showIntro}>
      <div className={`w-full hidden md:block`}>
        <Home />
      </div>
      <div
        className={`w-full md:hidden  flex flex-col items-center justify-center`}
      >
        {showIntro ? <IntroMobile setIntro={setShowIntro} /> : <HomeMobile />}
      </div>
    </Layout>
  );
}
