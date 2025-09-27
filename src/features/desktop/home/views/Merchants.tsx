import StoreIcon from '@/components/icons/StoreIcon';
import { useRouter } from 'next/navigation';
import BoxSlideImage from '@/components/common/boxSlideImage';
import { useHomeContext } from '@/providers/HomeContext';
import { IList } from '@/components/common/boxSlide/interface';
const Merchants = () => {
  const router = useRouter();
  const { errorMerchants, isLoadingMerchants, merchants } = useHomeContext();
  if (errorMerchants) return <div>failed to load</div>;
  if (isLoadingMerchants) return <div>loading...</div>;
  return (
    <>
      <BoxSlideImage
        onClick={function (): void {
          router.push('shop');
        }}
        title={'Merchants'}
        icon={<StoreIcon />}
        list={merchants as IList[]}
      />
    </>
  );
};

export default Merchants;
