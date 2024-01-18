"use server";

import { getPasswordResetToken } from "@/data/reset-password";
import { getUserByEmail } from "@/data/user";
import { db } from "@/utils/db";
import bcrypt from "bcryptjs";

export const newPassword = async (password: string, token: string) => {
  if (!token) {
    return { error: "Token does not exist" };
  }

  const existingToken = await getPasswordResetToken(token);

  if (!existingToken) {
    return { error: "Invalid token" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  //   console.log("password hashed");

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  //   console.log("password updated");

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  //   console.log("password token deleted");

  return { success: "Password updated" };
};
