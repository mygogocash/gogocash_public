'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import { History } from '@/features/mobile/history';
import { CircleHelp } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import dynamic from 'next/dynamic';
// const History = dynamic(() => import('@/features/desktop/history'), {
//   ssr: false, // This enables SSR (default behavior)
// });
const HistoryPage = () => {
  const router = useRouter();
  
  return (
    <>
      <HeaderMobile
        color="black"
        iconRight={
          <CircleHelp
            stroke="black"
            width={24}
            height={24}
            color="black"
            onClick={() => {
              router.push(`/help-center`);
            }}
          />
        }
      />
      <History />
    </>
  );
};

export default HistoryPage;
