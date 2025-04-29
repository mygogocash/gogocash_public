import { ArrowLeftIcon, CircleHelp } from 'lucide-react';

interface IProps {
  onBack?: () => void;
}
const Component = ({ onBack }: IProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <ArrowLeftIcon
          className="cursor-pointer md:block hidden"
          stroke={'black'}
          onClick={() => {
            onBack?.();
          }}
        />
        <h1 className="text-[24px] font-bold text-[var(--black-5)]">
          Help Center
        </h1>
      </div>

      <div className="bg-[var(--primary-4)] rounded-lg flex items-center justify-center flex-col gap-3 my-5 p-3">
        <CircleHelp stroke="white" width={24} height={24} color="white" />
        <p className="text-white font-bold text-[14px]"> What is GoGoCash?</p>
      </div>
      <div className='space-y-3 mt-5'>
        <p className="text-[var(--black-5)] font-semibold text-[16px]">
          What is GoGoCash?
        </p>
        <p className="text-[var(--black-5)] font-normal text-[14px]">
          GoGoCash is a cashback app that rewards you for your everyday spending
          and rewards you for your everyday spending. Shop smart, earn cashback,
          and your wallet will thank you. Download GoGoCash now and grab the
          deal.
        </p>
      </div>
    </div>
  );
};

export default Component;
