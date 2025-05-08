import { AuthOptions, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import axios from 'axios';

declare module 'next-auth' {
  interface JWT {
    access_token: string;
    id: string;
    name: string;
    email: string;
    image: string;
    wallet: string;
  }
  interface User {
    access_token: string;
    id: string;
    name: string;
    email: string;
    image: string;
    wallet: string;
  }
  interface Session {
    user: {
      access_token: string;
      id: string;
      name: string;
      email: string;
      image: string;
      wallet: string;
    };
  }
}
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        type: { label: 'Type', type: 'type' },
        wallet: { label: 'Wallet', type: 'wallet' },
      },
      async authorize(credentials) {
        console.log('credentials', credentials);
        return { ...credentials } as unknown as User;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log('jwt', token);
      console.log('jwt user', user);
      console.log('jwt account', account);
      console.log('jwt profile', profile);

      // const users = user as unknown as { wallet: string; type: string, password: string };
      //   if (token) session.user.id = token.id;
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API}/auth/signin`,
      //   {
      //     identity: 'yui',
      //     password: '1234',
      //   }
      // );
      // if (user) {
      //   token.id = token.id;
      //   token.name = token.name;
      //   token.email = token.email;
      //   token.image = token.image;
      //   token.wallet = token.wallet;
      //   token.type = token.type;
      // }

      return {
        ...token,
        user: token.user || user,
        access_token: token.access_token || user.access_token,
        // user: response.data.data.user,
        // access_token: response.data.data.access_token,
        // expires: response.data.data.expires,
        // refresh_token: response.data.data.refresh_token,
      };
    },
    async session({ session, token }) {
      console.log('token', token, session);
      console.log('session ', token, session);

      return {
        ...session,
        ...token,
      };
    },
  },
  pages: {
    signIn: '/', // Redirect users to a custom sign-in page
  },
};
