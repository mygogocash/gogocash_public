import IconButton from '@/components/common/IconButton';
import { Dispatch, ElementType, SetStateAction } from 'react';
interface IProp {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  list: { label: string; icon: ElementType }[];
  space?: string;
}
const ListFilter = ({ active, setActive, list, space }: IProp) => {
  return (
    <div
      className={`flex items-center justify-between gap-3 w-full ${
        space || 'mt-10'
      } p-[16px]`}
    >
      {list.map((ele, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-center flex-col gap-2"
            onClick={() => {
              setActive(ele.label);
            }}
          >
            <div
              className={`w-[65px] h-[65px] rounded-full ${
                active === ele.label
                  ? 'bg-[var(--primary-4)]'
                  : 'bg-[var(--primary-2)]'
              } flex items-center justify-center`}
            >
              <IconButton
                icon={
                  <ele.icon
                    className={`${ele.label === 'All' ? 'rotate-45' : ''}`}
                    stroke={active === ele.label ? 'white' : '#00B14F'}
                    size={30}
                  />
                }
              />
            </div>
            <p
              className={`text-center ${
                active === ele.label
                  ? 'text-[var(--primary-4)]'
                  : 'text-[var(--black-3)]'
              } text-[12px] font-medium`}
            >
              {ele.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ListFilter;
