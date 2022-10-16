import { prisma } from "@netr/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { env } from "./env";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      authorize: (credentials, req) => {
        // eslint-disable-next-line no-console
        console.log("CredentialsProvider", { credentials, req });

        const user = { email: "jsmith@example.com", id: 1, name: "J Smith" };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
      credentials: {
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
      },
      name: "Credentials",
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
};
