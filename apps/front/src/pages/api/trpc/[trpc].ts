import { appRouter, createContext } from "@netr/front-api";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  createContext,
  router: appRouter,
});
