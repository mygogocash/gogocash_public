import Search from '../search';
import { list } from './constant';
import CardBannerImage from '@/components/common/cardBannerImage';
import TitleBar from '../home/views/TitleBar';
import CardSlideImage from '@/components/common/cardSlideImage';
import CardSlideProduct from '@/components/common/cardSlideProduct';
import ShowMore from '@/components/common/showMore';
import Tab from '@/components/common/tab';
import { useRouter } from 'next/navigation';
const Component = () => {
  const router = useRouter();

  return (
    <div className="container-inner space-y-8 my-[10px] md:my-[88px]">
      <div className="flex items-center justify-between md:flex-row flex-col">
        <h1 className="text-[var(--black-5)] font-bold text-[24px] md:text-[36px]">
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
            <div
              className="grid md:grid-cols-2  gap-5 md:gap-10 pt-10"
              onClick={() => {
                router.push('/promotion/1');
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                <CardBannerImage
                  key={index}
                  image={''}
                  promotionName={''}
                  time={''}
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
