'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import Promotion from '@/features/desktop/promotion';
import { CircleHelp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Index = () => {
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
            onClick={() => router.push(`/help-center`)}
          />
        }
      />
      <Promotion />
    </>
  );
};

export default Index;
