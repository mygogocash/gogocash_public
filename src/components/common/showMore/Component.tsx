import Button from '../button';
import { IProp } from './interface';

const Component = ({ min, max, onClick, totalPage, currentPage }: IProp) => {
  return (
    <div className="flex items-center justify-center flex-col gap-3 mt-[48px]">
      <p className="text-black-3 text-[14px] font-normal">
        Show {min} results out of {max}
      </p>
      {Number(currentPage) >= Number(totalPage) ? (
        <p className="text-black-3 text-[14px] font-normal">No more data</p>
      ) : (
        <Button
          backgroundColor="bg-white border-[0.5px] border-black-3 rounded-full h-[39px] px-10 !py-2"
          text={'View More'}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default Component;
