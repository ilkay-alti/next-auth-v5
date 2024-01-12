"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/utils/db";
import { TRegisterSchema } from "@/utils/schemas/types";
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

  return { success: "User created successfully" };
};
