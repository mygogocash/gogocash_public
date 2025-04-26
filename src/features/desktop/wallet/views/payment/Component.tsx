import { PlusIcon } from 'lucide-react';
import { Title } from '../../../profile/views/form/title';
import { PaymentMethod } from './constant';

const Component = () => {
  return (
    <div className="space-y-3 my-[88px] px-5 md:px-10">
      <Title
        title={'Add Withdrawal Methods'}
        subTitle={'Add a Method to Receive Your Cashback'}
      />
      <div className="mt-4 space-y-2">
        {PaymentMethod.map((item, index) => (
          <div
            className=" border rounded-[8px] border-[var(--grey-1)] h-[62px] flex gap-3 items-center justify-between px-3"
            key={index}
          >
            <div className="flex gap-3 items-center">
              {item.name === 'ApplePay' ? (
                <item.icon fill={'var(--black-4)'} />
              ) : (
                <item.icon />
              )}

              <p className="font-normal text-[16px] text-[var(--black-4)]">
                {item.name}
              </p>
            </div>
            <PlusIcon />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Component;
