'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import Wallet from '@/features/desktop/wallet';
import { CircleHelp } from 'lucide-react';
const Index = () => {
  return (
    <>
      <HeaderMobile
        color="black"
        iconRight={
          <CircleHelp stroke="black" width={24} height={24} color="black" />
        }
      />
      <Wallet />
    </>
  );
};

export default Index;
