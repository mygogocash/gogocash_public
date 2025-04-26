'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import Promotion from '@/features/desktop/promotion';
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
      <Promotion />
    </>
  );
};

export default Index;
