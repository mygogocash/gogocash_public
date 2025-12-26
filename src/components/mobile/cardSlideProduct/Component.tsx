import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import CardProduct from '@/components/common/cardProduct';
import { IList } from '@/components/common/boxSlide/interface';
import { useRouter } from 'next/navigation';
const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };
interface IProp {
  list: IList[];
}
const Component = ({ list }: IProp) => {
  const [emblaRef, _emblaApi] = useEmblaCarousel(OPTIONS);
  const router = useRouter();
  return (
    <div className="w-full">
      <section className="embla">
        <div className="product__viewport" ref={emblaRef}>
          <div className="product__container ">
            {list.map((ele, index) => (
              <div
                className="product__slide  !flex-none"
                key={index}
                onClick={() => {
                  router.push(ele.link);
                }}
              >
                <div className="product__slide__number ">
                  <div className="w-full flex items-center justify-center flex-col max-w-[200px] h-auto">
                    <CardProduct
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Component;
