'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import Wallet from '@/features/desktop/wallet';
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
      <Wallet />
    </>
  );
};

export default Index;
