import Button from '@/components/common/button';
import TextField from '@/components/common/textField/mobile';
import { Title } from '@/features/desktop/profile/views/form/title';
import * as Form from '@radix-ui/react-form';
import React from 'react';

const Component = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col p-[16px] w-full">
        <Title
          center
          showLogo
          title={`Reset Password`}
          subTitle={`Enter email address to reset your password`}
        />
        <Form.Root
          className="w-full space-y-4  p-[16px]"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            console.log('formData', formData);
          }}
        >
          <div className="shadow-[1px_4px_18px_rgba(224,224,224,1)] rounded-[20px] overflow-hidden my-10 w-full">
            <TextField
              type="email"
              name="email"
              placeholder="Email"
              required
              defaultValue={'info@gmail.com'}
            />
            <div className="h-[1px] w-full bg-black-2" />
          </div>

          <Button
            type="submit"
            text={'CONTINUE'}
            fullWidth
            center
            backgroundColor="h-[45px] bg-primary-4 rounded-full text-white"
          />
          <div className="flex items-center justify-center gap-4 ">
            <p className="text-black-3 text-[12px]">I haven’t an account</p>
          </div>
        </Form.Root>
      </div>
    </>
  );
};

export default Component;
