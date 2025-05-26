/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Crossmint Authentication Types
export interface CrossmintAuthConfig {
  apiUrl: string;
  projectId: string;
  environment: 'staging' | 'production';
}

export interface CrossmintUser {
  id: string;
  email?: string;
  name?: string;
  wallets?: Array<{
    address: string;
    chain_id: number;
    network: string;
  }>;
  preferred_address?: {
    address: string;
    chain_id: number;
    network: string;
  };
}

export interface CrossmintAuthResponse {
  success: boolean;
  data?: {
    access_token: string;
    refresh_token?: string;
    user: CrossmintUser;
    expires_in: number;
  };
  error?: string;
}

// Crossmint Authentication Methods
export enum CrossmintAuthMethod {
  EMAIL_OTP = 'email_otp',
  SOCIAL_GOOGLE = 'social_google',
  SOCIAL_APPLE = 'social_apple',
  SOCIAL_X = 'social_x',
  FARCASTER = 'farcaster',
  EXTERNAL_WALLET = 'external_wallet',
}

// API Configuration
const getCrossmintConfig = (): CrossmintAuthConfig => ({
  apiUrl:
    process.env.NEXT_PUBLIC_CROSSMINT_API_URL ||
    'https://www.crossmint.com/api',
  projectId: process.env.NEXT_PUBLIC_CROSSMINT_PROJECT_ID || '',
  environment:
    (process.env.NEXT_PUBLIC_CROSSMINT_ENV as 'staging' | 'production') ||
    'staging',
});

// Internal API Configuration
const getInternalApiConfig = () => ({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  endpoints: {
    validateCrossmint: '/v1/auth/web3/crossmint/validate',
    web3Login: '/v1/auth/web3/login',
    registerUser: '/v1/auth/signup',
  },
});

/**
 * Crossmint Authentication Service
 * Based on: https://docs.crossmint.com/authentication/introduction
 */
export class CrossmintAuthService {
  private config: CrossmintAuthConfig;
  private internalApi: ReturnType<typeof getInternalApiConfig>;

  constructor() {
    this.config = getCrossmintConfig();
    this.internalApi = getInternalApiConfig();
  }

  /**
   * Email OTP Authentication
   * Passwordless sign-in using a one time code delivered to the user's email
   */
  async authenticateWithEmailOTP(
    email: string,
    otp?: string
  ): Promise<CrossmintAuthResponse> {
    try {
      console.log('🔐 Crossmint Email OTP Authentication:', email);

      if (!otp) {
        // Step 1: Request OTP
        const response = await fetch(
          `${this.config.apiUrl}/auth/email/request-otp`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-PROJECT-ID': this.config.projectId,
            },
            body: JSON.stringify({ email }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to request OTP: ${response.statusText}`);
        }

        return {
          success: true,
          data: undefined, // OTP sent, waiting for verification
        };
      } else {
        // Step 2: Verify OTP
        const response = await fetch(
          `${this.config.apiUrl}/auth/email/verify-otp`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-PROJECT-ID': this.config.projectId,
            },
            body: JSON.stringify({ email, otp }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to verify OTP: ${response.statusText}`);
        }

        const data = await response.json();
        return {
          success: true,
          data: {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            user: data.user,
            expires_in: data.expires_in,
          },
        };
      }
    } catch (error) {
      console.error('❌ Email OTP Authentication error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Social Account Authentication
   * Sign in with Google, Apple, X, and more
   */
  async authenticateWithSocial(
    provider: 'google' | 'apple' | 'x',
    token: string
  ): Promise<CrossmintAuthResponse> {
    try {
      console.log('🔐 Crossmint Social Authentication:', provider);

      const response = await fetch(
        `${this.config.apiUrl}/auth/social/${provider}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-PROJECT-ID': this.config.projectId,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Social authentication failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          user: data.user,
          expires_in: data.expires_in,
        },
      };
    } catch (error) {
      console.error('❌ Social Authentication error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Farcaster Authentication
   * Using the Sign In With Farcaster (SIWF) standard
   */
  async authenticateWithFarcaster(
    message: string,
    signature: string,
    nonce: string
  ): Promise<CrossmintAuthResponse> {
    try {
      console.log('🔐 Crossmint Farcaster Authentication');

      const response = await fetch(`${this.config.apiUrl}/auth/farcaster`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-PROJECT-ID': this.config.projectId,
        },
        body: JSON.stringify({
          message,
          signature,
          nonce,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Farcaster authentication failed: ${response.statusText}`
        );
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          user: data.user,
          expires_in: data.expires_in,
        },
      };
    } catch (error) {
      console.error('❌ Farcaster Authentication error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * External Wallet Authentication
   * Connect with crypto wallets for Web3 authentication
   */
  async authenticateWithWallet(
    walletAddress: string,
    signature: string,
    message: string,
    chainId?: number
  ): Promise<CrossmintAuthResponse> {
    try {
      console.log('🔐 Crossmint Wallet Authentication:', walletAddress);

      const response = await fetch(`${this.config.apiUrl}/auth/wallet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-PROJECT-ID': this.config.projectId,
        },
        body: JSON.stringify({
          wallet_address: walletAddress,
          signature,
          message,
          chain_id: chainId || 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Wallet authentication failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          user: data.user,
          expires_in: data.expires_in,
        },
      };
    } catch (error) {
      console.error('❌ Wallet Authentication error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Validate Crossmint Token with Internal API
   */
  async validateToken(
    token: string
  ): Promise<{ valid: boolean; userInfo?: any; error?: string }> {
    try {
      console.log('🔍 Validating Crossmint token with internal API...');

      const response = await fetch(
        `${this.internalApi.baseUrl}${this.internalApi.endpoints.validateCrossmint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        return { valid: false, error: `HTTP ${response.status}` };
      }

      const data = await response.json();
      return {
        valid: data.success && data.data?.valid,
        userInfo: data.data?.userInfo,
        error: data.success ? undefined : data.message,
      };
    } catch (error) {
      console.error('❌ Token validation error:', error);
      return { valid: false, error: 'Network error' };
    }
  }

  /**
   * Perform Web3 Login with Internal API
   */
  async performWeb3Login(crossmintToken: string): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      console.log('🔐 Performing Web3 login with internal API...');

      const response = await fetch(
        `${this.internalApi.baseUrl}${this.internalApi.endpoints.web3Login}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            provider: 'crossmint',
            crossmintToken,
            walletAddress: '',
            signature: '',
            message: '',
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || `HTTP ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: data.success,
        data: data.data,
        error: data.success ? undefined : data.message,
      };
    } catch (error) {
      console.error('❌ Web3 login error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  /**
   * Register User with Internal API
   */
  async registerUser(userInfo: CrossmintUser): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      console.log('📝 Registering user with internal API...');

      // Extract user information
      const email = userInfo.email || '';
      const name = userInfo.name || '';
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ') || '';

      // Generate username
      let username = '';
      if (email) {
        username = email.split('@')[0];
      } else if (userInfo.preferred_address?.address) {
        username = `user_${userInfo.preferred_address.address.slice(2, 10)}`;
      } else {
        username = `user_${Date.now()}`;
      }

      const userData = {
        username,
        email,
        password: `temp_${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}`,
        firstName: firstName || 'User',
        lastName: lastName || '',
        phoneNumber: '',
      };

      const response = await fetch(
        `${this.internalApi.baseUrl}${this.internalApi.endpoints.registerUser}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || `HTTP ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: data.success,
        data: data.data,
        error: data.success ? undefined : data.message,
      };
    } catch (error) {
      console.error('❌ User registration error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  /**
   * Complete Authentication Flow
   * Handles validation, login, and registration if needed
   */
  async completeAuthFlow(crossmintToken: string): Promise<{
    success: boolean;
    user?: any;
    tokens?: any;
    error?: string;
  }> {
    try {
      // Step 1: Validate token
      const validation = await this.validateToken(crossmintToken);
      if (!validation.valid) {
        return {
          success: false,
          error: `Token validation failed: ${validation.error}`,
        };
      }

      // Step 2: Try login
      const loginResult = await this.performWeb3Login(crossmintToken);
      if (loginResult.success && loginResult.data) {
        return {
          success: true,
          user: loginResult.data.user,
          tokens: {
            access_token: loginResult.data.access_token,
            refresh_token: loginResult.data.refresh_token,
            expires: loginResult.data.expires,
          },
        };
      }

      // Step 3: Register if needed
      if (!validation.userInfo) {
        return {
          success: false,
          error: 'User info not available from Crossmint',
        };
      }

      const registrationResult = await this.registerUser(validation.userInfo);
      if (!registrationResult.success) {
        return {
          success: false,
          error: `Registration failed: ${registrationResult.error}`,
        };
      }

      // Step 4: Try login again
      const secondLoginResult = await this.performWeb3Login(crossmintToken);
      if (secondLoginResult.success && secondLoginResult.data) {
        return {
          success: true,
          user: secondLoginResult.data.user,
          tokens: {
            access_token: secondLoginResult.data.access_token,
            refresh_token: secondLoginResult.data.refresh_token,
            expires: secondLoginResult.data.expires,
          },
        };
      }

      return {
        success: false,
        error: 'Failed to login after registration',
      };
    } catch (error) {
      console.error('❌ Complete auth flow error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Crossmint-specific types for NextAuth
export interface CrossmintJWT {
  crossmintToken?: string;
  crossmintUser?: CrossmintUser;
  authMethod?: CrossmintAuthMethod;
  access_token?: string;
  refresh_token?: string;
  expires?: string;
  user?: any;
}

export interface CrossmintUser extends User {
  crossmintToken?: string;
  crossmintUser?: CrossmintUser;
  authMethod?: CrossmintAuthMethod;
  access_token?: string;
  refresh_token?: string;
  expires?: string;
  user?: any;
}

export interface CrossmintSession {
  user: {
    access_token?: string;
    refresh_token?: string;
    expires?: string;
    user?: any;
    type?: string;
    email?: string;
    name?: string;
    id?: string;
    crossmintToken?: string;
    crossmintUser?: CrossmintUser;
    authMethod?: CrossmintAuthMethod;
  };
}

/**
 * Crossmint-only NextAuth Configuration
 * Supports all Crossmint authentication methods:
 * - Email OTP
 * - Social Accounts (Google, Apple, X)
 * - Farcaster (SIWF)
 * - External Wallets
 */
export const crossmintAuthOptions: AuthOptions = {
  debug: process.env.NODE_ENV !== 'production',
  providers: [
    CredentialsProvider({
      id: 'crossmint',
      name: 'Crossmint',
      credentials: {
        method: { label: 'Auth Method', type: 'text' },
        token: { label: 'Token', type: 'text' },
        email: { label: 'Email', type: 'email' },
        otp: { label: 'OTP', type: 'text' },
        walletAddress: { label: 'Wallet Address', type: 'text' },
        signature: { label: 'Signature', type: 'text' },
        message: { label: 'Message', type: 'text' },
        nonce: { label: 'Nonce', type: 'text' },
        chainId: { label: 'Chain ID', type: 'text' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.method) {
            throw new Error('Authentication method is required');
          }

          const authService = new CrossmintAuthService();
          const method = credentials.method as CrossmintAuthMethod;

          console.log('🎯 Crossmint Authentication Method:', method);

          let authResult: CrossmintAuthResponse | null = null;

          // Handle different authentication methods
          switch (method) {
            case CrossmintAuthMethod.EMAIL_OTP:
              if (!credentials.email) {
                throw new Error('Email is required for OTP authentication');
              }
              authResult = await authService.authenticateWithEmailOTP(
                credentials.email,
                credentials.otp
              );
              break;

            case CrossmintAuthMethod.SOCIAL_GOOGLE:
            case CrossmintAuthMethod.SOCIAL_APPLE:
            case CrossmintAuthMethod.SOCIAL_X:
              if (!credentials.token) {
                throw new Error('Social token is required');
              }
              const provider = method.replace('social_', '') as
                | 'google'
                | 'apple'
                | 'x';
              authResult = await authService.authenticateWithSocial(
                provider,
                credentials.token
              );
              break;

            case CrossmintAuthMethod.FARCASTER:
              if (
                !credentials.message ||
                !credentials.signature ||
                !credentials.nonce
              ) {
                throw new Error(
                  'Message, signature, and nonce are required for Farcaster auth'
                );
              }
              authResult = await authService.authenticateWithFarcaster(
                credentials.message,
                credentials.signature,
                credentials.nonce
              );
              break;

            case CrossmintAuthMethod.EXTERNAL_WALLET:
              if (
                !credentials.walletAddress ||
                !credentials.signature ||
                !credentials.message
              ) {
                throw new Error(
                  'Wallet address, signature, and message are required'
                );
              }
              authResult = await authService.authenticateWithWallet(
                credentials.walletAddress,
                credentials.signature,
                credentials.message,
                credentials.chainId ? parseInt(credentials.chainId) : undefined
              );
              break;

            default:
              throw new Error(`Unsupported authentication method: ${method}`);
          }

          if (!authResult?.success || !authResult.data) {
            throw new Error(authResult?.error || 'Authentication failed');
          }

          // Complete the authentication flow with internal API
          const flowResult = await authService.completeAuthFlow(
            authResult.data.access_token
          );

          if (!flowResult.success) {
            throw new Error(flowResult.error || 'Authentication flow failed');
          }

          return {
            id: flowResult.user?.id || 'unknown',
            email: flowResult.user?.email || authResult.data.user.email || '',
            name:
              flowResult.user?.firstName && flowResult.user?.lastName
                ? `${flowResult.user.firstName} ${flowResult.user.lastName}`.trim()
                : authResult.data.user.name || '',
            crossmintToken: authResult.data.access_token,
            crossmintUser: authResult.data.user,
            authMethod: method,
            access_token: flowResult.tokens?.access_token,
            refresh_token: flowResult.tokens?.refresh_token,
            expires: JSON.stringify(flowResult.tokens?.expires),
            user: JSON.stringify(flowResult.user),
          } as unknown as User;
        } catch (error) {
          console.error('❌ Crossmint authentication error:', error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const crossmintUser = user as any;
        return {
          ...token,
          crossmintToken: crossmintUser.crossmintToken,
          crossmintUser: crossmintUser.crossmintUser,
          authMethod: crossmintUser.authMethod,
          access_token: crossmintUser.access_token,
          refresh_token: crossmintUser.refresh_token,
          expires: crossmintUser.expires,
          user: crossmintUser.user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Parse user data safely
      let userData = null;
      if (token.user) {
        try {
          userData =
            typeof token.user === 'string'
              ? JSON.parse(token.user)
              : token.user;
        } catch (parseError) {
          console.warn('Failed to parse user data:', parseError);
          userData = token.user;
        }
      }

      // Parse expires data safely
      let expiresData = null;
      if (token.expires) {
        try {
          expiresData =
            typeof token.expires === 'string'
              ? JSON.parse(token.expires)
              : token.expires;
        } catch (parseError) {
          console.warn('Failed to parse expires data:', parseError);
          expiresData = token.expires;
        }
      }

      return {
        ...session,
        user: {
          ...session.user,
          crossmintToken: token.crossmintToken,
          crossmintUser: token.crossmintUser,
          authMethod: token.authMethod,
          access_token: token.access_token,
          refresh_token: token.refresh_token,
          expires: expiresData,
          user: userData,
        },
      };
    },
  },
  pages: {
    signIn: '/auth/crossmint',
  },
};

export default CrossmintAuthService;
