import { memo } from 'react';
import { IProp } from './interface';

const Component = ({ onClick, icon, radius, border }: IProp) => {
  return (
    <div
      className={`cursor-pointer hover:scale-105 transition-all duration-75 ${
        border ? ' border border-grey-1' : ''
      } w-fit h-fit p-[8px] ${radius}`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};
export default memo(Component);
