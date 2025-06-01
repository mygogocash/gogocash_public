import { customCache } from '@/app/provider';
import { IList } from '@/components/common/boxSlide/interface';
import {
  IResponseAds,
  IResponseMerchants,
  IResponseProducts,
} from '@/features/desktop/home/interface';
import { fetcher } from '@/lib/client';
import { useMemo } from 'react';
import useSWR from 'swr';

export const mapDataProduct = (dt: IResponseProducts) => {
  return (
    (dt?.data?.products?.map((item) => ({
      pic: item.images[0],
      percent: Number(item.cashbackPercent.toFixed(2)),
      name: item.name,
      shopName: item.merchantId,
      link: `/product/${item.id}`,
      type: item.status?.toUpperCase(),
    })) as IList[]) || []
  );
};
const useHome = () => {
  // get cache
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cacheMerchants = customCache.get('/merchants');
  // console.log('cacheMerchants', cacheMerchants);

  const {
    data: dataMerchants,
    error: errorMerchants,
    isLoading: isLoadingMerchants,
  } = useSWR<IResponseMerchants>(`/merchants`, fetcher, {
    revalidateOnFocus: false,
  });
  const merchants = useMemo(() => {
    return (
      (dataMerchants?.data?.items?.map((item) => ({
        pic: item.logo,
        percent: Number(item.cashbackPercent.toFixed(2)),
        name: item.name,
        shopName: item.name,
        link: `/shop/${item.id}`,
        type: item.type?.toUpperCase(),
      })) as IList[]) || []
    );
  }, [dataMerchants]);

  const cate = [
    "Men's Shoes and Clothing",
    'Televisions & Videos',
    'Computers & Laptops',
  ];
  const { data: dataProduct, isLoading: isLoadingProduct } =
    useSWR<IResponseProducts>(`/products?categories=${cate[0]}`, fetcher, {
      revalidateOnFocus: false,
    });

  const { data: dataProduct2, isLoading: isLoadingProduct2 } =
    useSWR<IResponseProducts>(`/products?categories=${cate[1]}`, fetcher, {
      revalidateOnFocus: false,
    });

  const { data: dataProduct3, isLoading: isLoadingProduct3 } =
    useSWR<IResponseProducts>(`/products?categories=${cate[2]}`, fetcher, {
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

  const { data: banner, isLoading: isLoadingBanner } = useSWR<IResponseAds>(
    `/ads?position=banner`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: sidebar, isLoading: isLoadingSidebar } = useSWR<IResponseAds>(
    `/ads?position=sidebar`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: popup, isLoading: isLoadingPopup } = useSWR<IResponseAds>(
    `/ads?position=popup`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

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
    banner,
    isLoadingBanner,
    sidebar,
    isLoadingSidebar,
    isLoadingPopup,
    popup,
  };
};

export default useHome;
