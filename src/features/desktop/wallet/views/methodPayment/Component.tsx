import React from 'react';
import PaypalIcon from '@/components/icons/PaypalIcon';
import TitleBar from '@/features/desktop/home/views/TitleBar';
import { PlusCircleIcon } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { IProp } from './interface';
import Drawer from '@/components/common/drawer';
import { Title } from '../../../profile/views/form/title';
import Button from '@/components/common/button';
import Switch from '@/components/common/switch';
import * as Form from '@radix-ui/react-form';

const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };

const Component = ({
  setIsOpenAddWithdraw,
  isOpenEditWithdraw,
  setIsOpenEditWithdraw,
}: IProp) => {
  const [emblaRef, _emblaApi] = useEmblaCarousel(OPTIONS);
  const [defaultData, setDefaultData] = React.useState<string>();
  const [, setDataEdit] = React.useState<string>();

  return (
    <div className="space-y-10">
      <Drawer isOpen={isOpenEditWithdraw} setIsOpen={setIsOpenEditWithdraw}>
        <Form.Root
          className="w-full space-y-8"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="space-y-20 my-[88px] px-5 md:px-10">
            <Title
              title={'Withdrawal Method Detail'}
              subTitle={'Add a Method to Receive Your Cashback'}
            />
            <div className="h-[calc(100vh-470px)]">
              <div className="relative bg_green_gradient w-full h-[228px] rounded-[16px] from-[#244340] via-transparent to-[#83DC9A] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]">
                <div className="absolute top-5 font-medium right-0 text-[16px] text-[var(--primary-4)] bg-[var(--primary-2)] rounded-l-full px-3 py-1">
                  Default
                </div>

                <div className="p-[20px] md:p-[40px] h-full flex flex-col justify-between">
                  <PaypalIcon fill="white" width={60} height={60} />
                  <div>
                    <p className="text-[16px] text-white font-medium mt-3">
                      Full Last
                    </p>
                    <h1 className="text-[24px] text-white font-semibold">
                      0000000000000
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-5">
                <p className="text-[var(--black-4)] text-[20px] font-medium">
                  Set as Default
                </p>
                <Switch
                  name={'default'}
                  isChecked={defaultData === 'default'}
                  setIsChecked={() =>
                    setDefaultData(defaultData === 'default' ? '' : 'default')
                  }
                />
              </div>
            </div>
            <Button
              type="submit"
              fullWidth
              center
              text={'Remove This Method'}
              backgroundColor="bg-[#E60E0E] text-white rounded-full"
            />
          </div>
        </Form.Root>
      </Drawer>
      <TitleBar
        title={'Withdrawal Methods'}
        icon={<PlusCircleIcon className="stroke-[var(--primary-4)] " />}
        styleButton="bg-white border border-[var(--primary-4)] text-[var(--primary-4)]"
        button={{
          text: 'Add Withdrawal Methods',
          onClick: () => {
            setIsOpenAddWithdraw(true);
          },
        }}
      />

      <section className="embla !mt-0">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {[1, 2, 3, 4, 5, 6].map((ele, index) => (
              <div className="embla__slide !flex-none" key={index}>
                <div
                  className="embla__slide__number"
                  onClick={() => {
                    setIsOpenEditWithdraw(true);
                    setDataEdit(ele?.toString());
                  }}
                >
                  <div
                    key={index}
                    className="relative bg_green_gradient max-w-[400px] md:w-[400px] w-full h-[214px] rounded-[16px] from-[#244340] via-transparent to-[#83DC9A] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]"
                  >
                    {index === 0 ? (
                      <div className="absolute top-5 font-medium right-0 text-[16px] text-[var(--primary-4)] bg-[var(--primary-2)] rounded-l-full px-3 py-1">
                        Default
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="p-[20px] md:p-[40px] h-full flex flex-col justify-between">
                      <PaypalIcon fill="white" width={60} height={60} />
                      <div>
                        <p className="text-[16px] text-white font-medium mt-3">
                          Full Last
                        </p>
                        <h1 className="text-[24px] text-white font-semibold">
                          0000000000000
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="embla__slide"
              onClick={() => {
                setIsOpenAddWithdraw(true);
              }}
            >
              <div className="embla__slide__number">
                <div className="bg_green_gradient w-[400px] h-[214px] rounded-[16px] from-[#244340] via-transparent to-[#83DC9A] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]">
                  <div className="p-[20px] md:p-[40px] h-full flex flex-col justify-center items-center gap-2">
                    <p className="text-white font-normal text-[20px]">
                      Add Methods
                    </p>
                    <PlusCircleIcon size={60} color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Component;
