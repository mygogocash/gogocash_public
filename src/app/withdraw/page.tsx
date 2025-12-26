'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import { WithdrawComponent } from '@/features/desktop/withdraw';
import { CircleHelp } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import dynamic from 'next/dynamic';
// const History = dynamic(() => import('@/features/desktop/history'), {
//   ssr: false, // This enables SSR (default behavior)
// });
const WithdrawPage = () => {
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
      <WithdrawComponent />
    </>
  );
};

export default WithdrawPage;
