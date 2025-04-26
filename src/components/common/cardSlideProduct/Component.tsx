import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import CardProduct from '../cardProduct';
const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };
const Component = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  return (
    <div className="w-full">
      <section className="embla">
        <div className="product__viewport" ref={emblaRef}>
          <div className="product__container">
            {[1, 2, 3, 4, 5, 6].map((ele, index) => (
              <div className="product__slide" key={index}>
                <div className="product__slide__number">
                  <div className="w-full flex items-center justify-center flex-col max-w-[200px] h-[290px]">
                    <CardProduct image={''} productName={''} shopName={''} percent={0} link='/product/1' />
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
