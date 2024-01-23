import email from "next-auth/providers/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificitaionEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "nextauthv5@resend.dev",
    to: email,
    subject: "Verify your email address",
    html: `
      <h1>Verify your email address</h1>
      <p>Click the link below to verify your email address.</p>
      <a href="${confirmLink}">Verify your email address</a>
    `,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "nextauthv5@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
      <h1>Reset Password</h1>
      <p>Click the link below to reset password.</p>
      <a href="${confirmLink}">Reset Password</a>
    `,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "nextauthv5@resend.dev",
    to: email,
    subject: "2FA Code",
    html: `
      <h1>Two Factor Authentication</h1>
      <p>Click the link below to Two Factor Authentication.</p>
      <h1">2FA Code: ${token}</h1>
    `,
  });
};
