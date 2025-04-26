import StoreIcon from '@/components/icons/StoreIcon';
import BoxSlide from '@/components/common/boxSlide';
import { useRouter } from 'next/navigation';
const Product = () => {
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
