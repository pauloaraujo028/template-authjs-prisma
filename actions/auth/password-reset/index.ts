"use server";

import { sendPasswordResetEmail } from "@/lib/mail";
import { newPasswordSchema, resetPasswordSchema } from "@/schemas/auth";
import { getUserbyEmail } from "@/services/auth";
import {
  createResetPasswordToken,
  deleteResetPasswordToken,
  getResetPasswordTokenByToken,
  updatePassword,
} from "@/services/auth/password-reset";
import bcryptjs from "bcryptjs";
import { z } from "zod";

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>
) => {
  const validatedEmail = resetPasswordSchema.safeParse(values);
  if (!validatedEmail.success) {
    return { error: "E-mail inválido" };
  }

  const { email } = validatedEmail.data;

  const existingUser = await getUserbyEmail(email);
  if (!existingUser) {
    return { error: "Usuário não encontrado" };
  }

  const resetPasswordToken = await createResetPasswordToken(email);
  await sendPasswordResetEmail(
    resetPasswordToken.email,
    resetPasswordToken.token
  );

  return { success: "E-mail de mudança de senha enviado" };
};

export const changePassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Token não encontrado" };
  }

  const validatedPassword = newPasswordSchema.safeParse(values);

  if (!validatedPassword.success) {
    return { error: "Dados inválidos" };
  }

  const { password } = validatedPassword.data;

  const existingToken = await getResetPasswordTokenByToken(token);
  if (!existingToken) {
    return { error: "Token inválido" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token Expirado" };
  }

  const existingUser = await getUserbyEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Usuário não encontrado" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await updatePassword(existingUser.id, hashedPassword);

  await deleteResetPasswordToken(existingToken.id);

  return { success: "Senha atualizada" };
};
