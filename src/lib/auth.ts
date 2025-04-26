import { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
  
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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "type" },
      },
      async authorize(credentials) {
        // console.log('credentials', credentials);
        const user = {
          id: "1",
          name: "John Doe",
          email: credentials?.email,
          image: ''
        };
        // const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        // if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
        //   throw new Error("Invalid email or password");
        // }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // console.log('jwt', token, user);
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // console.log('session', token, session);
    //   if (token) session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/", // Redirect users to a custom sign-in page
  },
};