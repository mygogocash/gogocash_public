import IconButton from '@/components/common/IconButton';
import ArrowIcon from '@/components/icons/ArrowIcon';
import { IProp } from './interface';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Component = ({ src, open }: IProp) => {
  const { data } = useSession();
  return (
    <div className="flex items-center gap-2">
      <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center">
        <Image
          src={src}
          alt="profile"
          className="rounded-full w-full h-auto"
          width={24}
          height={24}
        />
      </div>
      <p className="text-[var(--black-5)] text-[14px]">
        {data?.user?.user?.username || ''}
      </p>
      <IconButton
        icon={
          <ArrowIcon
            className={` transition-all duration-100 ${
              open ? 'rotate-180' : ''
            }`}
          />
        }
      />
    </div>
  );
};
export { Component };
