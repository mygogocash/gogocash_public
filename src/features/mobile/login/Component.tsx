import Button from '@/components/common/button';
import TextField from '@/components/common/textField/mobile';
import { Title } from '@/features/desktop/profile/views/form/title';
import * as Form from '@radix-ui/react-form';
import { Eye, EyeClosed } from 'lucide-react';
import { signIn } from 'next-auth/react';
import React from 'react';

const Component = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex items-center justify-center h-screen flex-col p-[16px]">
      <Title
        center
        showLogo
        title={`Log In`}
        subTitle={`Enter login details to access your account`}
      />

      <Form.Root
        className="w-full space-y-4  p-[16px]"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const dt = {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: true,
          };
          signIn('credentials', dt);
        }}
      >
        {/* Label + Input */}
        <div className="shadow-[1px_4px_18px_rgba(224,224,224,1)] rounded-[20px] overflow-hidden my-10">
          <TextField
            type="email"
            name="email"
            placeholder="Email"
            required
            defaultValue={'info@gmail.com'}
          />
          <div className="h-[1px] w-full bg-[var(--black-2)]" />
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
        </div>

        <Button
          type="submit"
          text={'CONTINUE'}
          fullWidth
          center
          backgroundColor="h-[45px] bg-[var(--primary-4)] rounded-full text-white"
        />
        <div className="flex items-center justify-center gap-4 ">
          <p className="text-[var(--black-3)] text-[12px]">
            I haven’t an account
          </p>
          <div className="w-[5px] h-[5px] bg-[var(--black-3)]" />
          <p className="text-[var(--black-3)] text-[12px]">Reset Password</p>
        </div>
      </Form.Root>
    </div>
  );
};

export default Component;
