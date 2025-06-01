import { customCache } from '@/app/provider';
import { IList } from '@/components/common/boxSlide/interface';
import {
  IResponseMerchants,
  IResponseProducts,
} from '@/features/desktop/home/interface';
import { fetcher } from '@/lib/client';
import { useMemo } from 'react';
import useSWR from 'swr';

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

  const { data: dataProduct, isLoading: isLoadingProduct } =
    useSWR<IResponseProducts>(`/products`, fetcher, {
      revalidateOnFocus: false,
    });
  const products = useMemo(() => {
    return (
      (dataProduct?.data?.products?.map((item) => ({
        pic: item.images[0],
        percent: Number(item.cashbackPercent.toFixed(2)),
        name: item.name,
        shopName: item.merchantId,
        link: `/product/${item.id}`,
        type: item.status?.toUpperCase(),
      })) as IList[]) || []
    );
  }, [dataProduct]);
  return {
    merchants,
    isLoadingMerchants,
    errorMerchants,
    products,
    isLoadingProduct,
  };
};

export default useHome;
