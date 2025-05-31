import StoreIcon from '@/components/icons/StoreIcon';
import { fetcher } from '@/lib/client';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { IResponseMerchants } from '../interface';
import { useMemo } from 'react';
import { IList } from '@/components/common/boxSlide/interface';
import { customCache } from '@/app/provider';
import BoxSlideImage from '@/components/common/boxSlideImage';
const Merchants = () => {
  const router = useRouter();
  // get cache
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cacheMerchants = customCache.get('/merchants');
  // console.log('cacheMerchants', cacheMerchants);

  const {
    data: dataMerchants,
    error,
    isLoading,
  } = useSWR<IResponseMerchants>(`/merchants`, fetcher, {
    revalidateOnFocus: false,
  });
  const merchants = useMemo(() => {
    return (
      (dataMerchants?.data?.items?.map((item) => ({
        pic: 'https://picsum.photos/id/237/200/300',
        percent: Number(item.cashbackPercent.toFixed(2)),
        name: item.name,
        shopName: item.name,
        link: `/shop/${item.slug}`,
        type: item.type?.toUpperCase(),
      })) as IList[]) || []
    );
  }, [dataMerchants]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <BoxSlideImage
        onClick={function (): void {
          router.push('shop');
        }}
        title={'Merchants'}
        icon={<StoreIcon />}
        list={merchants}
      />
    </>
  );
};

export default Merchants;
