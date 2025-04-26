import TitleBar from '@/features/desktop/home/views/TitleBar';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { Community, Social } from './constant';

const Component = () => {
  return (
    <>
      <div>
        <TitleBar title={'Connect with GoGoCash'} />

        <div className="flex gap-5  md:flex-row flex-col">
          <div className="w-full">
            <p className="text-[20px] md:text-[24px] font-medium text-[var(--black-4)] my-4">
              Link Social Medias
            </p>
            <div className="space-y-3 ">
              {Social.map((ele, index) => {
                return (
                  <div
                    key={index}
                    className={`h-[72px] w-full border border-[var(--grey-1)] flex items-center gap-4 px-[24px] py-[16px] rounded-[8px]`}
                  >
                    <Image
                      src={`${ele.img}`}
                      width={40}
                      height={40}
                      alt="social"
                    />
                    <p className="text-[16px] md:text-[20px] text-[var(--black-4)]">
                      Link with {ele.label}
                    </p>
                    <div className="ml-auto">
                      <Check />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full">
            <p className="text-[20px] md:text-[24px] font-medium text-[var(--black-4)] my-4">
              Link Social Medias
            </p>
            <div className="space-y-3 ">
              {Community.map((ele, index) => {
                return (
                  <div
                    key={index}
                    className={`h-[72px] w-full border border-[var(--grey-1)] flex items-center gap-4 px-[24px] py-[16px] rounded-[8px]`}
                  >
                    <Image
                      src={`${ele.img}`}
                      width={40}
                      height={40}
                      alt="social"
                    />
                    <p className="text-[16px] md:text-[20px] text-[var(--black-4)]">
                      Link with {ele.label}
                    </p>
                    <div className="ml-auto">
                      <Check />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
