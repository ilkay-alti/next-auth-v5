"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/utils/db";
import { sendVerificitaionEmail } from "@/utils/mail";
import { TRegisterSchema } from "@/utils/schemas/types";
import { genereateVerificationToken } from "@/utils/tokens";
import bcrypt from "bcryptjs";

export const registerServer = async (data: TRegisterSchema) => {
  const { email, password, username } = data;
  const HashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "User already exists",
    };
  }

  const user = await db.user.create({
    data: {
      name: username,
      email,
      password: HashedPassword,
    },
  });

  const verificationToken = await genereateVerificationToken(email);

  await sendVerificitaionEmail(
    verificationToken.email,
    verificationToken.token
  );

  return { success: "Comfirmation email sent!" };
};
