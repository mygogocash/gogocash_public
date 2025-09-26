import { IProp } from './interface';
import ImageComponent from '../Image';

const Component = ({ image, height, promotionName, time }: IProp) => {
  return (
    <div className="w-full space-y-4">
      <div
        className={`w-full bg-primary-4 rounded-[8px] flex items-center justify-center flex-col ${
          height || 'h-[272px]'
        } `}
      >
        <ImageComponent
          src={image || '/banner.png'}
          alt="banner"
          width={200}
          height={200}
          className="w-full h-full "
        />
      </div>
      <div>
        <h4 className="text-black-6 text-[12px] md:text-[20px] font-bold">
          {promotionName}
        </h4>
        <p className="text-black-3 text-[10px]  md:text-[16px]">
          {time || '00 Month 0000'}
        </p>
      </div>
    </div>
  );
};

export default Component;
