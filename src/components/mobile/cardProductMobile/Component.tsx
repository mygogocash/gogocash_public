import { HeartFilledIcon } from '@radix-ui/react-icons';
import { Tag } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface IProp {
  _image: string;
  _productName: string;
  _shopName: string;
  percent: string;
  link: string;
  type: string;
  like?: boolean;
}
const Component = ({ ...prop }: IProp) => {
  const router = useRouter();
  return (
    <div
      className="flex items-center gap-3"
      onClick={() => {
        router.push(prop.link);
      }}
    >
      <div className="w-[100px] h-[100px] rounded-[8px] flex items-center">
        <Image
          src={prop._image || `/iphone.png`}
          alt="iphone"
          width={100}
          height={100}
          className=" rounded-[8px] w-full h-auto"
        />
      </div>
      <div className="flex flex-col justify-between min-h-[80px] w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-[13px] text-[var(--primary-4)]">PROMO</p>
            <p className="text-[10px] font-medium text-[var(--black-3)]">
              Shop Name
            </p>
          </div>
          <HeartFilledIcon />
        </div>
        <p className="text-[13px] font-medium text-[var(--black-4)]">
          {/* box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25); */}
          Cashback{' '}
          <span className="text-[16px] font-bold drop-shadow-lg">10%</span>
        </p>
        <div className="border border-[var(--primary-4)] rounded-[3px] flex items-center gap-1 justify-center w-fit px-1">
          <Tag size={9} className="rotate-90" stroke="#00b14f" />
          <p className="text-[#244340] text-[10px]">On Promotion</p>
        </div>
      </div>
    </div>
  );
};

export default Component;
