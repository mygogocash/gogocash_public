'use client';
import Footer from '@/components/layouts/desktop/footer';
import Header from '@/components/layouts/desktop/header';
import { FooterMobile } from './mobile/footer';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Layout = ({
  children,
  intro,
  hideFooter,
}: {
  children: React.ReactNode;
  intro?: boolean;
  hideFooter?: boolean;
}) => {
  const { data } = useSession();
  const [showIntro, setShowIntro] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (intro !== undefined) {
      setShowIntro(intro);
    } else {
      const introValue = window.localStorage.getItem('intro');
      setShowIntro(introValue === 'false');
    }
  }, [intro]);

  return (
    <>
      <Header />
      <main className="min-h-screen w-full">{children}</main>
      {hideFooter ? null : !showIntro && data && isClient && <FooterMobile />}
      <Footer />
    </>
  );
};

export default Layout;
