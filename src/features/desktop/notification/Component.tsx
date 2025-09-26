import IconButton from '@/components/common/IconButton';
import { Title } from '../profile/views/form/title';
import { NOTIFICATION_LIST, NOTIFICATION_TYPE } from './constants';
import { useMemo, useState } from 'react';
import { CoinsIcon, MessageSquare, TagsIcon, Wallet2Icon } from 'lucide-react';

const Component = () => {
  const [active, setActive] = useState('All');
  const list = useMemo(() => {
    return active === 'All'
      ? NOTIFICATION_LIST
      : NOTIFICATION_LIST?.filter((item) =>
          item.type?.includes(active?.toLowerCase())
        );
  }, [active]);
  return (
    <>
      <div className="p-5 md:p-[48px] flex items-start justify-center flex-col w-full h-full space-y-10">
        <Title
          title={`Notifications`}
          subTitle={`Stay Updated and Informed with Notifications`}
        />
        <div className="flex items-center justify-between gap-3 w-full flex-wrap">
          {NOTIFICATION_TYPE.map((ele, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center flex-col gap-2"
                onClick={() => {
                  setActive(ele.label);
                }}
              >
                <div
                  className={`w-[50px] h-[50px] md:w-[65px] md:h-[65px] rounded-full ${
                    active === ele.label ? 'bg-primary-4' : 'bg-primary-2'
                  } flex items-center justify-center`}
                >
                  <IconButton
                    icon={
                      <ele.icon
                        className={`${ele.label === 'All' ? 'rotate-45' : ''}`}
                        stroke={active === ele.label ? 'white' : '#00B14F'}
                        size={30}
                      />
                    }
                  />
                </div>
                <p
                  className={`text-center ${
                    active === ele.label ? 'text-primary-4' : 'text-black-3'
                  } text-[12px] font-medium`}
                >
                  {ele.label}
                </p>
              </div>
            );
          })}
        </div>
        <h1 className="text-[24px] font-medium text-black-4">What’s New?</h1>

        <div className="">
          {list.map((ele, index) => {
            return (
              <div key={index} className={`flex items-center gap-3 mb-3`}>
                <div
                  className={`w-[40px] h-[40px] rounded-full ${
                    ele.type === 'wallet'
                      ? 'bg-primary-2'
                      : ele.type === 'cashback'
                      ? ''
                      : ''
                  } flex items-center justify-center`}
                >
                  <IconButton
                    icon={
                      ele.type === 'wallet' ? (
                        <Wallet2Icon stroke={'#404040'} size={20} />
                      ) : ele.type === 'cashback' ? (
                        <CoinsIcon stroke={'#404040'} size={20} />
                      ) : ele.type === 'withdraw' ? (
                        <Wallet2Icon stroke={'#404040'} size={20} />
                      ) : ele.type === 'promotion' ? (
                        <TagsIcon stroke={'#404040'} size={20} />
                      ) : (
                        <MessageSquare stroke={'#404040'} size={20} />
                      )
                    }
                  />
                </div>
                <div className="w-full ">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-black-4 text-[16px]`}>{ele.title}</h3>
                    <p className={`text-black-3 text-[12px]`}>{ele.time}</p>
                  </div>
                  <div className="flex items-center justify-between mt-[5px]">
                    <p className="font-normal text-[12px] text-black-3 max-w-[calc(100%-15px)]">
                      {ele.description}
                    </p>
                    {ele.read ? (
                      <div className="bg-[#E60E0E] w-[12px] h-[12px] rounded-full" />
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Component;
