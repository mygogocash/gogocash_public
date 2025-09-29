import ArrowCircleIcon from '@/components/icons/ArrowCircleIcon';
import Search from '@/features/desktop/search';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Banner = () => {
  const router = useRouter();
  return (
    <section className="h-[543px] w-full relative flex flex-wrap ">
      <div className="flex  flex-col justify-center w-full">
        <div className="md:bg-transparent p-2 rounded-[10px]">
          <h1 className="drop-shadow-lg leading-[20px] flex items-center gap-4 text-black-5 text-[40px] md:text-[80px] font-semibold">
            Save <span className="text-primary-4">cash</span>{' '}
            <ArrowCircleIcon />
          </h1>
          <h1 className="drop-shadow-lg text-black-5 text-[40px] md:text-[80px] font-semibold">
            on Every Spend
          </h1>
        </div>
        <div className="bg-primary-4 max-w-[582px] h-[92px] mt-3 rounded-[16px] flex items-center justify-center px-4">
          <Search
            onSearch={(value) => {
              window.sessionStorage.setItem('search_offer', value);
              router.push('/shop');
            }}
          />
        </div>
      </div>
      <Image
        src="/money_drop.png"
        alt="money_drop"
        width={684}
        height={500}
        className="absolute top-0 right-0  object-cover z-[-1]"
      />
      <Image
        src="/shopping_cart.png"
        alt="shopping_cart"
        width={300}
        height={200}
        className="absolute bottom-0 right-0  w-[500px] h-auto object-cover z-[-1]"
      />
    </section>
  );
};

export default Banner;
