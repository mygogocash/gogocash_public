import ImageComponent from '@/components/common/Image';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };

const DontMiss = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // Initial state
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="m-auto  w-full relative">
      <div className="overflow-hidden  w-full" ref={emblaRef}>
        <div className="flex w-full gap-5">
          {/* {products?.map((ele, index) => (
            <div
              className="flex-[0_0_100%] w-full max-h-[455px]"
              key={index}
              onClick={() => {
                router.push('/promotion/1');
              }}
            >
              <ImageComponent
                src={ele.pic || '/dontMiss.png'}
                alt={'dontMiss'}
                width={1160}
                className="w-full h-auto max-h-[455px]"
                height={455}
              />
            </div>
          ))} */}

          <ImageComponent
            src={'/dontMiss.png'}
            alt={'dontMiss'}
            width={1160}
            className="w-full h-auto max-h-[455px]"
            height={455}
          />
        </div>
      </div>
      {canScrollPrev && (
        <button
          onClick={() => scrollPrev()}
          className="absolute  bottom-5 right-[1rem] shadow-[0px_4px_15px_0px_rgba(0_0_0_0.25)] w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center"
        >
          <ArrowLeft size={50} />
        </button>
      )}
      {canScrollNext && (
        <button
          onClick={() => scrollNext()}
          className="absolute bottom-5 right-[1rem] shadow-[0px_4px_15px_0px_rgba(0_0_0_0.25)] w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center"
        >
          <ArrowRight size={50} />
        </button>
      )}
    </section>
  );
};

export { DontMiss };
