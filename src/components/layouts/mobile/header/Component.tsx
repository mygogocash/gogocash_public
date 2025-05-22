'use client';
import { ArrowLeftIcon } from 'lucide-react';
import { IProp } from './interface';
import { useRouter } from 'next/navigation';

const Component = ({ iconRight, color, background }: IProp) => {
  const router = useRouter();
  return (
    <div
      className={`md:hidden flex items-center justify-between p-[16px] w-full ${
        background || 'bg-white'
      }`}
    >
      <ArrowLeftIcon stroke={color || 'white'} onClick={() => router.back()} />
      {iconRight}
    </div>
  );
};

export default Component;
