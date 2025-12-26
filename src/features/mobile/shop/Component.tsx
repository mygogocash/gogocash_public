import { TitleMobile } from '@/components/mobile/title';
import CardProduct from '@/components/common/cardProduct';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { IResponseOffer } from '@/features/desktop/home/interface';
import { fetcher } from '@/lib/client';
import { mapDataProduct } from '@/hooks/useHome';

const Component = () => {
  // const [active, setActive] = useState('All');
  const [offerSearch] = useState({
    category: '',
    page: 1,
    limit: 100,
    search: '',
  });
  const { data: dataMerchants } = useSWR<IResponseOffer>(
    `/offer?category=${offerSearch.category}&search=${offerSearch.search}&limit=${offerSearch.limit}&page=${offerSearch.page}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      // use cache
    }
  );
  const merchants = useMemo(() => {
    if (dataMerchants) return mapDataProduct(dataMerchants);
  }, [dataMerchants]);
  return (
    <>
      {/* <div className="mb-[24px] bg-white shadow-[0px_4px_25px_0px_#00000014] h-[132px] px-[16px] mx-[16px] rounded-[8px] flex items-center justify-between">
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
            backgroundColor="text-primary-6 border-[0.5px] border-primary-2 bg-primary-2 rounded-full h-[39px] px-10 !py-2"
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
      </div> */}

      {/* <ListFilter
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
      </div> */}
      <div className="w-full bg-white ">
        <TitleMobile title={'All Shop'} rightTitle="" />
        <div className="px-[16px] grid grid-cols-2 gap-2 items-center">
          {merchants?.map((ele, index) => (
            <CardProduct
              key={index}
              _image={ele.pic}
              _productName={ele.shopName}
              _shopName={ele.shopName}
              percent={ele.percent}
              link={ele.link}
              type={ele.type}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Component;
