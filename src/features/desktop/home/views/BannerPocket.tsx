import Image from 'next/image';
import AppleIcon from '@/components/icons/AppleIcon';
import PlayStoreIcon from '@/components/icons/PlayStoreIcon';
const BannerPocket = () => {
  return (
    <div
      className="relative bg-[var(--primary-4)] rounded-[24px] w-full flex items-center 
    justify-between md:px-[64px] md:py-[40px] p-5 xl:h-[325px] overflow-hidden xl:flex-row flex-col"
    >
      <div className="max-w-[763px] flex w-full flex-col space-y-5">
        <h3 className="text-white text-[32px] font-semibold mb-2">
          Download and earn instant cashback
        </h3>
        <div className="flex items-center gap-3 md:flex-row flex-col">
          <Image
            src={'/qr_code.png'}
            alt={'qr-code'}
            width={75}
            height={75}
            className="w-[75px] h-[75px]"
          />
          <p className="text-white text-[20px] font-normal">
            Turn your everyday spending into rewards! Shop smart, earn cashback,
            and your wallet will thank you. Download GoGoCash now and grab the
            deal.
          </p>
        </div>
        <div className="flex items-center md:justify-start justify-center gap-4  flex-wrap">
          <div className="bg-[var(--black-5)] w-fit h-[51px] rounded-[8px] p-[13px] flex items-center justify-center gap-3">
            <AppleIcon />
            <div>
              <p className="text-white text-[8px] font-extralight">
                Download on the
              </p>
              <h5 className="text-white text-[16px] font-bold">App Store</h5>
            </div>
          </div>
          <div className="bg-[var(--black-5)] w-fit h-[51px] rounded-[8px] p-[13px] flex items-center justify-center gap-3">
            <PlayStoreIcon />
            <div>
              <p className="text-white text-[8px] font-extralight">
                Download on the
              </p>
              <h5 className="text-white text-[16px] font-bold">Google Play</h5>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={'/phone.png'}
        alt={'phone'}
        width={465}
        height={455}
        className="w-[465px] h-auto xl:absolute top-0 right-0 "
      />
    </div>
  );
};

export default BannerPocket;
