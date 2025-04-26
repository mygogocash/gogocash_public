'use client';

import { HeaderMobile } from '@/components/layouts/mobile/header';
import ProductDetail from '@/features/desktop/product/views/detail';
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
      <ProductDetail />
    </>
  );
};

export default ProductPage;
