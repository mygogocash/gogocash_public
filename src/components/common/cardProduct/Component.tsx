import { IProp } from './interface';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import ImageComponent from '../Image';

const CardProduct = ({
  _image,
  _productName,
  _shopName,
  percent,
  link,
  type,
}: IProp) => {
  const router = useRouter();
  return (
    <div
      className="space-y-1 w-[180px] md:w-[200px] bg-white rounded-[8px]"
      onClick={() => {
        router.push(link);
      }}
    >
      <div className="rounded-t-[8px] relative ">
        <div
          className={`w-[88px] h-[34px] bg-[var(--primary-4)] rounded-tl-[8px] rounded-br-[8px]
          absolute top-0 left-0 text-[15px] fotn-semoibold text-white flex items-center justify-center`}
        >
          {type}
        </div>
        <div
          className={`absolute bottom-3 right-3 bg-white/70 rounded-full w-[30px] h-[30px] flex items-center justify-center`}
        >
          <HeartFilledIcon color="red" />
        </div>
        <div className="rounded-t-[8px]">
          <ImageComponent
            src={_image || '/iphone.png'}
            alt={_productName}
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className=" p-[8px] md:p-0">
        <h3 className="text-[18px] font-bold text-black max-w-[200px] w-full">
          {_productName}
        </h3>
        <p className="text-[var(--black-3)] text-[14px] font-normal">
          {_shopName}
        </p>
      </div>
      <p className="flex items-center justify-between mb-[16px] w-full max-w-[200px] px-[8px] md:px-0">
        <span className="text-[14px] text-black font-normal">
          Cashback up to
        </span>
        <span className="text-[20px] text-black font-semibold ">
          {percent}%
        </span>
      </p>
    </div>
  );
};

export default CardProduct;
