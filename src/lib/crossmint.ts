/**
 * Crossmint Authentication Helper
 * Based on Crossmint SDK documentation: https://docs.crossmint.com/authentication/introduction
 */

import { Session } from 'next-auth';

export interface CrossmintUser {
  userId: string;
  email?: string;
  phoneNumber?: string;
  farcaster?: {
    username: string;
  };
  google?: {
    displayName: string;
  };
  wallets?: Array<{
    address: string;
    chain: string;
  }>;
  username?: string;
}

export interface CrossmintAuthResult {
  user: CrossmintUser | null;
  jwt: string | null;
  error?: string;
}

/**
 * Crossmint authentication configuration
 */
export const crossmintConfig = {
  apiKey: process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_SECRET || '',
  projectId: process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_ID || '',
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'staging',
};

/**
 * Validate Crossmint configuration
 */
export function validateCrossmintConfig(): boolean {
  if (!crossmintConfig.apiKey) {
    console.error('❌ NEXT_PUBLIC_CROSSMINT_CLIENT_SECRET is not configured');
    return false;
  }
  if (!crossmintConfig.projectId) {
    console.error('❌ NEXT_PUBLIC_CROSSMINT_CLIENT_ID is not configured');
    return false;
  }
  return true;
}

/**
 * Parse Crossmint user data from authentication result
 */
export function parseCrossmintUser(authData: unknown): CrossmintUser | null {
  try {
    if (!authData || typeof authData !== 'object' || authData === null) {
      return null;
    }

    const data = authData as Record<string, unknown>;

    if (!data.userId || typeof data.userId !== 'string') {
      return null;
    }

    return {
      userId: data.userId,
      email: typeof data.email === 'string' ? data.email : undefined,
      phoneNumber:
        typeof data.phoneNumber === 'string' ? data.phoneNumber : undefined,
      farcaster:
        data.farcaster &&
        typeof data.farcaster === 'object' &&
        data.farcaster !== null
          ? {
              username: (data.farcaster as Record<string, unknown>)
                .username as string,
            }
          : undefined,
      google:
        data.google && typeof data.google === 'object' && data.google !== null
          ? {
              displayName: (data.google as Record<string, unknown>)
                .displayName as string,
            }
          : undefined,
      wallets: Array.isArray(data.wallets)
        ? (data.wallets as Array<{
            address: string;
            chain: string;
          }>)
        : [],
    };
  } catch (error) {
    console.error('❌ Error parsing Crossmint user data:', error);
    return null;
  }
}

/**
 * Get user display name from Crossmint user data
 */
export function getCrossmintUserDisplayName(user: Session['user']): string {
  if (user.username) {
    return user.username;
  }
  // if (user.google?.displayName) {
  //   return user.google.displayName;
  // }
  // if (user.farcaster?.username) {
  //   return `@${user.farcaster.username}`;
  // }
  if (user.email) {
    return user.email;
  }
  return user.id || '';
}

/**
 * Check if Crossmint is properly configured
 */
export function isCrossmintConfigured(): boolean {
  return validateCrossmintConfig();
}

/**
 * Get Crossmint login methods based on configuration
 */
export function getCrossmintLoginMethods(): string[] {
  // Default login methods supported by Crossmint
  return ['email', 'google', 'farcaster'];
}

/**
 * Crossmint authentication error messages
 */
export const CrossmintErrors = {
  CONFIGURATION_MISSING:
    'Crossmint configuration is missing. Please check your environment variables.',
  AUTHENTICATION_FAILED: 'Crossmint authentication failed. Please try again.',
  USER_DATA_INVALID: 'Invalid user data received from Crossmint.',
  JWT_MISSING: 'JWT token is missing from Crossmint authentication.',
  NETWORK_ERROR: 'Network error occurred during Crossmint authentication.',
} as const;

/**
 * Handle Crossmint authentication errors
 */
export function handleCrossmintError(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return CrossmintErrors.AUTHENTICATION_FAILED;
}
