import { signInGoogleCrossmint, signInWeb3 } from '@/lib/services/auth';
import {
  EVMSmartWallet,
  useAuth,
  useWallet,
} from '@crossmint/client-sdk-react-ui';
import { signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const useCrossmintLogin = () => {
  const crossmintAuth = useAuth();
  const { user, jwt, status: statusAuth } = crossmintAuth;
  const crossmintWallet = useWallet();
  const { wallet, status } = crossmintWallet;

  useEffect(() => {
    console.log('user', user);
    console.log('statusAuth', statusAuth);
    // @TODO signin crossmint  ======= signin to backend and signIn next-auth ======

    if (
      window.sessionStorage.getItem('isAfterLogin') === 'true' &&
      statusAuth === 'logged-in' &&
      user
    ) {
      console.log('wallet', wallet, status);
      signInGG();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const signInGG = async () => {
    if (jwt)
      signInGoogleCrossmint({
        idToken: jwt,
      })
        .then((response) => {
          console.log('response', response);
          if (response.success) {
            const user = response.data.user;
            const res = response;
            // @TODO signin crossmint  ======= signin to backend and signIn next-auth ======
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
          } else {
            toast.error(response?.error?.message || 'Error');
          }
        })
        .catch((error) => {
          console.log('error google', error);
          toast.error(error.message);
        })
        .finally(() => {
          window.sessionStorage.setItem('isAfterLogin', 'false');
        });
  };

  useEffect(() => {
    if (wallet && window.sessionStorage.getItem('isAfterLogin') === 'true') {
      signInWallet(wallet as EVMSmartWallet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  const signInWallet = async (wallet: EVMSmartWallet) => {
    if (jwt && wallet) {
      wallet
        .signMessage({
          message: `Login to GoGoCash with wallet ${wallet.address}`,
          chain: 'mode',
        })
        .then((signature) => {
          signInWeb3({
            crossmintToken: jwt,
            message: `Login to GoGoCash with wallet ${wallet.address}`,
            provider: 'crossmint',
            signature: signature,
            walletAddress: wallet.address,
          })
            .then((response) => {
              console.log('response', response);
              if (response.success) {
                const user = response.data.user;
                const res = response;
                // @TODO signin crossmint  ======= signin to backend and signIn next-auth ======
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
              } else {
                toast.error(response?.error?.message || 'Error');
              }
            })
            .catch((error) => {
              console.log('error', error);
              toast.error(error.message);
            })
            .finally(() => {
              window.sessionStorage.setItem('isAfterLogin', 'false');
            });
        });
    }
  };

  const signOutAuth = () => {
    crossmintAuth.logout();
    signOut();
    // TODO Signout backend
  };
  return {
    ...crossmintAuth,
    ...crossmintWallet,
    signOutAuth,
  };
};

export default useCrossmintLogin;
