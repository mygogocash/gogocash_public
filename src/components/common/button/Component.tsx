import { IProp } from './interface';
import clsx from 'clsx';
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
      className={clsx(
        backgroundColor,
        disabled ? '!bg-[var(--black-1)] !text-[var(--black-3)]' : '',
        'px-[32px] py-[16px] rounded-[8px] hover:scale-105 transition-all duration-75 flex items-center',
        fullWidth ? 'w-full' : '',
        center ? 'justify-center' : ''
      )}
      onClick={() => onClick?.()}
      typeof="button"
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
