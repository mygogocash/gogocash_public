import Image from 'next/image';
import { IProp } from './interface';

const Component = ({ image, height }: IProp) => {
  return (
    <div className="w-full space-y-4">
      <div
        className={`w-full bg-[var(--primary-4)] rounded-[8px] flex items-center justify-center flex-col ${
          height || 'h-[272px]'
        } `}
      >
        <Image
          src={image || '/banner.png'}
          alt="banner"
          width={200}
          height={200}
          className="w-full h-full "
        />
      </div>
      <div>
        <h4 className="text-[var(--black-6)] text-[12px] md:text-[20px] font-bold">
          Promotion Name
        </h4>
        <p className="text-[var(--black-3)]  text-[10px]  md:text-[16px]">
          00 Month 0000
        </p>
      </div>
    </div>
  );
};

export default Component;
