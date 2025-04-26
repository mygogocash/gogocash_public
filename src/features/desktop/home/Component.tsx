'use client';
import { useRouter } from 'next/navigation';
import Banner from './views/Banner';
import BannerPocket from './views/BannerPocket';
import Community from './views/Community';
import Deals from './views/Deals';
import { DontMiss } from './views/DontMiss';
import Merchants from './views/Merchants';
import Product from './views/Product';
import TitleBar from './views/TitleBar';
import Work from './views/Work';
const Component = () => {
  const router = useRouter();

  return (
    <div className="container-inner space-y-20">
      <Banner />

      <Work />
      <Merchants />
      <div className="space-y-5">
        <TitleBar
          title={'Don’t Miss!'}
          button={{
            text: 'View More',
            onClick: () => {
              router.push('/deals');
            },
          }}
        />
        <DontMiss />
      </div>
      <Product />
      <div className="space-y-5">
        <TitleBar
          title={'Grab your Deals'}
          button={{
            text: 'View More',
            onClick: undefined,
          }}
        />
        <Deals />
      </div>
      <div className="space-y-5">
        <TitleBar title={'Put GoGoCash in your Pocket'} />
        <BannerPocket />
      </div>
      <Community />
    </div>
  );
};

export { Component };
