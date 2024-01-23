"use server";
import { loginSchema, TLoginSchema } from "@/utils/schemas/types";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import {
  genereateVerificationToken,
  generateTwoFactorToken,
} from "@/utils/tokens";
import { sendVerificitaionEmail, sendTwoFactorTokenEmail } from "@/utils/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/utils/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmaiton";

export const login = async (values: TLoginSchema) => {
  console.log("values", values);
  const { email, password, code } = values;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid login credentials" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await genereateVerificationToken(
      existingUser.email
    );
    await sendVerificitaionEmail(
      verificationToken.email,
      verificationToken.token
    );
    return {
      success: "Check your email for verification",
    };
  }

  if (existingUser.isTwoFactorEnabed && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      console.log("twoFactorToken", twoFactorToken);
      if (!twoFactorToken) {
        return { error: "Invalid 2FA" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid Code 2FA" };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code has expired 2FA" };
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return {
        twoFactor: true,
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Login sucses" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid login credentials" };
        default:
          return { error: "An error occurred while logging in" };
      }
    }
    throw error;
  }
};
