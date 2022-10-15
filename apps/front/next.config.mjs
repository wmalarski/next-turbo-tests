// @ts-check
import withTM from "next-transpile-modules";
import i18next from "./next-i18next.config.js";
/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
const defineNextConfig = (config) => {
  return config;
};

export default withTM(["@netr/front-api", "@netr/auth", "@netr/db"])(
  defineNextConfig({
    i18n: i18next.i18n,
    reactStrictMode: true,
    swcMinify: true,
  })
);
