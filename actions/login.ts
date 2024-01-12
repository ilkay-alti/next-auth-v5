"use server";
import { loginSchema, TLoginSchema } from "@/utils/schemas/types";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { string } from "zod";

export const login = async (values: TLoginSchema) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields) {
    return { error: "Invalid login credentials" };
  }

  const { email, password } = validatedFields.data;

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
