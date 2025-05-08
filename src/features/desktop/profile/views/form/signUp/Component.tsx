import React, { memo } from 'react';
import { Title } from '../title';
import * as Form from '@radix-ui/react-form';
import TextField from '@/components/common/textField';
import Button from '@/components/common/button';
import TitleSeparator from '@/components/common/titleSeparator';
import { Eye, EyeClosed } from 'lucide-react';
import Checkbox from '@/components/common/checkbox';
import Drawer from '@/components/common/drawer';
import BeforeLogin from '../beforeLogin';
import { signinEmail, signup } from '@/lib/services/auth';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const Component = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState(false);
  // const { data, error, isLoading, mutate } = useSWR(`/auth/signup`, fetcherPost);
  return (
    <div className="container-inner md:space-y-20 space-y-8 md:my-[88px] my-[10px]">
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <BeforeLogin title={''} subTitle={''} />
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
              try {
                const response = await signup(formData);
                console.log('response', response);
                if (response.success) {
                  toast.success('Create account successfully');
                  const user = response.data;
                  console.log('user', user);
                  console.log('formData.password', pass);
                  // setIsOpen(true);
                  const res = await signinEmail({
                    identity: user.email,
                    password: pass,
                  });

                  console.log('res', res);
                  if (res.data) {
                    signIn('credentials', {
                      email: user.email,
                      // password: pass,
                      name: user.username,
                      id: user.id,
                      type: 'email',
                      user: res.data.user,
                      access_token: res.data.access_token,
                      expires: res.data.expires,
                      refresh_token: res.data.refresh_token,
                      redirect: true,
                      callbackUrl: '/',
                    });
                  }
                  
                } else {
                  toast.error(
                    response.error?.message || 'Create account failed'
                  );
                }
              } catch (error) {
                console.log('error', error);
                toast.error('Create account failed');
              }
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
              required
            />
            {/* Submit Button */}
            <Form.Submit asChild>
              <Button
                type="submit"
                disabled={false}
                backgroundColor="bg-[var(--primary-4)] text-white rounded-full h-[56px]"
                text="Sign Up"
                fullWidth
                center
              />
            </Form.Submit>
          </Form.Root>
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
