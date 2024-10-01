import { Resend } from "resend";

const mail = new Resend(process.env.RESEND_API_KEY);

export const sendAccountVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `http://localhost:3000/auth/verify-email?token=${token}`;

  await mail.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirme seu e-mail",
    html: `<p>Clique <a href="${confirmLink}">aqui</a> para confirmar seu e-mail.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/change-password?token=${token}`;

  await mail.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset sua senha",
    html: `<p>Clique <a href="${resetLink}">aqui</a> para resetar sua senha.</p>`,
  });
};
