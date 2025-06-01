import StoreIcon from '@/components/icons/StoreIcon';
import BoxSlide from '@/components/common/boxSlide';
import { useRouter } from 'next/navigation';
import { useHomeContext } from '@/providers/HomeContext';
const Product = () => {
  const router = useRouter();
  const { products, products2, products3, cate } = useHomeContext();

  return (
    <>
      <BoxSlide
        onClick={function (): void {
          router.push('shop');
        }}
        title={cate[0]}
        icon={<StoreIcon />}
        list={products || []}
      />

      <BoxSlide
        onClick={function (): void {
          router.push('product');
        }}
        title={cate[1]}
        icon={<StoreIcon />}
        list={products2 || []}
      />

      <BoxSlide
        onClick={function (): void {
          router.push('promotion');
        }}
        title={cate[2]}
        icon={<StoreIcon />}
        list={products3 || []}
      />
    </>
  );
};

export default Product;
