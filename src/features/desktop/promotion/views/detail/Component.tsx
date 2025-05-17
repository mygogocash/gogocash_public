import CardSlideImage from '@/components/common/cardSlideImage';
import TitleBar from '@/features/desktop/home/views/TitleBar';
import Search from '@/features/desktop/search';

import React, { useState } from 'react';
import { list } from '../../constant';
import CardProduct from '@/components/common/cardProduct';
import Button from '@/components/common/button';
import Image from 'next/image';
import { SquareChartGantt } from 'lucide-react';
import ShowMore from '@/components/common/showMore';
import Tab from '@/components/common/tab';
import { useRouter } from 'next/navigation';
const Component = () => {
  const [openTerm, setOpenTerm] = useState(false);
  const router = useRouter();
  return (
    <div className="container-inner space-y-8 my-[10px] md:my-[88px]">
      <Image
        src={'/banner.png'}
        width={580}
        height={580}
        alt="promotion"
        className="w-full"
      />
      <div className="flex items-center justify-between md:flex-row flex-col">
        <h1 className="font-bold text-[30px] md:text-[40px] text-[var(--black-5)]">
          Grocery Shopping Made Easy
        </h1>
        <p className="font-normal text-[30px] md:text-[40px] text-[var(--black-5)]">
          1 Jan 2025 to 31 March 2025
        </p>
      </div>
      <div className="text-[var(--black-3)] text-[18px] md:text-[24px] font-light">
        {`Tired of lugging heavy bags and fighting crowds at the grocery store? 🛒
        Let Shopee Thailand bring the fresh produce to you! 🥦🍎 We offer a wide
        selection of fruits, vegetables, and healthy food options, all delivered
        right to your doorstep. 🏡

        What's more? We're having a special offer! 🎉
        Enjoy a whopping 30% OFF on all items! 💰 That's right, stock up on your
        favorites without breaking the bank! 💰`}
      </div>

      <div className={`w-full relative min-h-[50px] `}>
        <Button
          icon={<SquareChartGantt />}
          backgroundColor="absolute top-[-19px] left-0  text-white border-[0.5px] border-[var(--primary-4)] bg-[var(--primary-4)] rounded-full h-[39px] px-10 !py-2"
          text={'Terms and Conditions'}
          onClick={() => {
            setOpenTerm(!openTerm);
          }}
        />

        {openTerm && (
          <div className="text-[var(--black-3)] text-[18px] md:text-[24px] font-light border border-[var(--primary-4)] rounded-[16px] p-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            euismod id sem quis accumsan. Sed tempus placerat velit a placerat.
            Cras suscipit est at mauris blandit efficitur finibus non augue.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            euismod id sem quis accumsan. Sed tempus placerat velit a placerat.
            Cras suscipit est at mauris blandit efficitur finibus non
            augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            euismod id sem quis accumsan. Sed tempus placerat velit a placerat.
            Cras suscipit est at mauris blandit efficitur finibus non augue.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            euismod id sem quis accumsan. Sed tempus placerat velit a placerat.
            Cras suscipit est at mauris blandit efficitur finibus non augue.
          </div>
        )}
      </div>
      {/*  */}
      <div className="space-y-5">
        <TitleBar
          title={'Feature Merchants'}
          button={{
            text: 'View More',
            onClick: () => {
              router.push('/shop');
            },
          }}
        />
        <CardSlideImage />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-[var(--black-5)] font-bold text-[24px] md:text-[36px]">
          Featured Products
        </h1>
        <div className="max-w-[400px] w-full">
          <Search />
        </div>
      </div>

      <Tab
        list={list.map((item) => ({
          ...item,
          content: (
            <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-10 pt-10">
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <CardProduct
                  key={index}
                  _image={''}
                  _productName={''}
                  _shopName={''}
                  percent={0}
                  link="/product/1"
                  type={''}
                />
              ))}
            </div>
          ),
        }))}
      />
      <ShowMore min={20} max={80} />
    </div>
  );
};

export default Component;
