import * as Tabs from '@radix-ui/react-tabs';
import { IProp } from './interface';
import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Component({ list }: IProp) {
  const [_activeTab, setActiveTab] = React.useState<string>('1');
  return (
    <>
      <div className="block md:hidden w-full space-y-2">
        {list.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setActiveTab(`${item.id}`);
            }}
            className="h-[45px] bg-white rounded-[8px] bg-white flex items-center justify-between px-4"
            style={{
              boxShadow: '0px 4px 25px 0px #00000014',
            }}
          >
            <p className="text-black text-[14px] font-medium">{item.title}</p>
            <ChevronRight />
          </div>
        ))}

        {/* <div className="w-full">
          {list?.find((item) => item.id == activeTab)?.content}
        </div> */}
      </div>
      <Tabs.Root
        defaultValue="1"
        className="w-full md:block hidden"
        orientation="vertical"
      >
        {/* Tabs List */}
        <Tabs.List className="flex border-b border-gray-200">
          {list.map((item) => (
            <Tabs.Trigger
              key={item.id}
              value={`${item.id}`}
              //
              className={`px-4 py-2 text-[16px] md:text-[24px] font-semibold text-[var(--black-5)]
                data-[state=active]:border-b-2 data-[state=active]:border-b-[var(--primary-4)]
                data-[state=active]:text-[var(--primary-4)] md:data-[state=active]:text-[24px] data-[state=active]:text-[16px]`}
            >
              {item.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Tabs Content */}
        {list.map((item) => (
          <Tabs.Content
            value={`${item.id}`}
            className="py-4 mt-3"
            key={item.id}
          >
            {item.content}
            {/* <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-10 pt-10">
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <CardProduct
                key={index}
                image={''}
                productName={''}
                shopName={''}
                percent={0}
              />
            ))}
          </div> */}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </>
  );
}
