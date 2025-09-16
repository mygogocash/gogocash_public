import React, { useState } from 'react';
import { list } from '../../constant';
import CardProduct from '@/components/common/cardProduct';
import Button from '@/components/common/button';
import { BoxIcon, Coins, SquareChartGantt, Tag } from 'lucide-react';
import BadgeList from '@/components/common/badgeList';
import Search from '@/features/desktop/search';
import Drawer from '@/components/common/drawer';
import Condition from './views/Condition';
import HowtoClaim from './views/HowtoClaim';
import Tab from '@/components/common/tab';
import ShowMore from '@/components/common/showMore';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/client';
import ImageComponent from '@/components/common/Image';
import CartIcon from '@/components/icons/CartIcon';
import { DataOffer, IResponseOffer } from '@/features/desktop/home/interface';
import { mapDataProduct } from '@/hooks/useHome';
const Component = () => {
  const [isOpenCondition, setIsOpenCondition] = React.useState(false);
  const [isOpenClaim, setIsOpenClaim] = React.useState(false);
  const params = useParams();
  const { data: shopDetail } = useSWR<DataOffer>(
    `/offer/${params.id}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const shop = shopDetail;
  const [offerSearch] = useState({
    category: '',
    page: 1,
    limit: 100,
    search: '',
  });
  const dataShop = mapDataProduct({ data: [shopDetail] } as IResponseOffer);
  const { data: dataOffer } = useSWR<IResponseOffer>(
    `/offer?category=${offerSearch.category}&search=${offerSearch.search}&limit=${offerSearch.limit}&page=${offerSearch.page}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const data = mapDataProduct(dataOffer as IResponseOffer);
  return (
    <div className="container-inner space-y-8 my-[10px] md:my-[88px]">
      {/*  */}
      <div className="flex items-start gap-20 md:flex-row flex-col">
        <div className="w-[30%] h-[300px]">
          <ImageComponent
            src={shop?.logo || '/shopee.png'}
            width={300}
            height={300}
            alt={shop?.offer_name || 'shop name'}
            className="w-full"
          />
        </div>
        <div className="w-[70%]">
          <h1 className="font-bold text-[30px] md:text-[40px] text-[var(--black-5)]">
            {shop?.offer_name || ''}
          </h1>
          <h3 className="font-normal text-[16px] md:text-[24px] text-[var(--black-5)]">
            Shop with GoGoCash to maximize cashback up to{' '}
            <span className=" text-[30px] md:text-[40px]">
              {dataShop?.[0]?.percent || 0}
            </span>
          </h3>
          <div
            className="text-[20px] text-[var(--black-3)] text-light my-3 mb-8"
            dangerouslySetInnerHTML={{ __html: shop?.description || '' }}
          />
          <BadgeList
            list={[
              {
                icon: <CartIcon width={24} height={24} strokeWidth={4} />,
                title: '10%',
                subTitle: 'Featured Products',
              },
              {
                icon: <Tag />,
                title: '10%',
                subTitle: 'Hot Deals',
              },
              {
                icon: <BoxIcon />,
                title: '10%',
                subTitle: 'Sold Out with GoGoCash',
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
        <Condition link={`${shop?.tracking_link}?` || ''} />
      </Drawer>

      <Drawer isOpen={isOpenClaim} setIsOpen={setIsOpenClaim}>
        <HowtoClaim />
      </Drawer>

      {/* <Tab
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
      /> */}

      {/*  */}

      {/*  */}
      {/* <div className="space-y-5">
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
      </div> */}
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
              {data?.map((item, index) => (
                <CardProduct
                  key={index}
                  _image={item.pic}
                  _productName={item.name}
                  _shopName={item.shopName}
                  percent={item.percent}
                  link={`${item.link}`}
                  type={item.type}
                />
              ))}
            </div>
          ),
        }))}
      />
      <ShowMore min={offerSearch.limit} max={80} />
    </div>
  );
};

export default Component;
