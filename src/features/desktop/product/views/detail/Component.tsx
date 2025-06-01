import BadgeList from '@/components/common/badgeList';
import Button from '@/components/common/button';
import CardSlideProduct from '@/components/common/cardSlideProduct';
import CarouselThumb from '@/components/common/carouselThumb';
import Dialog from '@/components/common/dialog';
import Loading from '@/components/common/loading';
import TitleSeparator from '@/components/common/titleSeparator';
import TitleBar from '@/features/desktop/home/views/TitleBar';
import {
  Circle,
  Coins,
  DockIcon,
  PackageCheck,
  StoreIcon,
  WalletIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import useSWR from 'swr';
import { IResponseProductDetail } from '../../interface';
import { fetcher } from '@/lib/client';

const images = ['/pot_ex_1.png', '/pot_ex.png', '/shopee.png'];
const Component = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const router = useRouter();
  const param = useParams();
  const id = param.id;
  const { data: dataProductDetail } = useSWR<IResponseProductDetail>(
    `/products/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const detail = dataProductDetail?.data;
  return (
    <div className="container-inner space-y-8 my-[10px] md:my-[88px]">
      <div className="grid lg:grid-cols-2 gap-10">
        <CarouselThumb slides={detail?.images || []} />
        <div className="flex items-center flex-col">
          <div>
            <h1 className="md:text-[40px] text-[var(--black-5)] fotn-bold">
              {detail?.name || ''}
            </h1>
            <p className="text-[var(--black-3)] text-[14px] font-normal">
              {detail?.description || ''}
            </p>
          </div>
          <div className="flex w-full gap-[48px] flex-col md:flex-row items-center">
            <div className="w-full">
              <div className="flex items-center justify-between border-b border-b-[var(--grey-2)] py-2 mt-4">
                <p className="font-bold text-[var(--black-5)] text-[14px]">
                  Full Price
                </p>
                <p className="font-normal text-[var(--black-5)] text-[14px]">
                  {detail?.currency} {detail?.price || 0}
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-b-[var(--grey-2)] py-2">
                <p className="font-normal text-[var(--black-5)] text-[14px]">
                  Promotion{' '}
                  <span className="text-[var(--black-3)] text-[8px]">
                    (All included)
                  </span>
                </p>
                <p className="font-normal text-[var(--black-5)] text-[14px]">
                  {detail?.currency} {detail?.originalPrice || 0}
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-b-[var(--grey-2)] py-2">
                <p className="font-normal text-[var(--primary-4)] text-[14px]">
                  Paid Price
                </p>
                <p className="font-normal text-[var(--primary-4)] text-[14px]">
                  $ 100.00
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-b-[var(--grey-2)] py-2 mt-4">
                <p className="font-normal text-[var(--black-5)] text-[14px]">
                  Cashback
                </p>
                <p className="font-normal text-[var(--black-5)] text-[14px]">
                  $ 100.00
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-b-[var(--grey-2)] py-2">
                <p className="font-bold text-[var(--primary-4)] text-[14px]">
                  Actual Paid Price
                </p>
                <p className="font-bold text-[var(--primary-4)] text-[14px]">
                  $ 100.00
                </p>
              </div>
            </div>
            <div>
              <BadgeList
                vertical
                list={[
                  {
                    icon: <Coins />,
                    title: `${detail?.cashbackPercent || 0}`,
                    subTitle: 'Max Cashback',
                  },
                  {
                    icon: <PackageCheck />,
                    title: 'Earn',
                    subTitle: 'After Complete',
                  },
                  {
                    icon: <WalletIcon />,
                    title: '2 Days',
                    subTitle: 'Ready to claim',
                  },
                ]}
              />
            </div>
          </div>
          <div className="mt-5 w-full">
            <h1 className="text-[var(--primary-4)] text-[40px] font-bold">
              $ 84.24
              <span className="text-[24px] text-[var(--black-5)] line-through ml-3">
                $ 100.00
              </span>
            </h1>
            <Button
              onClick={() => setIsOpenModal(true)}
              fullWidth
              backgroundColor=" !justify-center bg-[var(--primary-4)] uppercase rounded-full h-[61px] !text-[24px] text-white"
              text="Shop Now"
            />
          </div>
        </div>
      </div>
      <TitleSeparator />
      <div className="flex items-center gap-3 justify-between md:flex-row flex-col">
        <div className="flex gap-2 items-center">
          <Image src="/shopee.png" alt="" width={80} height={80} />
          <div className="flex flex-col">
            <h3 className="text-[var(--black-5)] text-[24px] font-semibold">
              Shopee Thailand
            </h3>
            <p
              className={`text-[var(--black-3)] text-[14px] font-light flex md:items-center gap-3 md:flex-row flex-col`}
            >
              <span> Products 100</span>
              <span className="flex items-center gap-2">
                <Circle size={10} />
                Hot Deals 2
              </span>
              <span className="flex items-center  gap-2">
                <Circle size={10} />
                Sold with GoGoCash 100
              </span>
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <Button
            text={'Visit Shop'}
            icon={<StoreIcon />}
            backgroundColor="border-[0.5px] border-[var(--primary-4)] rounded-full text-[var(--primary-4)] h-[40px]"
          />
          <Button
            text={'Terms and Conditions'}
            icon={<DockIcon />}
            backgroundColor="border-[0.5px] border-[var(--primary-4)] rounded-full text-[var(--primary-4)] h-[40px]"
          />
        </div>
      </div>
      <TitleSeparator />
      <div className="space-y-5">
        <TitleBar
          title={'Explore your Favorite Merchants'}
          button={{
            text: 'View More',
            onClick: () => {
              router.push(`/product`);
            },
          }}
        />
        <CardSlideProduct />
      </div>

      <Dialog
        // onOpenChange={(val) => setIsOpenModal(val)}
        open={isOpenModal}
        title={'Moving to Merchandise . . .'}
        content={
          <>
            <div className="flex items-center justify-between gap-4">
              <div className="w-[100px] h-[100px]">
                <Image
                  src={'/logo.svg'}
                  alt="logo"
                  width={100}
                  height={100}
                  className="max-w-[100px] max-h-[100px] h-full w-full"
                />
              </div>
              {/* {'=>'} */}
              <Loading />
              <div className="w-[100px] h-[100px]">
                <Image
                  src={images?.[0] || ''}
                  alt="pot_ex_1"
                  width={100}
                  height={100}
                  className="max-w-[100px] max-h-[100px] h-full w-full"
                />
              </div>
            </div>
            <p className="text-[var(--black-4)] text-[10px] text-center">
              Waiting too long?{' '}
              <span className=" underline-offset-1 underline cursor-pointer">
                Click here
              </span>{' '}
              to get your merchant page ready.
            </p>
          </>
        }
      />
    </div>
  );
};

export default Component;
