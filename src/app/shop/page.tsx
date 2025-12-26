'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import Shop from '@/features/desktop/shop';
import { ShopMobile } from '@/features/mobile/shop';
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
      <div className="md:hidden block w-full">
        <ShopMobile />
      </div>
      <div className="hidden md:block w-full">
        <Shop />
      </div>
    </>
  );
};

export default ShopPage;
