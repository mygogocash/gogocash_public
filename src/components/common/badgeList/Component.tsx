import { IProps } from './interface';

const Component = ({ list, vertical }: IProps) => {
  return (
    <div
      className={`flex ${
        vertical ? 'flex-col' : 'md:flex-row flex-col'
      } items-center ${
        vertical ? ' justify-evenly gap-1' : 'justify-between gap-5'
      }  w-full  `}
    >
      {list.map((item, index) => (
        <div
          key={index}
          className={` ${
            index === 0
              ? vertical
                ? 'rounded-t-[24px]'
                : 'rounded-l-[100px]'
              : ''
          } ${
            index === 2
              ? vertical
                ? 'rounded-b-[24px]'
                : 'rounded-r-[100px]'
              : ''
          }  bg-[var(--black-1)]  ${
            vertical ? ' h-auto w-[150px] p-3' : 'w-full h-[76px]'
          }  flex items-center justify-center gap-5 `}
        >
          {item.icon}
          <div className="flex flex-col max-w-[140px]">
            <h3 className="text-[var(--black-5)] text-[24px]  font-semibold">
              {item.title}
            </h3>
            <p className="text-[var(--black-4)] text-[8px]">{item.subTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Component;
