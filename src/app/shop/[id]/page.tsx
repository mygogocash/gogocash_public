'use client';

import { HeaderMobile } from '@/components/layouts/mobile/header';
import ShopDetail from '@/features/desktop/shop/views/detail';
import { CircleHelp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProductPage = () => {
  const router = useRouter();

  // const
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
      <ShopDetail />
    </>
  );
};

export default ProductPage;
