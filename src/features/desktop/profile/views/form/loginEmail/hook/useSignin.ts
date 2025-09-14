import { signinEmail } from '@/lib/services/auth';
import React from 'react';

const useSignIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const signInEmail = async (formData: FormData) => {
    await signinEmail({
      identity: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    // if (res.data) {
    //   signIn('credentials', {
    //     email: res.data.user.email,
    //     name: res.data.user.username,
    //     id: res.data.user.id,
    //     type: 'email',
    //     user: JSON.stringify(res.data.user),
    //     access_token: res.data.access_token,
    //     expires: JSON.stringify(res.data.expires),
    //     refresh_token: res.data.refresh_token,
    //     redirect: true,
    //     callbackUrl: '/',
    //   });
    // }
  };

  return {
    signInEmail,
    showPassword,
    setShowPassword,
  };
};

export default useSignIn;
