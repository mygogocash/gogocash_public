import TitleBar from '@/features/desktop/home/views/TitleBar';

import React from 'react';
import { list } from '../../constant';
import CardProduct from '@/components/common/cardProduct';
import Button from '@/components/common/button';
import Image from 'next/image';
import { Coins, SquareChartGantt, StoreIcon, WalletIcon } from 'lucide-react';
import Deals from '@/features/desktop/home/views/Deals';
import BoxSlide from '@/components/common/boxSlide';
import BadgeList from '@/components/common/badgeList';
import Search from '@/features/desktop/search';
import Drawer from '@/components/common/drawer';
import Condition from './views/Condition';
import HowtoClaim from './views/HowtoClaim';
import Tab from '@/components/common/tab';
import ShowMore from '@/components/common/showMore';
import { useRouter } from 'next/navigation';
const Component = () => {
  const [isOpenCondition, setIsOpenCondition] = React.useState(false);
  const [isOpenClaim, setIsOpenClaim] = React.useState(false);
  const router = useRouter();
  return (
    <div className="container-inner space-y-8 my-[10px] md:my-[88px]">
      {/*  */}
      <div className="flex items-center gap-20 md:flex-row flex-col">
        <div className="w-[300px] h-[300px]">
          <Image
            src={'/shopee.png'}
            width={300}
            height={300}
            alt="shopee"
            className="w-full"
          />
        </div>
        <div>
          <h1 className="font-bold text-[30px] md:text-[40px] text-[var(--black-5)]">
            Shopee Thailand
          </h1>
          <h3 className="font-normal text-[16px] md:text-[24px] text-[var(--black-5)]">
            Shop with GoGoCash to maximize cashback up to{' '}
            <span className=" text-[30px] md:text-[40px]">10%</span>
          </h3>
          <p className="text-[20px] text-[var(--black-3)] text-light my-3 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            euismod id sem quis accumsan. Sed tempus placerat velit a placerat.
            Cras suscipit est at mauris blandit efficitur finibus non augue.
          </p>
          <BadgeList
            list={[
              {
                icon: <WalletIcon size={30} />,
                title: '10%',
                subTitle: 'Featured Products',
              },
              {
                icon: <WalletIcon />,
                title: '10%',
                subTitle: 'Featured Products',
              },
              {
                icon: <WalletIcon />,
                title: '10%',
                subTitle: 'Featured Products',
              },
            ]}
          />
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap space-y-3">
        <div className="max-w-[400px] w-full">
          <Search />
        </div>
        <div className="flex items-center gap-4  flex-wrap ">
          <Button
            icon={<SquareChartGantt />}
            backgroundColor="text-white border-[0.5px] border-[var(--primary-4)] bg-[var(--primary-4)] rounded-full h-[39px] px-10 !py-2"
            text={'Terms and Conditions'}
            onClick={() => {
              setIsOpenCondition(true);
            }}
          />
          <Button
            icon={<Coins />}
            backgroundColor="text-white border-[0.5px] border-[var(--primary-4)] bg-[var(--primary-4)] rounded-full h-[39px] px-10 !py-2"
            text={'How to Claim?'}
            onClick={() => {
              setIsOpenClaim(true);
            }}
          />
        </div>
      </div>
      <Drawer isOpen={isOpenCondition} setIsOpen={setIsOpenCondition}>
        <Condition />
      </Drawer>

      <Drawer isOpen={isOpenClaim} setIsOpen={setIsOpenClaim}>
        <HowtoClaim />
      </Drawer>

      <Tab
        list={list.map((item) => ({
          ...item,
          content: (
            <BoxSlide
              onClick={function (): void {
                router.push('/product');
              }}
              title={'Merchants'}
              icon={<StoreIcon stroke="white" size={60} />}
              list={[]}
            />
          ),
        }))}
      />

      {/*  */}

      {/*  */}
      <div className="space-y-5">
        <TitleBar
          title={'Grab your Deals'}
          button={{
            text: 'View More',

            onClick: () => {
              router.push('/product');
            },
          }}
        />
        <Deals />
      </div>
      {/*  */}
      <div className="flex items-center justify-between">
        <h1 className="text-[var(--black-5)] font-bold text-[24px] md:text-[36px]">
          All Products
        </h1>
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
                  link={'/product/1'}
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
