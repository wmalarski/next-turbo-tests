import type { Session } from "next-auth";
import NextAuth from "next-auth";

export { getServerAuthSession } from "./src/getServerAuthSession";
export { authOptions } from "./src/options";
export { Session, NextAuth };
