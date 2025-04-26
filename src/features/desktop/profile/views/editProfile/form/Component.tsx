import Button from '@/components/common/button';
import TitleBar from '@/features/desktop/home/views/TitleBar';
import Image from 'next/image';
import { IProp } from './interface';

const Component = ({ setIsOpenModal }: IProp) => {
  return (
    <div className={`flex justify-center flex-col space-y-5 p-3`}>
      <div className={`mx-auto`}>
        <Image
          src={`/avatar/profile_1.png`}
          alt="profile"
          width={100}
          height={100}
        />
      </div>
      <TitleBar title={'Choose your Avatar'} />
      <div className="flex items-center gap-5 flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((ele, index) => {
          return (
            <div
              key={index}
              className={` w-[65px] h-[65px] rounded-full flex items-center justify-center ${
                ele === 6 ? ` border border-[green]` : ''
              }`}
            >
              <Image
                src={`/avatar/profile_1.png`}
                alt="profile"
                width={60}
                className="rounded-full"
                height={60}
              />
            </div>
          );
        })}
      </div>
      <div className="border-b border-[var(--black-1)] w-full h-[1px]" />
      <TitleBar title={'Choose your Background Color'} />
      <div className="flex items-center gap-5 flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((ele, index) => {
          return (
            <div
              key={index}
              className={` w-[45px] h-[45px] rounded-full flex items-center justify-center ${
                ele === 6 ? ` border border-[green]` : ''
              }`}
            >
              <div className={`w-[40px] h-[40px] bg-[red] rounded-full`} />
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button
          text={'Cancel'}
          center
          backgroundColor="bg-[var(--black-2)] text-black"
          onClick={() => {
            setIsOpenModal?.(false);
          }}
        />
        <Button
          text={'Save'}
          center
          backgroundColor="bg-[var(--primary-4)] text-white"
        />
      </div>
    </div>
  );
};

export default Component;
