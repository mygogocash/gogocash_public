'use client';

import { HeaderMobile } from '@/components/layouts/mobile/header';
import ShopDetail from '@/features/desktop/shop/views/detail';
import { CircleHelp } from 'lucide-react';

const ProductPage = () => {
  return (
    <>
      <HeaderMobile
        color="black"
        iconRight={
          <CircleHelp stroke="black" width={24} height={24} color="black" />
        }
      />
      <ShopDetail />
    </>
  );
};

export default ProductPage;
