import "@styles/globals.css";
import { trpc } from "@utils/trpc";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import type { AppType } from "next/app";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default appWithTranslation(trpc.withTRPC(MyApp) as any);
