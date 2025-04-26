import Button from '@/components/common/button';
import TitleSeparator from '@/components/common/titleSeparator';

import React, { memo } from 'react';
import { Title } from '../title';
import TextField from '@/components/common/textField';
import * as Form from '@radix-ui/react-form';
import Dialog from '@/components/common/dialog';
import { MailSearchIcon } from 'lucide-react';
import Link from 'next/link';
import { IProp } from './interface';

const Component = ({ _isOpen, setIsOpen }: IProp) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  return (
    <div className="p-[48px] flex items-start justify-center flex-col w-full h-full space-y-10">
      <Dialog
        onOpenChange={(val) => setIsOpenModal(val)}
        open={isOpenModal}
        showClose
        title={<MailSearchIcon />}
        description="Magic Link Sent!"
        content={
          <div>
            <p className="text-[var(--black-3)] text-[16px] font-light text-center">
              We’ve sent the magic link to your email, please Check your inbox.
            </p>
            <Link
              href={'#'}
              className="text-[var(--primary-4)] underline flex items-center justify-center text-[16px] font-light"
            >
              Got it! Head to inbox.{' '}
            </Link>
          </div>
        }
      />

      <Title
        showLogo
        title={`Reset Password`}
        subTitle={`Enter email address to reset your password`}
      />
      <Form.Root
        className="w-full space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          console.log('Submitted:', Object.fromEntries(formData));
          setIsOpenModal(true);
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

        {/* Submit Button */}
        <Form.Submit asChild>
          <Button
            type="submit"
            disabled={false}
            backgroundColor="bg-[var(--primary-4)] text-white rounded-full h-[56px]"
            text="Continue"
            fullWidth
            center
          />
        </Form.Submit>
      </Form.Root>
      <div className="w-full space-y-8">
        <TitleSeparator text="You’re new here?" />

        <Button
          backgroundColor="bg-white text-black border-[var(--primary-4)] border rounded-full h-[56px]"
          text="Login"
          onClick={function (): void {
            setIsOpen?.('login');
          }}
          fullWidth
          center
        />
      </div>
    </div>
  );
};

export default memo(Component);
