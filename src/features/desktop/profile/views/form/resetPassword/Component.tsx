import React, { memo } from 'react';
import { Title } from '../title';
import * as Form from '@radix-ui/react-form';
import TextField from '@/components/common/textField';
import Button from '@/components/common/button';
import { Eye, EyeClosed } from 'lucide-react';
import { PassCon } from './interface';

const Component = () => {
  const [showPassword, setShowPassword] = React.useState<PassCon>({
    pass: false,
    con: false,
  });
  const [checkPassword, setCheckPassword] = React.useState(false);

  return (
    <div className="container-inner md:space-y-20 space-y-8 md:my-[88px] my-[10px]">
      <div className="grid md:grid-cols-2  justify-between">
        <Title
          title={`Set New Password`}
          subTitle={`Enter your new password to reset`}
        />
        <div className="flex items-start justify-center flex-col w-full h-full space-y-10">
          <Form.Root
            className="w-full space-y-8"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              console.log('Submitted:', Object.fromEntries(formData));
              if (formData.get('password') !== formData.get('passwordCon')) {
                // router.push('/login-email');
                setCheckPassword(true);
              } else {
                setCheckPassword(false);
              }
            }}
          >
            {/* Label + Input */}
            <div>
              <TextField
                name="password"
                type={showPassword.pass ? 'text' : 'password'}
                label="Password"
                placeholder="Password"
                required
                endIcon={
                  showPassword.pass ? (
                    <Eye
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          pass: !showPassword.pass,
                        }))
                      }
                    />
                  ) : (
                    <EyeClosed
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          pass: !showPassword.pass,
                        }))
                      }
                    />
                  )
                }
              />
              <p className="text-black-3 text-[16px]">{`Password has to more than 8 letters with a least 2 numbers.`}</p>
            </div>
            <TextField
              name="passwordCon"
              type={showPassword.con ? 'text' : 'password'}
              label="Password Confirmation"
              placeholder="Password Confirmation"
              required
              endIcon={
                showPassword.con ? (
                  <Eye
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        con: !showPassword.con,
                      }))
                    }
                  />
                ) : (
                  <EyeClosed
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        con: !showPassword.con,
                      }))
                    }
                  />
                )
              }
            />

            {/* Submit Button */}
            <div>
              <Form.Submit asChild>
                <Button
                  type="submit"
                  disabled={false}
                  backgroundColor="bg-primary-4 text-white rounded-full h-[56px]"
                  text="Continue"
                  fullWidth
                  center
                />
              </Form.Submit>
              {checkPassword && (
                <p className="text-[red] text-[14px]">Password miss match</p>
              )}
            </div>
          </Form.Root>
        </div>
      </div>
    </div>
  );
};

export default memo(Component);
