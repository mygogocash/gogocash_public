import { memo } from 'react';
import { IProps } from './interface';

const Component = ({ status, text }: IProps) => {
  return (
    <div
      className={`capitalize rounded-full px-2 py-1 w-fit ${
        status === 'info'
          ? 'bg-[#FFFBE8] text-[#FBD300]'
          : status === 'pending'
          ? 'bg-[#E8F7FF] text-[#5D87FF]'
          : status === 'approved'
          ? 'bg-[#E7F9EF] text-[#00B14F]'
          : 'bg-[#FFEDED] text-[#E60E0E]'
      }`}
    >
      {text}
    </div>
  );
};

export default memo(Component);
