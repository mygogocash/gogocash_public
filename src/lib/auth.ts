/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Extend NextAuth types for Crossmint integration
declare module 'next-auth' {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    expires?: string;
    user?: any;
    buyer?: any;
    wallet?: any;
    crossmint_user_id?: string;
    crossmint_jwt?: string;
    _id?: string;
  }
  interface User {
    access_token?: string;
    refresh_token?: string;
    expires?: string;
    user?: any;
    // buyer?: any;
    wallet?: any;
    crossmint_user_id?: string;
    crossmint_jwt?: string;
    username?: string;
    _id?: string;
  }
  interface Session {
    user: {
      access_token?: string;
      refresh_token?: string;
      // expires?: string;
      // user?: any;
      // buyer?: any;
      wallet?: any;
      crossmint_user_id?: string;
      crossmint_jwt?: string;
      email?: string;
      username?: string;
      id?: string;
      _id?: string;
    };
  }
}

// API configuration - use internal URL when running in Docker
const API_BASE_URL =
  process.env.NEXT_PUBLIC_INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8080';

interface CrossmintLoginResult {
  success: boolean;
  data?: {
    user?: {
      id?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
    };
    // buyer?: any;
    wallet?: any;
    access_token?: string;
    refresh_token?: string;
    expires?: any;
    username?: string;
  };
  error?: string;
}

// Crossmint Web3 login function with JWT validation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function performCrossmintLogin(
  crossmintJWT: string
): Promise<CrossmintLoginResult> {
  try {
    console.log(
      '🔐 Performing Crossmint login with JWT:',
      crossmintJWT.substring(0, 20) + '...'
    );

    // First validate the JWT token format and structure
    if (!isValidJWTFormat(crossmintJWT)) {
      console.error('❌ Invalid JWT format');
      return {
        success: false,
        error: 'Invalid JWT token format',
      };
    }

    const requestBody = {
      provider: 'crossmint',
      crossmintToken: crossmintJWT,
      walletAddress: '', // Will be extracted from JWT claims
      signature: '',
      message: '',
    };

    console.log('🔍crossmint Request body:', requestBody);

    const response = await fetch(`${API_BASE_URL}/v1/auth/web3/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📥 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Crossmint login failed - Raw response:', errorText);

      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }

      return {
        success: false,
        error:
          errorData.message ||
          `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    console.log('✅ Crossmint login successful:', data);

    return {
      success: data.success,
      data: data.data,
      error: data.success ? null : data.message,
    };
  } catch (error) {
    console.error('❌ Error performing Crossmint login:', error);
    return { success: false, error: `Network error: ${error}` };
  }
}

// Helper function to validate JWT format
function isValidJWTFormat(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }

  // JWT should have 3 parts separated by dots
  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  // Each part should be base64url encoded
  try {
    for (const part of parts) {
      if (!part || part.length === 0) {
        return false;
      }
      // Basic check for base64url characters
      if (!/^[A-Za-z0-9_-]+$/.test(part)) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

// Helper function to safely parse JSON data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function safeJsonParse(data: any): any {
  if (!data) return null;

  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (parseError) {
      console.warn('Failed to parse JSON data:', parseError);
      return data;
    }
  }

  return data;
}

export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      id: 'crossmint',
      name: 'Crossmint',
      credentials: {
        jwt: { label: 'Crossmint JWT', type: 'text' },
        userId: { label: 'User ID', type: 'text' },
        _id: { label: 'Mongo ID', type: 'text' },
        email: { label: 'Email', type: 'email' },
        address: { label: 'Address', type: 'text' },
        username: { label: 'Username', type: 'text' },
        id_twitter: { label: 'Twitter ID', type: 'text' },
      },
      async authorize(credentials) {
        try {
          console.log('🔐 NextAuth Crossmint authorize called');

          if (!credentials?.jwt) {
            throw new Error('Crossmint JWT is required');
          }

          console.log('🎯 Processing Crossmint authentication...');

          // Perform Web3 login with Crossmint JWT
          // const loginResult = await performCrossmintLogin(credentials.jwt);

          if (credentials.jwt) {
            console.log('✅ Crossmint authentication successful');

            const userData = credentials;
            const fullName = credentials.username;
            // console.log('User Data:', userData);

            return {
              id: userData?.userId || credentials.userId || 'unknown',
              email: userData?.email || credentials.email || '',
              username: fullName,
              id_twitter: userData.id_twitter,
              wallet: credentials.address,
              access_token: credentials?.jwt,
              _id: userData._id,
            } as unknown as User;
          }

          // If login failed, throw error with details
          throw new Error(
            `Crossmint authentication failed: ${
              credentials.address || 'Unknown error'
            }`
          );
        } catch (error) {
          console.error('❌ NextAuth Crossmint authorize error:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        // console.log('user', user);
        if (user) {
          // Store user data in token on first sign in
          return {
            ...token,
            access_token: user.access_token,
            refresh_token: user.refresh_token,
            // expires: user.expires,
            // user: user.user,
            // buyer: user.buyer,
            username: user.username,
            address: user.wallet,
            wallet: user.wallet,
            crossmint_user_id: user.crossmint_user_id,
            crossmint_jwt: user.crossmint_jwt,
            _id: user._id,
          };
        }

        return token;
      } catch (error) {
        console.error('JWT callback error:', error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        // console.log('token', token);
        // Parse data safely using helper function
        // const userData = safeJsonParse(token.user);
        // const buyerData = safeJsonParse(token.buyer);
        // const walletData = safeJsonParse(token.wallet);
        // const expiresData = safeJsonParse(token.expires);

        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
            email: token?.email || session.user?.email,
            username:
              typeof token?.username === 'string'
                ? token.username
                : session.user?.username,
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            // expires: expiresData,
            // user: userData,
            // buyer: buyerData,
            wallet: token.wallet,
            crossmint_user_id: token.crossmint_user_id,
            crossmint_jwt: token.crossmint_jwt,
            _id: token._id,
          },
        };
      } catch (error) {
        console.error('Session callback error:', error);
        return session;
      }
    },
  },
  pages: {
    signIn: '/', // Redirect to home page for sign-in
  },
};
