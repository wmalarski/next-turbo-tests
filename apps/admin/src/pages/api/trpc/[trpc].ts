import { appRouter, createContext } from "@netr/admin-api";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export default createNextApiHandler({
  createContext,
  router: appRouter,
});
