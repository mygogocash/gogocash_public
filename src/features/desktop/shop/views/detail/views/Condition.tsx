import BadgeList from '@/components/common/badgeList';
import { CoinsIcon, PackageCheckIcon, WalletIcon } from 'lucide-react';
import Checkbox from '@/components/common/checkbox';
import { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import Button from '@/components/common/button';

const Condition = ({ link }: { link: string }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="md:my-[64px] my-10 mx-5 md:mx-[40px] overflow-y-auto ">
      <h1 className="font-bold text-[30px] md:text-[40px] text-black-5">
        Terms and Conditions
      </h1>
      <h3 className="font-normal text-[14px] md:text-[16px] text-black-5">
        Terms and conditions apply to all transactions with (Shop).
      </h3>
      <div className="my-[48px]">
        <BadgeList
          list={[
            {
              icon: <CoinsIcon size={30} className="stroke-black-5" />,
              title: '9.98%',
              subTitle: 'Max Cashback',
            },
            {
              icon: <PackageCheckIcon size={30} className="stroke-black-5" />,
              title: 'Earn',
              subTitle: 'After Complete',
            },
            {
              icon: <WalletIcon size={30} className="stroke-black-5" />,
              title: '2 Days',
              subTitle: 'Ready to claim',
            },
          ]}
        />
      </div>
      <div className="space-y-5">
        <div>
          <h1 className="font-bold text-[20px] md:text-[24px] text-black-5">
            Featured Products
          </h1>
          <h3 className="font-normal text-[14px] md:text-[16px] text-black-3">
            {`All products listed as "Featured Products" earn cashback, when purchased
        via GoGoCash.`}
          </h3>
        </div>
        <div>
          <h1 className="font-bold text-[20px] md:text-[24px] text-black-5">
            Earning Condition
          </h1>
          <h3 className="font-normal text-[14px] md:text-[16px] text-black-3">
            {`Cashback is applied on completed purchases via GoGoCash, excluding any cancellations, returns, or order changes.`}
          </h3>
        </div>
        <div>
          <h1 className="font-bold text-[20px] md:text-[24px] text-black-5">
            Terms and Conditions
          </h1>
          <h3 className="font-normal text-[14px] md:text-[16px] text-black-3">
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod id sem quis accumsan. Sed tempus placerat velit a placerat. Cras suscipit est at mauris blandit efficitur finibus non augue.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod id sem quis accumsan. Sed tempus placerat velit a placerat. Cras suscipit est at mauris blandit efficitur finibus non augue.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod id sem quis accumsan. Sed tempus placerat velit a placerat. Cras suscipit est at mauris blandit efficitur finibus non augue.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod id sem quis accumsan. Sed tempus placerat velit a placerat. Cras suscipit est at mauris blandit efficitur finibus non augue.`}
          </h3>
        </div>
        <p className="text-[14px] md:text-[16px] text-black-5">
          Still got question?{' '}
          <span className=" underline-offset-1 underline">Click Here</span>
        </p>
        <Form.Root
          className="w-full space-y-8 px-2"
          onSubmit={(event) => {
            event.preventDefault();
            // const formData = new FormData(event.currentTarget);
            // console.log('Submitted:', Object.fromEntries(formData));
          }}
          onChange={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            setChecked(formData?.get('condition') === 'on');
          }}
        >
          <Checkbox
            defaultChecked={checked}
            name="condition"
            id="condition"
            label="I have read and understand Privacy Policy"
            required
          />
          <Button
            type="submit"
            disabled={!checked}
            fullWidth
            backgroundColor=" !justify-center bg-primary-4 uppercase rounded-full h-[61px] !text-[24px] text-white"
            text="Shop Now"
            onClick={() => {
              // @TODO update data link save to DB here
              window.open(link, '_blank');
            }}
          />
        </Form.Root>
      </div>
    </div>
  );
};

export default Condition;
