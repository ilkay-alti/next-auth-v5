import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./utils/db";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import { Economica } from "next/font/google";
import { getTwoFactorTokenByEmail } from "./data/two-factor-token";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmaiton";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification.
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);
      // Prevent sign in if email is not verified.
      if (!existingUser?.emailVerified) return false;

      //! TODO: Add 2FA check here
      if (existingUser.isTwoFactorEnabed) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      if (token.isTwoFactorEnabed && session.user) {
        session.user.isTwoFactorEnabed = token.isTwoFactorEnabed as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.isTwoFactorEnabed = existingUser.isTwoFactorEnabed;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
