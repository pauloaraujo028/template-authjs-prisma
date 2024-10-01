"use server";

import { db } from "@/lib/db";
import { getUserbyEmail } from "@/services/auth";
import { getVerificationTokenByToken } from "@/services/auth/email-verification";

export const VerifyToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token não existe" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "O token expirou!" };
  }

  const existingUser = await getUserbyEmail(existingToken.email);

  if (!existingUser) {
    return { error: "E-mail não existe" };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "E-mail verificado!" };
};
