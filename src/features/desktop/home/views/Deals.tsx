import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import CardBannerImage from '@/components/common/cardBannerImage';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import useSWR from 'swr';
import { IResponseAds } from '../interface';
import { fetcher } from '@/lib/client';

const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };

const Deals = () => {
  const [emblaRef, _emblaApi] = useEmblaCarousel(OPTIONS);
  const router = useRouter();
  const { data: sidebar } = useSWR<IResponseAds>(
    `/ads?position=sidebar`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const data = sidebar?.data;

  return (
    <>
      <section className="deals">
        <div className="deals__viewport" ref={emblaRef}>
          <div className="deals__container">
            {data?.map((ele, index) => (
              <div
                className="deals__slide"
                key={index}
                onClick={() => {
                  router.push('/promotion/1');
                }}
              >
                <div className="deals__slide__number space-y-5">
                  <CardBannerImage
                    image={ele.image}
                    time={format(ele.endDate, 'dd MM yyyy HH:mm')}
                    promotionName={ele.title}
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
