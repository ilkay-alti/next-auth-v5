import * as z from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(5, "Username must be at least 5 characters long"),
    email: z
      .string()
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type TRegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  code: z.optional(z.string()),
});
export type TLoginSchema = z.infer<typeof loginSchema>;

export const ResetPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long"),
});
export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type TNewPasswordSchema = z.infer<typeof NewPasswordSchema>;
