import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import CardProduct from '@/components/common/cardProduct';
import { IPropProductList } from '@/components/common/cardProduct/interface';
const OPTIONS: EmblaOptionsType = { slidesToScroll: 'auto' };
interface IProp {
  list: IPropProductList[];
}
const Component = ({ list }: IProp) => {
  const [emblaRef, _emblaApi] = useEmblaCarousel(OPTIONS);

  return (
    <div className="w-full">
      <section className="embla">
        <div className="product__viewport" ref={emblaRef}>
          <div className="product__container ">
            {list.map((ele, index) => (
              <div className="product__slide  !flex-none" key={index}>
                <div className="product__slide__number ">
                  <div className="w-full flex items-center justify-center flex-col max-w-[200px] h-auto">
                    <CardProduct
                      _image={ele._image}
                      _productName={ele._productName}
                      _shopName={ele._shopName}
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
