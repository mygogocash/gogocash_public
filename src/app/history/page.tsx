'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import { History } from '@/features/mobile/history';
import { CircleHelp } from 'lucide-react';
// import dynamic from 'next/dynamic';
// const History = dynamic(() => import('@/features/desktop/history'), {
//   ssr: false, // This enables SSR (default behavior)
// });
const HistoryPage = () => {
  return (
    <>
      <HeaderMobile
        color="black"
        iconRight={
          <CircleHelp stroke="black" width={24} height={24} color="black" />
        }
      />
      <History />
    </>
  );
};

export default HistoryPage;
