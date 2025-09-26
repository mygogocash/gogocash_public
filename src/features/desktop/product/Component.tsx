import Search from '../search';
import { list } from './constant';
import CardProduct from '@/components/common/cardProduct';
import TitleBar from '../home/views/TitleBar';
import Deals from '../home/views/Deals';
import CardSlideImage from '@/components/common/cardSlideImage';
import Tab from '@/components/common/tab';
import ShowMore from '@/components/common/showMore';
import { useRouter } from 'next/navigation';

const Component = () => {
  const router = useRouter();

  return (
    <div className="container-inner space-y-8 my-[10px] md:my-[88px]">
      <div className="flex items-center justify-between md:flex-row flex-col">
        <h1 className="text-black-5 font-bold text-[24px] md:text-[36px]">
          Picked for You
        </h1>
        <div className="max-w-[400px] w-full">
          <Search />
        </div>
      </div>

      <Tab
        list={list.map((item) => ({
          ...item,
          content: (
            <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-10 pt-10">
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <CardProduct
                  key={index}
                  _image={''}
                  _productName={''}
                  _shopName={''}
                  percent={''}
                  link={'/product/1'}
                  type={''}
                />
              ))}
            </div>
          ),
        }))}
      />
      <ShowMore min={20} max={80} />

      <div className="space-y-5">
        <TitleBar
          title={'Grab your Deals'}
          button={{
            text: 'View More',
            onClick: () => {
              router.push('/promotion');
            },
          }}
        />
        <Deals />
      </div>

      <div className="space-y-5">
        <TitleBar
          title={'Explore your Favorite Merchants'}
          button={{
            text: 'View More',
            onClick: () => {
              router.push('/shop');
            },
          }}
        />
        <CardSlideImage />
      </div>
    </div>
  );
};

export default Component;
