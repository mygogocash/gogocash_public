import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import CardBannerImage from '@/components/common/cardBannerImage';
import { useRouter } from 'next/navigation';

const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };

const Deals = () => {
  const [emblaRef, _emblaApi] = useEmblaCarousel(OPTIONS);
  const router = useRouter();
  return (
    <>
      <section className="deals">
        <div className="deals__viewport" ref={emblaRef}>
          <div className="deals__container">
            {[1, 2, 3, 4, 5, 6].map((ele, index) => (
              <div
                className="deals__slide !flex-[0_0_88%]"
                key={index}
                onClick={() => {
                  router.push('/promotion/1');
                }}
              >
                <div className="deals__slide__number space-y-5">
                  <CardBannerImage
                    image={''}
                    time={''}
                    promotionName={''}
                    height={'h-[170px]'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Deals;
