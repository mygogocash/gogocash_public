'use client';

import { HeaderMobile } from '@/components/layouts/mobile/header';
import ProductDetail from '@/features/desktop/product/views/detail';
import { CircleHelp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProductPage = () => {
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
      <ProductDetail />
    </>
  );
};

export default ProductPage;
