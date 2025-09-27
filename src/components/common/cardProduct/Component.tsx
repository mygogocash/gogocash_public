import { IPropProductList } from './interface';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import ImageComponent from '../Image';

const CardProduct = ({
  _image,
  _productName,
  _shopName,
  percent,
  link,
  type,
  like,
}: IPropProductList) => {
  const router = useRouter();
  return (
    <div
      className="space-y-1 w-[180px] md:w-[200px] bg-white rounded-[8px] h-full m-auto"
      onClick={() => {
        router.push(link);
      }}
    >
      <div className="rounded-t-[8px] relative ">
        <div
          className={`w-fit px-2 h-[34px] bg-primary-4 rounded-tl-[8px] rounded-br-[8px]
          absolute top-0 left-0 text-[15px] font-semibold text-white flex items-center justify-center`}
        >
          {type}
        </div>
        <div
          className={`absolute bottom-3 right-3 bg-white/60 rounded-full w-[30px] h-[30px] flex items-center justify-center`}
        >
          {like ? <HeartFilledIcon color="red" /> : <HeartIcon />}
        </div>
        <div className="rounded-t-[8px] overflow-hidden w-[180px] md:w-[200px] min-h-[200px] max-h-[200px] h-max flex items-center justify-center bg-white">
          <ImageComponent
            src={_image || '/iphone.png'}
            alt={_productName}
            width={200}
            height={200}
            className=" object-contain rounded-t-[8px] h-full"
          />
        </div>
      </div>
      <div className=" p-[8px] md:p-0">
        <h3 className="text-[18px] font-bold text-black max-w-[200px] w-full line-clamp-1">
          {_productName}
        </h3>
        <p className="text-black-3 text-[14px] font-normal line-clamp-1">
          {_shopName}
        </p>
      </div>
      <p className="flex items-center justify-between mb-[16px] w-full max-w-[200px] px-[8px] md:px-0">
        <span className="text-[14px] text-black font-normal">
          Cashback up to
        </span>
        <span className="text-[20px] text-black font-semibold ">{percent}</span>
      </p>
    </div>
  );
};

export default CardProduct;
