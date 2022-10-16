import type { GetServerSidePropsContext } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./options";

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}): Promise<Session | null> => {
  return unstable_getServerSession(ctx.req, ctx.res, nextAuthOptions);
};
