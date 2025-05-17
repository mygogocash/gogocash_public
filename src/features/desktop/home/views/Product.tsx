import StoreIcon from '@/components/icons/StoreIcon';
import BoxSlide from '@/components/common/boxSlide';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/client';
import { IResponseCampaigns, IResponseMerchants } from '../interface';
import { useMemo } from 'react';
import { IList } from '@/components/common/boxSlide/interface';
const Product = () => {
  const router = useRouter();
  const { data: dataCampaigns, error, isLoading } = useSWR<IResponseCampaigns>(
    `/campaigns`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const campaigns = useMemo(() => {
    return (
      (dataCampaigns?.data?.map((item) => ({
        pic: item.image,
        percent: Number(0),
        name: item.name,
        shopName: item.name,
        link: `/shop/${item.id}`,
        type: item.type?.toUpperCase(),
      })) as IList[]) || []
    );
  }, [dataCampaigns]);

  const { data: dataMerchants} = useSWR<IResponseMerchants>(
    `/merchants`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const merchants = useMemo(() => {
    return (
      dataMerchants?.data?.items?.map((item) => ({
        pic: item.logo,
        percent: Number(item.cashbackPercent.toFixed(2)),
        name: item.name,
        shopName: item.name,
        link: `/shop/${item.slug}`,
        type: item.type?.toUpperCase(),
      })) as IList[] || []
    );
  }, [dataMerchants]);
  
  return (
    <>
      <BoxSlide
        onClick={function (): void {
          router.push('shop');
        }}
        title={'Merchants'}
        icon={<StoreIcon />}
        list={merchants}
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
