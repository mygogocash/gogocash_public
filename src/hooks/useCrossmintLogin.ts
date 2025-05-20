import { useAuth, useWallet } from '@crossmint/client-sdk-react-ui';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

const useCrossmintLogin = () => {
  const crossmintAuth = useAuth();
  const { user, jwt } = crossmintAuth;
  const crossmintWallet = useWallet();
  const { wallet, status } = crossmintWallet;

  useEffect(() => {
    console.log('user', user);
    console.log('user', jwt);
    // @TODO signin crossmint  ======= signin to backend and signIn next-auth ======

    if (user) {
      console.log('wallet', wallet, status);
      // @TODO signin crossmint  ======= signin to backend and signIn next-auth ======
      //   signIn('credentials', {
      //     wallet: wallet.address,
      //     redirect: true,
      //   });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (wallet) {
      console.log('wallet', wallet, status);
      // @TODO signin crossmint  ======= signin to backend and signIn next-auth ======
      //   signIn('credentials', {
      //     wallet: wallet.address,
      //     redirect: true,
      //   });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return {
    ...crossmintAuth,
    ...crossmintWallet,
  };
};

export default useCrossmintLogin;
