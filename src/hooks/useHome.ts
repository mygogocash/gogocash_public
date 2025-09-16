import { customCache } from '@/app/provider';
import { IList } from '@/components/common/boxSlide/interface';
import { IResponseOffer } from '@/features/desktop/home/interface';
import { fetcher } from '@/lib/client';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

export const mapDataProduct = (dt: IResponseOffer) => {
  return dt?.data
    ? dt?.data?.map((item) => {
        const percent = item?.commissions
          ? Object.values(item?.commissions?.[0])
          : [];
        return {
          pic: item?.logo,
          percent: percent?.[0],
          name: item?.offer_name,
          shopName: item?.offer_name,
          link: `/shop/${item?._id}`,
          type: item?.categories?.toUpperCase(),
        };
      })
    : ([] as IList[]);
};
const useHome = () => {
  // get cache
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cacheMerchants = customCache.get('/merchants');
  // console.log('cacheMerchants', cacheMerchants);

  const [offerSearch, setOfferSearch] = useState({
    category: '',
    page: 1,
    limit: 100,
    search: '',
  });
  const {
    data: dataMerchants,
    error: errorMerchants,
    isLoading: isLoadingMerchants,
  } = useSWR<IResponseOffer>(
    `/offer?category=${offerSearch.category}&search=${offerSearch.search}&limit=${offerSearch.limit}&page=${offerSearch.page}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const merchants = useMemo(() => {
    return (
      (dataMerchants?.data?.map((item) => {
        const percent = Object.values(item.commissions?.[0]);
        return {
          pic: item.logo,
          percent: percent[0],
          name: item.offer_name,
          shopName: item.offer_name,
          link: `/shop/${item._id}`,
          type: item.categories?.toUpperCase(),
        };
      }) as IList[]) || []
    );
  }, [dataMerchants]);

  const cate = ['Fashion', 'Marketplace', 'Electronics'];
  const { data: dataProduct, isLoading: isLoadingProduct } =
    useSWR<IResponseOffer>(`/offer?category=${cate[0]}`, fetcher, {
      revalidateOnFocus: false,
    });

  const { data: dataProduct2, isLoading: isLoadingProduct2 } =
    useSWR<IResponseOffer>(`/offer?category=${cate[1]}`, fetcher, {
      revalidateOnFocus: false,
    });

  const { data: dataProduct3, isLoading: isLoadingProduct3 } =
    useSWR<IResponseOffer>(`/offer?category=${cate[2]}`, fetcher, {
      revalidateOnFocus: false,
    });

  const products = useMemo(() => {
    if (dataProduct) return mapDataProduct(dataProduct);
  }, [dataProduct]);

  const products2 = useMemo(() => {
    if (dataProduct2) return mapDataProduct(dataProduct2);
  }, [dataProduct2]);

  const products3 = useMemo(() => {
    if (dataProduct3) return mapDataProduct(dataProduct3);
  }, [dataProduct3]);

  return {
    merchants,
    isLoadingMerchants,
    errorMerchants,
    products,
    isLoadingProduct,
    products2,
    isLoadingProduct3,
    isLoadingProduct2,
    products3,
    cate,
    setOfferSearch,
  };
};

export default useHome;
