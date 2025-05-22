import Button from '@/components/common/button';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { IProp } from './interface';
import CardProduct from '../cardProduct';
import { useRouter } from 'next/navigation';
const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };
const Component = ({ title, onClick, icon, list }: IProp) => {
  const [emblaRef, _emblaApi] = useEmblaCarousel(OPTIONS);
  const router = useRouter();
  return (
    <div className="flex items-center gap-[32px]">
      <div className="hidden bg-[var(--primary-4)] rounded-l-[24px] md:flex items-center justify-center flex-col w-[250px] h-[352px]">
        {icon}
        <h4 className="text-white text-[26px] font-bold mt-3">{title}</h4>
        <Button
          backgroundColor="mt-14 bg-white border border-[var(--black-3)] rounded-full h-[39px] px-10 !py-0 font-light text-[var(--primary-4)]"
          onClick={function (): void {
            onClick?.();
          }}
          text={'View More'}
        />
      </div>
      <div className="md:w-[calc(100%-282px)] w-full">
        <section className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {list &&
                list?.map((ele, index) => (
                  <div
                    className="embla__slide"
                    key={index}
                    onClick={() => {
                      router.push(`${ele}`);
                    }}
                  >
                    <div className="embla__slide__number">
                      <div className="w-full  flex items-center justify-center flex-col h-[272px]">
                        <CardProduct
                          _image={ele.pic}
                          _productName={ele.name}
                          _shopName={ele.shopName}
                          percent={ele.percent}
                          link={ele.link}
                          type={ele.type}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export { Component };
