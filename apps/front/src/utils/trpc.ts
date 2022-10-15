import type { AppRouter } from "@netr/front-api";
import { transformer } from "@netr/front-api/transformer";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { env } from "./env";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""; // browser should use relative url
  }

  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`; // SSR should use vercel url
  }

  return `http://localhost:${env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      transformer,
    };
  },
  ssr: false,
});
