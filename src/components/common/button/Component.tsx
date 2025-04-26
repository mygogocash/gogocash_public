import { IProp } from './interface';

const Component = ({
  disabled,
  onClick,
  text,
  backgroundColor,
  fullWidth,
  icon,
  center,
  type,
}: IProp) => {
  return (
    <button
      type={type || 'button'}
      disabled={disabled}
      className={`${
        disabled ? '!bg-[var(--black-1)] !text-[var(--black-3)]' : ''
      } ${backgroundColor} ${
        fullWidth ? 'w-full' : ''
      } px-[32px] py-[16px] rounded-[8px]
        hover:scale-105 transition-all duration-75 flex items-center ${
          center ? 'justify-center' : ''
        }`}
      onClick={() => onClick?.()}
    >
      {icon && (
        <div className="w-[25px] flex items-center justify-center">
          {icon || ''}
        </div>
      )}
      <p
        className={`text-[14px] font-semibold truncate ${icon ? 'ml-5' : ''} `}
      >
        {text}
      </p>
    </button>
  );
};
export { Component };
