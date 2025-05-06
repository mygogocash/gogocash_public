'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import Shop from '@/features/desktop/shop';
import { CircleHelp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ShopPage = () => {
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
      <Shop />
    </>
  );
};

export default ShopPage;
