'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import { Product } from '@/features/desktop/product';
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
      <Product />
    </>
  );
};

export default ProductPage;
