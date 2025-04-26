'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import Shop from '@/features/desktop/shop';
import { CircleHelp } from 'lucide-react';

const ShopPage = () => {
  return (
    <>
      <HeaderMobile
        color="black"
        iconRight={
          <CircleHelp stroke="black" width={24} height={24} color="black" />
        }
      />
      <Shop />
    </>
  );
};

export default ShopPage;
