import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import crypto from "crypto";
import { getPasswordResetTokenByEmail } from "@/data/reset-password";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import email from "next-auth/providers/email";

export const genereateVerificationToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingUser = await getVerificationTokenByEmail(email);

  if (existingUser) {
    await db.verificationToken.delete({
      where: {
        id: existingUser.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingUser = await getPasswordResetTokenByEmail(email);

  if (existingUser) {
    await db.passwordResetToken.delete({
      where: {
        id: existingUser.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 999999).toString();
  // 15 minutes
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
