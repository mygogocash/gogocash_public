import Button from '@/components/common/button';
import { TitleMobile } from '@/components/mobile/title';
import Search from '@/features/desktop/search';
import { CircleHelp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CardSlideProductMobile from '@/components/mobile/cardSlideProduct';
import Deals from './views/Deals';
import { HOME_MOBILE_TYPE } from './constant';
import useCountdown from '@/hooks/useCountdown';
import { HeaderMobile } from '@/components/layouts/mobile/header';
import ListFilter from './views/ListFilter';
import { CardProductMobile } from '@/components/mobile/cardProductMobile';

const Component = () => {
  const router = useRouter();
  const [active, setActive] = useState('All');
  const { data } = useSession();
  const {
    formatTime: { hours, minutes, seconds, days },
  } = useCountdown('2025-04-30');

  return (
    <div
      className={`w-full ${
        data ? 'h-full' : 'h-[calc(100vh-220px)]'
      } overflow-auto bg-white`}
    >
      <div className="bg-[var(--primary-4)]">
        <HeaderMobile
          background="bg-[var(--primary-4)]"
          iconRight={
            <CircleHelp
              stroke="white"
              width={24}
              height={24}
              onClick={() => router.push(`/help-center`)}
            />
          }
        />
        <div className="relative bg-[var(--primary-4)] h-[180px] w-full px-[16px] pb-[16px]">
          {data ? (
            <div className="w-full flex ite,ms-center justify-center flex-col h-full pb-[25px]">
              <div className="flex items-center justify-between">
                <p className="text-white text-[16px] font-normal">
                  Wallet Balance
                </p>
                <Image
                  src={`/logoWhite.svg`}
                  alt="logo"
                  width={32}
                  height={32}
                  className={`w-[32px] h-[32px]`}
                />
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-white font-bold text-[32px]">฿ 50.00 </h1>
                <div className="flex items-center gap-1 h-auto w-fit px-2 py-1 rounded-[100px] bg-[#FFFBE8] shadow drop-shadow-[0px_4px_25px_0px_#00000040]">
                  {/* <Star /> */}
                  {/* /Users/admin/gogocash/apps/web-end-user/public/solar_star-bold-duotone.svg */}
                  <Image
                    src={`/solar_star-bold-duotone.svg`}
                    alt="solar_star"
                    width={22}
                    height={22}
                    className={`w-[22px] h-[22px]`}
                  />
                  <p className="text-[10px] font-semibold">Rating 60%</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Image
                src={`/logoWhite.svg`}
                alt="logo"
                width={60}
                height={37}
                className="w-[60px] h-[37px] mx-auto my-2"
              />
              <p className="text-white text-[16px] font-normal text-center">
                Get Instant Cashback on every spend
              </p>
            </>
          )}
          <div className="absolute bottom-[-26px] w-full left-1/2 -translate-x-1/2 px-[16px] z-[99]">
            <Search />
          </div>
        </div>
      </div>

      <ListFilter
        active={active}
        setActive={setActive}
        list={HOME_MOBILE_TYPE}
      />
      {/* countdown */}
      <div className="relative bg-[--primary-4] relative rounded-[8px] min-h-[60px] m-[16px] flex items-center justify-between px-[13px] py-[5px]">
        <Image
          src={'/Coin.svg'}
          alt="Coin"
          width={20}
          height={20}
          className="absolute left-[-10px] bottom-0"
        />
        <Image
          src={'/Coin_1.svg'}
          alt="Coin_1"
          width={36}
          height={36}
          className="absolute left-[23%] top-[-12px]"
        />
        <Image
          src={'/Bolt.svg'}
          alt="Bolt"
          width={38}
          height={57}
          className="absolute left-[32%] bottom-[-15px]"
        />
        <div>
          <h1 className="text-white text-[20px] font-extrabold">Boost</h1>
          <h1 className="text-white text-[20px] font-extrabold">your Wallet</h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[30px] font-extrabold text-white">3</p>
          <p className="text-white text-[10px] text-normal w-[35px]">
            Steps to Earn
          </p>
          <div className="flex items-center gap-1 relative">
            {[days, hours, minutes, seconds].map((ele, index) => {
              return (
                <div className="" key={index}>
                  <div className="flex items-center justify-center flex-col gap-1">
                    <h1 className="bg-white w-[30px] h-[30px] text-black text-[16px] flex items-center justify-center rounded-[8px]">
                      {ele}
                    </h1>
                    <p className="text-white text-[6px] text-normal">
                      {index == 0
                        ? 'Days'
                        : index === 1
                        ? 'Hours'
                        : index === 2
                        ? 'Minutes'
                        : 'Seconds'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/*  */}
      <TitleMobile title={'Recommended Shops for You'} rightTitle={'More'} />
      <div className="px-[16px] space-y-2">
        {[1, 2, 3, 4].map((ele, index) => {
          return (
            <CardProductMobile
              key={index}
              _image={''}
              _productName={''}
              _shopName={''}
              percent={ele}
              link={''}
              type={''}
            />
          );
        })}
      </div>

      <div className="w-full bg-[#F5F4F4]">
        <TitleMobile title={'Recommended for You'} rightTitle={'More'} />
        <div className="w-full overflow-hidden pl-[16px]">
          <CardSlideProductMobile />
        </div>
      </div>
      <div className="w-full bg-white space-y-3">
        <TitleMobile title={'Order Now'} rightTitle={'More'} />
        <div className="w-full overflow-hidden pl-[16px]">
          <Deals />
        </div>
      </div>
      {!data && (
        <div className="absolute w-full bottom-0 bg-white border-t border-white rounded-t-[24px] p-[16px] space-y-3 shadow-[0px_-4px_25px_0px_#00000014] mt-5">
          <div>
            <p className="text-[14px] text-[#244340] font-medium">
              Already Have an Account?
            </p>
            <p className="text-[var(--black-3)] text-[12px]">
              Experience full feature on GoGoCash with account
            </p>
          </div>
          <Button
            text={'Login'}
            fullWidth
            center
            backgroundColor="bg-[var(--primary-4)] text-white rounded-full"
            onClick={() => {
              router.push(`/login/before`);
            }}
          />
          <Button
            text={'Create an Account'}
            fullWidth
            center
            backgroundColor=" border border-[var(--primary-4)] text-[var(--primary-4)] rounded-full"
            onClick={() => {
              router.push(`/sign-up`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Component;
