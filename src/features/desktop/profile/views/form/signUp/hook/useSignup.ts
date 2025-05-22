import { signinEmail, signup } from '@/lib/services/auth';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { RequestSignup } from '../interface';

const useSignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signUp = async (formData: RequestSignup, pass: string) => {
    try {
      setIsSubmitting(true);
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
            user: JSON.stringify(res.data.user),
            access_token: res.data.access_token,
            expires: JSON.stringify(res.data.expires),
            refresh_token: res.data.refresh_token,
            redirect: true,
            callbackUrl: '/',
          });
        }
      } else {
        toast.error(response.error?.message || 'Create account failed');
      }
    } catch (error) {
      console.log('error', error);
      toast.error('Create account failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    signUp,
    showPassword,
    setShowPassword,
    checked,
    isOpen,
    setIsOpen,
    isSubmitting,
    setIsSubmitting,
    setChecked,
  };
};

export default useSignUp;
