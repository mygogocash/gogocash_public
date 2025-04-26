import { howToClaim } from '@/features/desktop/shop/constant';
import Image from 'next/image';

const HowtoClaim = () => {
  return (
    <div className="md:my-[64px] my-10 mx-5 md:mx-[40px]">
      <h1 className="font-bold text-[30px] md:text-[40px] text-[var(--black-5)]">
        How to Claim?
      </h1>
      <h3 className="font-normal text-[14px] md:text-[16px] text-[var(--black-5)]">
        Just follow these 4 steps and feed your wallet
      </h3>
      <div className=" space-y-8 my-8">
        {howToClaim.map((item, index) => (
          <div className="flex items-center gap-3" key={index}>
            <div className="w-[80px] h-[80px] rounded-full bg-[var(--primary-4)] flex items-center justify-center">
              <item.icon stroke="white" size={40} />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-[24px] md:text-[28px] text-[var(--primary-4)]">
                Shop
              </h1>
              <h3 className="font-normal text-[14px] md:text-[16px] text-[var(--black-3)]">
                Just follow these 4 steps and feed your wallet
              </h3>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[14px] md:text-[16px] text-[var(--black-5)]">
        Still got question?{' '}
        <span className=" underline-offset-1 underline">Click Here</span>
      </p>

      <Image
        src={'/money.png'}
        alt={'money'}
        width={300}
        height={300}
        className="absolute bottom-0 left-0 w-full z-[-1]"
      />
    </div>
  );
};

export default HowtoClaim;
