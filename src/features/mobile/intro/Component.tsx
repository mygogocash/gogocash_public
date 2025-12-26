import Image from 'next/image';
import { IProp } from './interface';
import { useState } from 'react';

const Component = ({ setIntro }: IProp) => {
  const [active, setActive] = useState(0);
  const lists = [
    { image: '/pic_intro.png', title: 'Earn Up to 20% Cashback' },
    { image: '/pic_button.png', title: 'Personalized Rewards & Quests' },
    { image: '/pic_card.png', title: 'Multi-ecosystem Integration' },
  ];
  return (
    <div className=" min-h-screen w-full">
      <p
        className="text-right text-black-3 text-[16px] my-5 px-5 w-full"
        onClick={() => {
          window.localStorage.setItem('intro', 'true');
          setIntro?.(false);
        }}
      >
        SKIP
      </p>
      <div className="flex items-center justify-center flex-col  min-h-[calc(100vh-140px)]">
        <Image src={'/logo.svg'} alt={'intro'} width={80} height={80} />
        <Image
          src={lists[active || 0].image}
          alt={'intro'}
          width={342}
          height={300}
        />
        <p className="text-black-4 text-[16px] font-bold">
          {lists[active || 0].title}
        </p>
      </div>
      <div className="flex gap-1 items-center justify-center">
        {[0, 1, 2].map((item, index) => (
          <div key={index} className="flex gap-1 items-center justify-center">
            {active === index ? (
              <div
                className="h-[4px] w-[68px] bg-primary-4"
                onClick={() => setActive(index)}
              />
            ) : (
              <div
                className="h-[4px] w-[23px] bg-black-2"
                onClick={() => setActive(index)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        {active > 0 && (
          <p
            className="cursor-pointer text-black-3 text-[16px] my-5 px-5 w-full"
            onClick={() => {
              console.log('active', active);

              setActive((prev) => (active < 0 ? 0 : prev - 1));
            }}
          >
            Back
          </p>
        )}

        {active <= 2 && (
          <p
            className="cursor-pointer text-right text-black-3 text-[16px] my-5 px-5 w-full"
            onClick={() => {
              setActive((prev) => (active >= 2 ? 0 : prev + 1));
              if (active >= 2) {
                window.localStorage.setItem('intro', 'true');
                setIntro?.(false);
              }
            }}
          >
            Next
          </p>
        )}
      </div>
    </div>
  );
};

export default Component;
