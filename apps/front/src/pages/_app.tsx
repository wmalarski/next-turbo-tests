import { appWithTranslation } from "next-i18next";
import type { AppType } from "next/app";
import "../styles/globals.css";
import { trpc } from "../utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default appWithTranslation(trpc.withTRPC(MyApp) as any);
