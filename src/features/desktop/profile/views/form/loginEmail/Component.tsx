import Button from '@/components/common/button';
import TitleSeparator from '@/components/common/titleSeparator';

import React, { memo } from 'react';
import { Title } from '../title';
import TextField from '@/components/common/textField';
import * as Form from '@radix-ui/react-form';
import { Eye, EyeClosed } from 'lucide-react';
import { IProp } from './interface';
import { useRouter } from 'next/navigation';
import useSignIn from './hook/useSignin';

const Component = ({ _isOpen, setIsOpen, handleModal }: IProp) => {
  const { signInEmail, showPassword, setShowPassword } = useSignIn();
  const router = useRouter();
  return (
    <div className="p-[48px] flex items-start justify-center flex-col w-full h-full space-y-10">
      <Title
        showLogo
        title={`Log In`}
        subTitle={`Enter login details to access your account`}
      />
      <Form.Root
        className="w-full space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          signInEmail(formData);
        }}
      >
        {/* Label + Input */}
        <TextField
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          required
          defaultValue={'info@gmail.com'}
        />

        <TextField
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
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
        {/* Submit Button */}
        <Form.Submit asChild>
          <Button
            type="submit"
            disabled={false}
            backgroundColor="bg-primary-4 text-white rounded-full h-[56px]"
            text="Login"
            fullWidth
            center
          />
        </Form.Submit>
        <button
          className="text-[14px] text-black-5 underline text-right ml-auto"
          onClick={() => {
            setIsOpen?.('forgot');
          }}
        >{`Reset Password`}</button>
      </Form.Root>
      <div className="w-full space-y-8">
        <TitleSeparator text="You’re new here?" />

        <Button
          backgroundColor="bg-white text-black border-primary-4 border rounded-full h-[56px]"
          text="Sign Up"
          onClick={function (): void {
            handleModal?.(false);
            router.push('/sign-up');
          }}
          fullWidth
          center
        />
      </div>
    </div>
  );
};

export default memo(Component);
