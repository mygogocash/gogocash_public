import { useRouter } from 'next/navigation';
import { CardProductMobile } from '../cardProductMobile';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import { IList } from '@/components/common/boxSlide/interface';

const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };
interface IProp {
  list: IList[];
}
const Component = ({ list }: IProp) => {
  const [emblaRef, _emblaApi] = useEmblaCarousel(OPTIONS);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  return (
    <div className="w-full">
      <section className="offer">
        <div className="offer__viewport" ref={emblaRef}>
          <div className="offer__container ">
            {list.map((ele, index) => (
              <div className="offer__slide  !flex-none" key={index}>
                <div className="offer__slide__number ">
                  <div className="w-full flex items-center justify-center flex-col">
                    <div className="w-[290px] bg-white px-[12px] py-[0px] rounded-[8px]">
                      <CardProductMobile
                        _image={ele.pic}
                        _productName={ele.name}
                        _shopName={ele.shopName}
                        percent={ele.percent}
                        link={ele.link}
                        type={ele.type}
                        like={ele.like}
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
