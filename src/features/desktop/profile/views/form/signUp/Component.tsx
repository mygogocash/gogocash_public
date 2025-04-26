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

const Component = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState(false);

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
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              console.log('Submitted:', Object.fromEntries(formData));
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
