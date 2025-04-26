'use client';

import { HeaderMobile } from '@/components/layouts/mobile/header';
import PromotionDetail from '@/features/desktop/promotion/views/detail';
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
      <PromotionDetail />
    </>
  );
};

export default ProductPage;
