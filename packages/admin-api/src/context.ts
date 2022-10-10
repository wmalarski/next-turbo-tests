import { getServerAuthSession, Session } from "@netr/auth";
import { prisma } from "@netr/db";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

type CreateContextOptions = {
  session: Session | null;
};

export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await getServerAuthSession({ req, res });

  return await createContextInner({ session });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
