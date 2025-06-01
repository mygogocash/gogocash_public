import { useState } from 'react';
import ListFilter from '../home/views/ListFilter';
import { HOME_MOBILE_TYPE } from '../home/constant';
import Search from '@/features/desktop/search';
import Image from 'next/image';
import Button from '@/components/common/button';
import { SquareChartGantt } from 'lucide-react';
import { TitleMobile } from '@/components/mobile/title';
import CardSlideProductMobile from '@/components/mobile/cardSlideProduct';
import { CardProductSlideMobile } from '@/components/mobile/cardProductSlideMobile';
import CardProduct from '@/components/common/cardProduct';

const Component = () => {
  const [active, setActive] = useState('All');
  return (
    <>
      <div className="mb-[24px] bg-white shadow-[0px_4px_25px_0px_#00000014] h-[132px] px-[16px] mx-[16px] rounded-[8px] flex items-center justify-between">
        <div>
          <h2 className="font-bold text-[16px] text-black">Shop Name </h2>
          <div className="flex items-center gap-2 mb-2">
            <p className="font-light text-[8px] text-black">
              Shop with GoGoCash to maximize cashback up to
            </p>
            <h1 className="font-bold text-[20px] text-black">0.00%</h1>
          </div>
          <Button
            icon={<SquareChartGantt />}
            backgroundColor="text-[var(--primary-6)] border-[0.5px] border-[var(--primary-2)] bg-[var(--primary-2)] rounded-full h-[39px] px-10 !py-2"
            text={'Terms and Conditions'}
            onClick={() => {
              console.log('click');
            }}
          />
        </div>
        <div className="w-[100px] h-[100px] rounded-[8px]">
          <Image
            src={'/shopee.png'}
            alt="shopee"
            width={50}
            height={50}
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="px-[16px]">
        <Search />
      </div>

      <ListFilter
        active={active}
        setActive={setActive}
        list={HOME_MOBILE_TYPE}
        space="mt-[24px]"
      />
      <div className="w-full bg-[#F5F4F4] py-5">
        <TitleMobile title={'Today Offer'} rightTitle={'More'} />
        <div className="w-full overflow-hidden pl-[16px]">
          <CardProductSlideMobile list={[]} />
        </div>
      </div>

      <div className="w-full bg-white">
        <TitleMobile title={'Recommended for You'} rightTitle={'More'} />
        <div className="w-full overflow-hidden pl-[16px]">
          <CardSlideProductMobile list={[]} />
        </div>
      </div>
      <div className="w-full bg-white ">
        <TitleMobile title={'All Products'} rightTitle={'More'} />
        <div className="px-[16px] grid grid-cols-2 gap-2 items-center">
          {[1, 2, 3, 4].map((ele, index) => (
            <CardProduct
              key={index}
              _image={''}
              _productName={'test'}
              _shopName={'test'}
              percent={0}
              link="/product/1"
              type={''}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Component;
