import React, { useState, useEffect, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './views/Thumb';
import Image from 'next/image';

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

const Component: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="carousel">
      <div className="carousel__viewport" ref={emblaMainRef}>
        <div className="carousel__container">
          {slides.map((item, index) => (
            <div className="carousel__slide" key={index}>
              <div className="carousel__slide__number">
                <Image
                  src={item || ''}
                  alt="pot_ex"
                  width={550}
                  height={550}
                  className="max-w-[550px] max-h-[550px] h-auto w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-thumbs">
        <div className="carousel-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="carousel-thumbs__container">
            {slides.map((item, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                image={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
