import { list } from './constant';
import CardImage from '@/components/common/cardImage';
import TitleBar from '../home/views/TitleBar';
import CardSlideProduct from '@/components/common/cardSlideProduct';
import Deals from '../home/views/Deals';
import Search from '../search';
import ShowMore from '@/components/common/showMore';
import Tab from '@/components/common/tab';
import { useRouter } from 'next/navigation';

const Component = () => {
  const router = useRouter();

  return (
    <div className="container-inner space-y-8 my-[10px] md:my-[88px]">
      <div className="flex items-center justify-between md:flex-row flex-col">
        <h1 className="text-black-5 font-bold text-[24px] md:text-[36px]">
          Explore your Favorite Merchants
        </h1>
        <div className="max-w-[400px] w-full">
          <Search />
        </div>
      </div>

      <Tab
        list={list.map((item) => ({
          ...item,
          content: (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-10 pt-10">
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <CardImage
                  key={index}
                  image="/shopee.png"
                  percent={'10'}
                  link="/shop/1"
                />
              ))}
            </div>
          ),
        }))}
      />
      <ShowMore min={20} max={80} />

      <div className="space-y-5">
        <TitleBar
          title={'Picked for You'}
          button={{
            text: 'View More',
            onClick: () => {
              router.push('/product');
            },
          }}
        />
        <CardSlideProduct />
      </div>
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
    </div>
  );
};

export default Component;
