'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import { Notification } from '@/features/desktop/notification';
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
      <Notification />
    </>
  );
};

export default Index;
