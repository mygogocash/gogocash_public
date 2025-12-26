import { IProp } from './interface';

const Component = ({ title, rightTitle, onClick }: IProp) => {
  return (
    <div className="flex items-center justify-between pt-[16px] px-[16px] mb-[16px]">
      <p className="text-black-6 text-[16px]">{title}</p>
      <p className="text-primary-4 text-[12px]" onClick={onClick}>
        {rightTitle}
      </p>
    </div>
  );
};

export default Component;
