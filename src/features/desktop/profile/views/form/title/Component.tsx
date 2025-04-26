import Image from 'next/image';
import { memo } from 'react';
import { IProp } from './interface';

const Component = ({ title, subTitle, showLogo, center }: IProp) => {
  return (
    <div className={`space-y-8 flex items-center flex-col ${center ? 'justify-center' : ''} w-full`}>
      {showLogo && (
        <div>
          <Image src="/logo.svg" alt="logo" width={84} height={50} />
        </div>
      )}

      <div className='w-full'>
        <h1 className={`font-bold text-[20px] md:text-[36px] text-[var(--black-5)] ${center ? 'text-center': ''}`}>{title}</h1>
        <p className={`font-semibold text-[14px] md:text-[16px] text-[var(--black-5)] ${center ? 'text-center': ''}`}>
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default memo(Component);
