import Button from '@/components/common/button';
import React from 'react';
interface IProp {
  title: string;
  button?: {
    text: string;
    onClick?: () => void;
  };
  icon?: React.ReactNode;
  styleButton?: string;
}
const TitleBar = ({ title, button, icon, styleButton }: IProp) => {
  return (
    <div className="sm:flex-row flex-col flex items-center justify-between">
      <h1 className="text-[var(--black-5)] text-[20px] md:text-[32px] font-semibold">
        {title}
      </h1>
      {button && (
        <Button
          icon={icon}
          backgroundColor={`${
            styleButton
              ? styleButton
              : 'bg-white border border-[var(--black-3)] '
          } rounded-full h-[39px] px-10 !py-0 `}
          onClick={function (): void {
            button?.onClick?.();
          }}
          text={button?.text || ''}
        />
      )}
    </div>
  );
};

export default TitleBar;
