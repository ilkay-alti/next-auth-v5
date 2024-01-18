"use server";
import { loginSchema, TLoginSchema } from "@/utils/schemas/types";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { genereateVerificationToken } from "@/utils/tokens";
import { sendVerificitaionEmail } from "@/utils/mail";

export const login = async (values: TLoginSchema) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields) {
    return { error: "Invalid login credentials" };
  }

  const { email, password } = validatedFields.data;

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
