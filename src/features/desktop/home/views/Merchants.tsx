import BoxSlide from '@/components/common/boxSlide';
import StoreIcon from '@/components/icons/StoreIcon';
import { useRouter } from 'next/navigation';
const Merchants = () => {
  const router = useRouter();
  return (
    <>
      <BoxSlide
        onClick={function (): void {
          router.push('shop');
        }}
        title={'Merchants'}
        icon={<StoreIcon />}
        list={[]}
      />
    </>
  );
};

export default Merchants;
