import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: string;
  isTwoFactorEnabed: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
