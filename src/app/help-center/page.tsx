'use client';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import Help from '@/features/desktop/help';
import { CircleHelp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Index() {
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
            onClick={() => {
              router.push(`/help-center`);
            }}
          />
        }
      />
      <Help />
    </>
  );
}
