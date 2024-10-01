"use server";

import { sendPasswordResetEmail } from "@/lib/mail";
import { resetPasswordSchema } from "@/schemas/auth";
import { getUserbyEmail } from "@/services/auth";
import { createResetPasswordToken } from "@/services/auth/password-reset";
import { z } from "zod";

export const changePassword = async (
  values: z.infer<typeof resetPasswordSchema>
) => {
  const validatedFields = resetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "E-mail inválido!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserbyEmail(email);

  if (!existingUser) {
    return { error: "E-mail não encontrado!" };
  }

  const passwordResetToken = await createResetPasswordToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "E-mail de redefinição enviado!" };
};
