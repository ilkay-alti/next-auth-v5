"use server";

import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/utils/mail";
import { TResetPasswordSchema } from "@/utils/schemas/types";
import { generatePasswordResetToken } from "@/utils/tokens";

export const resetPassword = async (values: TResetPasswordSchema) => {
  const { email } = values;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset Email  Sent!" };
};
