import { prisma } from "@netr/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "./env";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session.user as any).id = user.id;
      }
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
