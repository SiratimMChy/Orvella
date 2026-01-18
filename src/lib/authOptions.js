import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await loginUser({
          email: credentials.email,
          password: credentials.password,
        });
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isExist = await dbConnect(collections.USERS).findOne({
        email: user.email.toLowerCase(),
      });

      if (isExist) {
        if (isExist.provider !== account?.provider) {
          return false;
        }
        return true;
      }

      const newUser = {
        provider: account?.provider,
        email: user.email.toLowerCase(),
        name: user.name,
        image: user.image,
        role: "user",
      };
      
      const result = await dbConnect(collections.USERS).insertOne(newUser);
      return result.acknowledged;
    },
    async redirect({ url, baseUrl }) {
      if (url === "/provider-mismatch") {
        return `${baseUrl}/provider-mismatch`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.role = token?.role;
        session.user.email = token?.email;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if (account.provider == "google") {
          const dbUser = await dbConnect(collections.USERS).findOne({
            email: user.email,
          });
          token.role = dbUser?.role;
          token.email = dbUser?.email;
        } else {
          token.role = user?.role;
          token.email = user?.email;
        }
      }
      return token;
    },
  },
};