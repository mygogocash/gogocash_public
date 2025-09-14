import { signInCrossmint } from '@/lib/services/auth';
import { useAuth, useWallet } from '@crossmint/client-sdk-react-ui';
import { signIn, signOut } from 'next-auth/react';
import { useEffect, useState, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';

interface LoginState {
  isLoggingIn: boolean;
  hasAttemptedLogin: boolean;
  error: string | null;
  retryCount: number;
}

const useCrossmintLogin = () => {
  const crossmintAuth = useAuth();
  const { user, jwt, status: statusAuth, login, getUser } = crossmintAuth;
  const crossmintWallet = useWallet();
  const { wallet, status } = crossmintWallet;
  const loginAttemptRef = useRef(false);
  const maxRetries = 3;

  const [loginState, setLoginState] = useState<LoginState>({
    isLoggingIn: false,
    hasAttemptedLogin: false,
    error: null,
    retryCount: 0,
  });

  // Reset login state when user logs out
  useEffect(() => {
    if (statusAuth === 'logged-out') {
      setLoginState({
        isLoggingIn: false,
        hasAttemptedLogin: false,
        error: null,
        retryCount: 0,
      });
      loginAttemptRef.current = false;
    }
  }, [statusAuth]);

  const signInCrossmintToBackend = useCallback(async () => {
    // Prevent multiple simultaneous attempts
    if (loginAttemptRef.current) {
      console.log('Login attempt already in progress, skipping...');
      return;
    }

    if (!jwt) {
      const error = 'Authentication token not available';
      setLoginState((prev) => ({ ...prev, error }));
      toast.error(error);
      return;
    }

    if (loginState.hasAttemptedLogin || loginState.retryCount >= maxRetries) {
      console.log('Login already attempted or max retries reached');
      return;
    }

    loginAttemptRef.current = true;
    setLoginState((prev) => ({
      ...prev,
      isLoggingIn: true,
      error: null,
    }));

    try {
      // Get wallet address from Crossmint wallet
      const walletAddress = wallet?.address || '';

      if (!walletAddress) {
        console.warn(
          'Wallet address not available, proceeding with Crossmint token only'
        );
      }
      console.log('🔐 Signing in to backend with Crossmint token:');
      console.log('User:', user);
      console.log('Wallet Address:', walletAddress);
      console.log('Wallet Address JWT:', jwt);

      const response = await signInCrossmint(
        {
          address: walletAddress,
          id_crossmint: user?.id ?? '',
          email: user?.email ?? '',
        },
        jwt
      );

      console.log('Backend response:', response);

      if (response.user) {
        const userData = response.user;

        // Sign in to NextAuth with proper error handling
        console.log('🔐 Calling NextAuth signIn with crossmint provider');
        const result = await signIn('crossmint', {
          jwt: jwt,
          userId: userData.id_crossmint,
          email: userData.email,
          address: userData.address,
          redirect: false, // Handle redirect manually
        });
        console.log('NextAuth signIn result:', result);
        if (result?.ok) {
          setLoginState((prev) => ({
            ...prev,
            isLoggingIn: false,
            error: null,
          }));
          window.sessionStorage.setItem('isAfterLogin', 'false');
        }
        if (result?.error) {
          throw new Error(`NextAuth error: ${result.error}`);
        }
      } else {
        throw new Error(response?.message || 'Backend authentication failed');
      }
    } catch (error: unknown) {
      console.error('Crossmint login error:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Login error occurred';

      setLoginState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoggingIn: false,
        retryCount: prev.retryCount + 1,
        hasAttemptedLogin: prev.retryCount + 1 >= maxRetries,
      }));

      // Only show toast for first few errors to avoid spam
      if (loginState.retryCount < 2) {
        toast.error(errorMessage);
      }
    } finally {
      loginAttemptRef.current = false;
    }
  }, [
    jwt,
    loginState.hasAttemptedLogin,
    loginState.retryCount,
    wallet?.address,
    user,
  ]);

  // Auto-login when Crossmint authentication is successful
  useEffect(() => {
    if (
      statusAuth === 'logged-in' &&
      user &&
      jwt &&
      !loginState.hasAttemptedLogin &&
      !loginState.isLoggingIn &&
      !loginAttemptRef.current &&
      loginState.retryCount < maxRetries
    ) {
      // console.log('✅ Crossmint user authenticated, starting backend login:', {
      //   user: { id: user.id, email: user.email },
      //   wallet: { address: wallet?.address, status },
      // });

      // Add a small delay to prevent rapid fire requests
      console.log(
        '>>>>isAfterLogin',
        window.sessionStorage.getItem('isAfterLogin')
      );

      const timeoutId = setTimeout(() => {
        if (window.sessionStorage.getItem('isAfterLogin') === 'true') {
          signInCrossmintToBackend();
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [
    statusAuth,
    user,
    jwt,
    wallet?.address,
    signInCrossmintToBackend,
    loginState.hasAttemptedLogin,
    loginState.isLoggingIn,
    loginState.retryCount,
    status,
  ]);

  const signOutAuth = useCallback(() => {
    setLoginState({
      isLoggingIn: false,
      hasAttemptedLogin: false,
      error: null,
      retryCount: 0,
    });
    loginAttemptRef.current = false;
    crossmintAuth.logout();
    signOut({ redirect: true, callbackUrl: '/' });
  }, [crossmintAuth]);

  // Debug what we're returning
  // console.log('🔍 useCrossmintLogin returning:', {
  //   hasLogin: !!crossmintAuth.login,
  //   loginType: typeof crossmintAuth.login,
  //   statusAuth: crossmintAuth.status,
  //   hasUser: !!crossmintAuth.user,
  //   hasJwt: !!crossmintAuth.jwt,
  // });

  return {
    ...crossmintAuth,
    ...crossmintWallet,
    signOutAuth,
    loginState,
  };
};

export default useCrossmintLogin;
