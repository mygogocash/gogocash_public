import TextField from '@/components/common/textField';
import { Title } from '../profile/views/form/title';
import * as Form from '@radix-ui/react-form';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import ArrowIcon from '@/components/icons/ArrowIcon';
import TelegramIcon from '@/components/icons/TelegramIcon';
import React from 'react';
import HelpDetail from './detail';

const Component = () => {
  const [openDetails, setOpenDetails] = React.useState(false);
  return (
    <div className="p-5 md:p-[48px] flex items-start justify-center flex-col w-full h-full space-y-10">
      {openDetails ? (
        <HelpDetail
          onBack={function (): void {
            setOpenDetails(false);
          }}
        />
      ) : (
        <>
          <Form.Root
            className="w-full space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              console.log('Submitted:', Object.fromEntries(formData));
            }}
          >
            <div className="flex items-center pt-20 relative">
              <Title
                title={`Help Center`}
                subTitle={`Everything You Need to Know & More`}
              />
              <Image
                src={'/help/help_center.png'}
                alt={'help center'}
                className="absolute top-[33px] right-0"
                width={161}
                height={161}
              />
            </div>
            <TextField
              placeholder={'Find Help'}
              name={'search'}
              startIcon={<SearchIcon />}
            />
          </Form.Root>

          <h1 className="text-[24px] font-bold text-black-5">FAQs</h1>
          <div className="w-full">
            {[1, 2].map((ele) => {
              return (
                <div
                  onClick={() => setOpenDetails(true)}
                  key={ele}
                  className="flex items-center justify-between w-full border-b border-b-black-2 py-5"
                >
                  <p className="text-[14px] font-medium text-black">
                    What is GoGoCash?
                  </p>
                  <ArrowIcon className="rotate-[270deg]" />
                </div>
              );
            })}
          </div>
          <h1 className="text-[24px] font-bold text-black-5">
            Contact Customer Support
          </h1>
          <div className="w-full flex items-center justify-between shadow-[0px_1px_10px_0px_rgba(0,0,0,0.25)] rounded-[8px] py-[16px] px-[24px]">
            <div className="flex items-center gap-3">
              <TelegramIcon fill="#28abee" />
              <p className="text-[14px] font-medium text-black">
                What is GoGoCash?
              </p>
            </div>
            <ArrowIcon className="rotate-[270deg]" />
          </div>
        </>
      )}
    </div>
  );
};

export default Component;
