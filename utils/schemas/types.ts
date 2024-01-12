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
});
export type TLoginSchema = z.infer<typeof loginSchema>;
