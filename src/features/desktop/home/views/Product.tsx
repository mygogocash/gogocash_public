import StoreIcon from '@/components/icons/StoreIcon';
import BoxSlide from '@/components/common/boxSlide';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/client';
import { IResponseCampaigns } from '../interface';
import { useMemo } from 'react';
import { IList } from '@/components/common/boxSlide/interface';
const Product = () => {
  const router = useRouter();
  const { data: dataProduct } = useSWR<IResponseCampaigns>(
    `/products`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const products = useMemo(() => {
    return (
      (dataProduct?.data?.map((item) => ({
        pic: item.image,
        percent: Number(0),
        name: item.name,
        shopName: item.name,
        link: `/shop/${item.id}`,
        type: item.type?.toUpperCase(),
      })) as IList[]) || []
    );
  }, [dataProduct]);

  return (
    <>
      <BoxSlide
        onClick={function (): void {
          router.push('shop');
        }}
        title={'Merchants'}
        icon={<StoreIcon />}
        list={products}
      />

      <BoxSlide
        onClick={function (): void {
          router.push('product');
        }}
        title={'Merchants'}
        icon={<StoreIcon />}
        list={[]}
      />

      <BoxSlide
        onClick={function (): void {
          router.push('promotion');
        }}
        title={'Merchants'}
        icon={<StoreIcon />}
        list={[]}
      />
    </>
  );
};

export default Product;
