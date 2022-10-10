// src/pages/api/trpc/[trpc].ts
import { appRouter, createContext } from "@netr/admin-api";
import { createNextApiHandler } from "@trpc/server/adapters/next";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
