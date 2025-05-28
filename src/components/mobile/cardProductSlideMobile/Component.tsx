import { useRouter } from 'next/navigation';
import { CardProductMobile } from '../cardProductMobile';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };

const Component = () => {
  const [emblaRef, _emblaApi] = useEmblaCarousel(OPTIONS);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  return (
    <div className="w-full">
      <section className="offer">
        <div className="offer__viewport" ref={emblaRef}>
          <div className="offer__container ">
            {[1, 2, 3, 4, 5, 6].map((ele, index) => (
              <div className="offer__slide  !flex-none" key={index}>
                <div className="offer__slide__number ">
                  <div className="w-full flex items-center justify-center flex-col">
                    <div className="w-[290px] bg-white px-[12px] py-[0px] rounded-[8px]">
                      <CardProductMobile
                        _image={''}
                        _productName={'test'}
                        _shopName={'test'}
                        percent={0}
                        link="/product/1"
                        type={''}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Component;
