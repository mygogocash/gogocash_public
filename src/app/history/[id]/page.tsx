'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import { DetailHistoryMobile } from '@/features/mobile/history/detail';
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
      <DetailHistoryMobile />
    </>
  );
};

export default Index;
