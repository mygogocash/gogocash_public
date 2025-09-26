import Dialog from '@/components/common/dialog';
import Image from 'next/image';
import React from 'react';
import { FormEditProfile } from './form';

const Component = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  return (
    <>
      <Dialog
        cssContent={`max-h-screen w-[90vw] max-w-[664px] overflow-y-auto`}
        onOpenChange={(val) => setIsOpenModal(val)}
        open={isOpenModal}
        content={<FormEditProfile setIsOpenModal={setIsOpenModal} />}
      />
      <div className="p-3 md:p-[48px] py-5 md:shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] rounded-[24px] grid grid-cols-3 items-center gap-2">
        <div>
          <div
            className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] relative rounded-full overflow-hidden md:mx-auto"
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            <Image
              src={`/avatar/profile_1.png`}
              alt="profile"
              width={200}
              height={200}
            />
            <p className="bg-[#00000070] text-white absolute bottom-0 w-full text-center">
              Edit
            </p>
          </div>
        </div>
        <div className="flex items-center gap-20">
          <div className="space-y-4 ">
            <p className="text-black-4 text-[14px] md:text-[18px] font-medium">
              Name
            </p>
            <p className="text-black-4 text-[14px] md:text-[18px] font-medium">
              Username
            </p>
            <p className="text-black-4 text-[14px] md:text-[18px] font-medium">
              Email
            </p>
          </div>
          <div className="space-y-4 ">
            <p className="text-black-4 text-[14px] md:text-[18px] font-normal">
              Name
            </p>
            <p className="text-black-4 text-[14px] md:text-[18px] font-normal">
              Username
            </p>
            <p className="text-black-4 text-[14px] md:text-[18px] font-normal">
              Email
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
