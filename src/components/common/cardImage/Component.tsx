import { IProp } from './interface';
import { useRouter } from 'next/navigation';
import ImageComponent from '../Image';

const Component = ({ image, percent, link }: IProp) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(link);
      }}
      className="w-[180px] md:w-[200px] h-[272px] rounded-[8px] bg-[#FFF] flex items-center justify-between flex-col"
    >
      <div className="w-[200px] h-[200px] rounded-t-[8px]">
        <ImageComponent
          src={image || '/shopee.png'}
          alt="card"
          width={200}
          height={200}
        />
      </div>
      <p className="flex items-center justify-between mb-[16px] w-full px-2">
        <span className="text-[14px] text-black font-normal">
          Cashback up to
        </span>
        <span className="text-[20px] text-black font-semibold ">
          {' '}
          {percent}%
        </span>
      </p>
    </div>
  );
};

export default Component;
