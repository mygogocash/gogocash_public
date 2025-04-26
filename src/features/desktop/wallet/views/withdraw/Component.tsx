import { Title } from '../../../profile/views/form/title';
import * as Form from '@radix-ui/react-form';
import TextField from '@/components/common/textField';
import React from 'react';
import Button from '@/components/common/button';
import Select2 from '@/components/common/select2';
import { FormProvider, useForm } from 'react-hook-form';

const Component = () => {
  const [isOpenSelect, setIsOpenSelect] = React.useState(false);
  const methods = useForm();
  return (
    <div className="space-y-20 my-[88px] px-5 md:px-10">
      <FormProvider {...methods}>
        <Form.Root
          className="w-full space-y-8"
          onSubmit={methods.handleSubmit((data) => {
            console.log(data);
          })}
        >
          <Title
            title={'Withdraw'}
            subTitle={'Withdraw Your Cashback Earnings'}
          />
          <div>
            <h2 className="text-[14px] md:text-[24px] font-medium text-[var(--black-5)]">
              Withdraw to
            </h2>
            <Select2
              name={'type'}
              open={isOpenSelect}
              onOpenChange={setIsOpenSelect}
              options={[
                { label: 'Bank', value: 'bank' },
                { label: 'Bank2', value: 'bank2' },
              ]}
            />
          </div>
          <div>
            <h2 className="text-[14px] md:text-[24px] font-medium text-[var(--black-5)]">
              Withdraw Fee
            </h2>
            <TextField
              placeholder={'Fee'}
              name={'fee'}
              startIcon={
                <p className="text-[14px] md:text-[24px] text-[var(--black-5)]">
                  Withdraw Fee
                </p>
              }
              defaultValue="20"
              textRight
              onChange={(e) => methods.setValue('fee', e.target.value)}
            />
          </div>

          <div className=" space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-[14px] md:text-[20px] text-[var(--black-4)]  font-semibold">
                You will receive
              </p>
              <h1 className="text-[var(--primary-4)] text-[24px] md:text-[32px] font-bold">
                $0.00
              </h1>
            </div>
            <Button
              type="submit"
              text={'WITHDRAW'}
              fullWidth
              center
              backgroundColor="text-white bg-[var(--primary-4)] rounded-full h-[51px]"
            />
          </div>
        </Form.Root>
      </FormProvider>
    </div>
  );
};

export default Component;
