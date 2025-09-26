import { ArrowDown, ArrowUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Component = () => {
  const router = useRouter();
  return (
    <div className="p-5 space-y-5">
      <p className="text-[20px] font-medium text-black-6">Wallet History</p>
      <div
        onClick={() => {
          router.push(`/history/1`);
        }}
        className="shadow-[0px_1px_10px_0px_rgba(0,0,0,0.25)] rounded-[8px] flex items-center gap-3 p-[16px]"
      >
        <ArrowDown color="#E60E0E" size={20} />
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <p className="text-[16px] font-medium text-black-6">sss</p>
            <p className="text-[20px] font-medium text-[#E60E0E]">+$20</p>
          </div>
          <p className="text-gray-400 text-[10px]">Earn Cashback</p>
          <p className="text-gray-400 text-[10px] mt-3">
            Added to your wallet: 1 Jan 2025 00:00
          </p>
          <p className="text-black-6 text-[10px] capitalize">complete</p>
        </div>
      </div>

      <div
        onClick={() => {
          router.push(`/history/1`);
        }}
        className="shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] rounded-[8px] flex items-center gap-3 p-[16px]"
      >
        <ArrowUp color="#00B14F" size={20} />
        <div className="w-full">
          <div className="flex items-center justify-between w-full">
            <p className="text-[16px] font-medium text-black-6">sss</p>
            <p className="text-[20px] font-medium text-primary-4">+$20</p>
          </div>
          <p className="text-gray-400 text-[10px]">Earn Cashback</p>
          <p className="text-gray-400 text-[10px] mt-3">
            Added to your wallet: 1 Jan 2025 00:00
          </p>
          <p className="text-black-6 text-[10px] capitalize">complete</p>
        </div>
      </div>
    </div>
  );
};

export default Component;
