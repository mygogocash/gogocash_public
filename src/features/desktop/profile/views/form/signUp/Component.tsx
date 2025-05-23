'use client';
import React, { memo } from 'react';
import { Title } from '../title';
import * as Form from '@radix-ui/react-form';
import TextField from '@/components/common/textField';
import Button from '@/components/common/button';
import TitleSeparator from '@/components/common/titleSeparator';
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import Checkbox from '@/components/common/checkbox';
import Drawer from '@/components/common/drawer';
import useSignUp from './hook/useSignup';
import LoginAll from '..';
import Image from 'next/image';

const Component = () => {
  const {
    isOpen,
    setIsOpen,
    signUp,
    showPassword,
    setShowPassword,
    checked,
    isSubmitting,
    setChecked,
    login,
  } = useSignUp();

  // const { data, error, isLoading, mutate } = useSWR(`/auth/signup`, fetcherPost);
  return (
    <div className="container-inner md:space-y-20 space-y-8 md:my-[88px] my-[10px]">
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <LoginAll handleModal={setIsOpen} />
      </Drawer>
      <div className="grid md:grid-cols-2  justify-between">
        <Title
          title={`Create an Account`}
          subTitle={`Enter details to create your account`}
        />
        <div className="flex items-start justify-center flex-col w-full h-full space-y-10">
          <Form.Root
            className="w-full space-y-8"
            onSubmit={async (event) => {
              event.preventDefault();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const formData = new FormData(event.currentTarget) as any;
              console.log('Submitted:', Object.fromEntries(formData));
              // formData.
              delete formData.condition;
              const pass = formData.get('password');
              signUp(formData, pass);
            }}
          >
            {/* Label + Input */}
            <div>
              <TextField
                name="username"
                label="Username"
                placeholder="Username"
                required
                defaultValue={''}
              />
              <p className="text-[var(--black-3)] text-[16px]">{`Username has to be more than 8 letters with a least 2 numbers.`}</p>
            </div>
            <TextField
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
              required
              defaultValue={''}
            />
            <TextField
              type="text"
              name="firstName"
              label="First name"
              placeholder="First name"
              required
              defaultValue={''}
            />
            <TextField
              type="text"
              name="lastName"
              label="Last name"
              placeholder="Last name"
              required
              defaultValue={''}
            />
            <TextField
              type="number"
              name="phoneNumber"
              label="Phone Number"
              placeholder="Phone Number"
              required
              defaultValue={''}
            />
            <div>
              <TextField
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Password"
                required
                minLength={8}
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                endIcon={
                  showPassword ? (
                    <Eye onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <EyeClosed onClick={() => setShowPassword(!showPassword)} />
                  )
                }
              />
              <p className="text-[var(--black-3)] text-[16px]">{`Password has to more than 8 letters with a least 2 numbers.`}</p>
            </div>
            <Checkbox
              defaultChecked={checked}
              name="condition"
              id="condition"
              label="I have read and understand Privacy Policy"
              required={true}
              message='Please check "I have read and understand Privacy Policy"'
              onChange={function (): void {
                setChecked(!checked);
              }}
            />
            {/* {checked ? null : (
              <span className="text-red-500 text-xs">
                {'Please select an option'}
              </span>
            )} */}

            {/* Submit Button */}
            <Form.Submit asChild>
              <Button
                icon={
                  isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                  ) : null
                }
                type="submit"
                disabled={isSubmitting}
                backgroundColor="bg-[var(--primary-4)] text-white rounded-full h-[56px]"
                text="Sign Up"
                fullWidth
                center
              />
            </Form.Submit>
          </Form.Root>
          <div className="w-full space-y-8">
            <TitleSeparator text={`Sign up with`} />
            <Button
              icon={
                <Image
                  src={`/crossmint/logo.png`}
                  alt="crossmint"
                  className={`crossmint_logo`}
                  width={24}
                  height={24}
                />
              }
              backgroundColor="bg-white text-black border-[var(--grey-2)] border"
              text="Connect with Crossmint"
              onClick={async function (): Promise<void> {
                // handleLoginWallet();
                login();
              }}
              fullWidth
            />
          </div>
          <div className="w-full space-y-8">
            <TitleSeparator text="You already have an account?" />

            <Button
              backgroundColor="bg-white text-[var(--primary-4)] border-[var(--primary-4)] border rounded-full h-[56px]"
              text="Log In"
              onClick={function (): void {
                setIsOpen(true);
              }}
              fullWidth
              center
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Component);
