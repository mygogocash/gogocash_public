'use client';

import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  CrossmintUser,
  CrossmintAuthResult,
  isCrossmintConfigured,
  handleCrossmintError,
  getCrossmintUserDisplayName,
  parseCrossmintUser,
} from '@/lib/crossmint';

interface CrossmintAuthProps {
  onAuthSuccess?: (result: CrossmintAuthResult) => void;
  onAuthError?: (error: string) => void;
  className?: string;
}

export default function CrossmintAuth({
  onAuthSuccess,
  onAuthError,
  className = '',
}: CrossmintAuthProps) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [crossmintUser, setCrossmintUser] = useState<CrossmintUser | null>(
    null
  );

  // Check if Crossmint is configured
  useEffect(() => {
    if (!isCrossmintConfigured()) {
      const error =
        'Crossmint is not properly configured. Please check your environment variables.';
      console.error('❌', error);
      onAuthError?.(error);
    }
  }, [onAuthError]);

  // Parse Crossmint user from session
  useEffect(() => {
    if (session?.user?.crossmint_user_id && session?.user?.user) {
      try {
        const userData =
          typeof session.user.user === 'string'
            ? JSON.parse(session.user.user)
            : session.user.user;

        const parsedUser = parseCrossmintUser({
          userId: session.user.crossmint_user_id,
          email: userData?.email,
          ...userData,
        });

        setCrossmintUser(parsedUser);
      } catch (error) {
        console.error('❌ Error parsing user data from session:', error);
      }
    }
  }, [session]);

  const handleCrossmintLogin = async (authData: {
    user: unknown;
    jwt: string;
  }) => {
    try {
      setIsLoading(true);

      const user = parseCrossmintUser(authData.user);
      if (!user) {
        throw new Error('Invalid user data received from Crossmint');
      }

      if (!authData.jwt) {
        throw new Error('JWT token is missing from Crossmint authentication');
      }

      console.log(
        '🔐 Crossmint authentication successful, signing in with NextAuth...'
      );

      // Sign in with NextAuth using Crossmint credentials
      const result = await signIn('crossmint', {
        jwt: authData.jwt,
        userId: user.userId,
        email: user.email || '',
        name: getCrossmintUserDisplayName(user),
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      const authResult: CrossmintAuthResult = {
        user,
        jwt: authData.jwt,
      };

      setCrossmintUser(user);
      onAuthSuccess?.(authResult);

      console.log('✅ Authentication completed successfully');
    } catch (error) {
      const errorMessage = handleCrossmintError(error);
      console.error('❌ Crossmint authentication error:', errorMessage);
      onAuthError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setCrossmintUser(null);
      await signOut({ redirect: false });
      console.log('✅ Logout successful');
    } catch (error) {
      const errorMessage = handleCrossmintError(error);
      console.error('❌ Logout error:', errorMessage);
      onAuthError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state
  if (status === 'loading' || isLoading) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  // Show authenticated state
  if (session?.user && crossmintUser) {
    return (
      <div
        className={`p-4 border rounded-lg bg-green-50 border-green-200 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-green-800">
              Welcome, {getCrossmintUserDisplayName(crossmintUser)}!
            </h3>
            <p className="text-sm text-green-600">
              Authenticated with Crossmint
            </p>
            {crossmintUser.email && (
              <p className="text-sm text-gray-600">
                Email: {crossmintUser.email}
              </p>
            )}
            {crossmintUser.wallets && crossmintUser.wallets.length > 0 && (
              <p className="text-sm text-gray-600">
                Wallets: {crossmintUser.wallets.length}
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Show login state
  return (
    <div
      className={`p-4 border rounded-lg bg-blue-50 border-blue-200 ${className}`}
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          Sign in with Crossmint
        </h3>
        <p className="text-sm text-blue-600 mb-4">
          Connect your wallet and authenticate securely
        </p>

        {/* Note: In a real implementation, you would integrate the Crossmint SDK here */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500">
            To complete the integration, install @crossmint/client-sdk-react-ui
          </p>
          <p className="text-xs text-gray-500">
            and use the CrossmintAuthProvider and useAuth hook
          </p>
        </div>

        {/* Placeholder for Crossmint SDK integration */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            🚧 Crossmint SDK integration required
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            Follow the Crossmint documentation to complete the setup
          </p>
        </div>
      </div>
    </div>
  );
}
