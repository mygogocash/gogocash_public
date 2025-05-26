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
  const { user, jwt, status: statusAuth, login } = crossmintAuth;
  const crossmintWallet = useWallet();
  const { wallet, status } = crossmintWallet;

  // Debug Crossmint SDK status
  console.log('🔍 Crossmint SDK Status:', {
    statusAuth,
    hasUser: !!user,
    hasJwt: !!jwt,
    hasLogin: !!login,
    loginType: typeof login,
    walletStatus: status,
    hasWallet: !!wallet,
    crossmintAuthKeys: Object.keys(crossmintAuth),
    crossmintWalletKeys: Object.keys(crossmintWallet),
  });

  // Test if login function is callable
  if (login) {
    console.log('✅ Login function is available and callable');
    console.log('Login function details:', {
      name: login.name,
      length: login.length,
      toString: login.toString().substring(0, 100) + '...',
    });
  } else {
    console.warn('⚠️ Login function is not available');
    console.log('Available auth methods:', Object.keys(crossmintAuth));
  }

  // Use ref to prevent multiple simultaneous login attempts
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

      const response = await signInCrossmint({
        token: jwt,
        walletAddress,
      });

      console.log('Backend response:', response);

      if (response.success) {
        const userData = response.data.user;

        // Sign in to NextAuth with proper error handling
        console.log('🔐 Calling NextAuth signIn with crossmint provider');
        const result = await signIn('crossmint', {
          jwt: jwt,
          userId: userData.id,
          email: userData.email,
          name: userData.username,
          redirect: false, // Handle redirect manually
        });

        if (result?.error) {
          throw new Error(`NextAuth error: ${result.error}`);
        }

        setLoginState((prev) => ({
          ...prev,
          hasAttemptedLogin: true,
          isLoggingIn: false,
          retryCount: 0,
        }));

        toast.success('Successfully logged in!');

        // Redirect to home page
        window.location.href = '/';
      } else {
        throw new Error(
          response?.error?.message || 'Backend authentication failed'
        );
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
    wallet?.address,
    loginState.hasAttemptedLogin,
    loginState.retryCount,
    maxRetries,
  ]);

  // Auto-login when Crossmint authentication is successful
  useEffect(() => {
    console.log('🔍 Crossmint Login State Check:', {
      statusAuth,
      hasUser: !!user,
      hasJwt: !!jwt,
      hasAttemptedLogin: loginState.hasAttemptedLogin,
      isLoggingIn: loginState.isLoggingIn,
      loginAttemptInProgress: loginAttemptRef.current,
      retryCount: loginState.retryCount,
      maxRetries,
      walletAddress: wallet?.address,
      walletStatus: status,
    });

    // Add more strict conditions to prevent infinite loop
    if (
      statusAuth === 'logged-in' &&
      user &&
      jwt &&
      !loginState.hasAttemptedLogin &&
      !loginState.isLoggingIn &&
      !loginAttemptRef.current &&
      loginState.retryCount < maxRetries
    ) {
      console.log('✅ Crossmint user authenticated, starting backend login:', {
        user: { id: user.id, email: user.email },
        wallet: { address: wallet?.address, status },
      });

      // Add a small delay to prevent rapid fire requests
      const timeoutId = setTimeout(() => {
        signInCrossmintToBackend();
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
  console.log('🔍 useCrossmintLogin returning:', {
    hasLogin: !!crossmintAuth.login,
    loginType: typeof crossmintAuth.login,
    statusAuth: crossmintAuth.status,
    hasUser: !!crossmintAuth.user,
    hasJwt: !!crossmintAuth.jwt,
  });

  return {
    ...crossmintAuth,
    ...crossmintWallet,
    signOutAuth,
    loginState,
  };
};

export default useCrossmintLogin;
