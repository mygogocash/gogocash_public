import Button from '@/components/common/button';
import TextField from '@/components/common/textField/mobile';
import { Title } from '@/features/desktop/profile/views/form/title';
import * as Form from '@radix-ui/react-form';
import { Eye, EyeClosed } from 'lucide-react';
import React from 'react';

const Component = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [conShowPassword, setConShowPassword] = React.useState(false);

  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col p-[16px] w-full">
        <Title
          center
          showLogo
          title={`Set New Password`}
          subTitle={`Enter your new password to reset`}
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
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              endIcon={
                showPassword ? (
                  <Eye onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <EyeClosed onClick={() => setShowPassword(!showPassword)} />
                )
              }
            />
            <div className="h-[1px] w-full bg-black-2" />
            <TextField
              name="con_password"
              type={conShowPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              required
              endIcon={
                conShowPassword ? (
                  <Eye onClick={() => setConShowPassword(!conShowPassword)} />
                ) : (
                  <EyeClosed
                    onClick={() => setConShowPassword(!conShowPassword)}
                  />
                )
              }
            />
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
