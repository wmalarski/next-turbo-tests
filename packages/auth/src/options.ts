import { prisma } from "@netr/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "./env";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
};
