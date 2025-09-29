import { list } from './constant';
import CardImage from '@/components/common/cardImage';
// import TitleBar from '../home/views/TitleBar';
// import CardSlideProduct from '@/components/common/cardSlideProduct';
// import Deals from '../home/views/Deals';
import Search from '../search';
import ShowMore from '@/components/common/showMore';
import Tab from '@/components/common/tab';
import { useEffect, useState } from 'react';
import { mapDataProduct } from '@/hooks/useHome';
import useSWR from 'swr';
import { IResponseOffer } from '../home/interface';
import { fetcher } from '@/lib/client';
import { IList } from '@/components/common/boxSlideImage/interface';

const Component = () => {
  const [offerSearch, setSearch] = useState({
    category: '',
    page: 1,
    limit: 30,
    search: '',
  });
  const [listOffer, setListOffer] = useState<IList[]>([]);

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

  useEffect(() => {
    if (window.sessionStorage.getItem('search_offer')) {
      const search_offer = window.sessionStorage.getItem('search_offer') || '';
      setSearch({ ...offerSearch, search: search_offer });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataMerchants) {
      if (offerSearch.search) {
        setListOffer(mapDataProduct(dataMerchants));
        return;
      }
      const newData = mapDataProduct(dataMerchants);
      const uniqueData = newData.filter(
        (newItem) =>
          !listOffer.some((existingItem) => existingItem.link === newItem.link)
      );
      setListOffer([...listOffer, ...uniqueData]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMerchants]);

  // const merchants = useMemo(() => {
  //   if (dataMerchants) return mapDataProduct(dataMerchants);
  // }, [dataMerchants]);

  return (
    <div className="container-inner space-y-8 my-[10px] md:my-[88px]">
      <div className="flex items-center justify-between md:flex-row flex-col">
        <h1 className="text-black-5 font-bold text-[24px] md:text-[36px]">
          Explore your Favorite Merchants
        </h1>
        <div className="max-w-[400px] w-full">
          <Search
            onSearch={(value) => setSearch({ ...offerSearch, search: value })}
            value={offerSearch.search}
          />
        </div>
      </div>

      <Tab
        list={list.map((item) => ({
          ...item,
          content: (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-10 pt-10">
              {listOffer?.map((item, index) => (
                <CardImage
                  key={index}
                  image={item.pic}
                  percent={item.percent}
                  link={item.link}
                />
              ))}
            </div>
          ),
        }))}
      />

      <ShowMore
        min={listOffer?.length || 0}
        max={dataMerchants?.total || 30}
        totalPage={dataMerchants?.totalPages || 2}
        currentPage={dataMerchants?.page || 1}
        onClick={() => {
          setSearch((prev) => ({ ...prev, page: prev.page + 1 }));
          return true;
        }}
      />

      {/* <div className="space-y-5">
        <TitleBar
          title={'Picked for You'}
          button={{
            text: 'View More',
            onClick: () => {
              router.push('/product');
            },
          }}
        />
        <CardSlideProduct />
      </div>
      <div className="space-y-5">
        <TitleBar
          title={'Grab your Deals'}
          button={{
            text: 'View More',
            onClick: () => {
              router.push('/promotion');
            },
          }}
        />
        <Deals />
      </div> */}
    </div>
  );
};

export default Component;
