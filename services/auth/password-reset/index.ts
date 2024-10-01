import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";

export const getResetPasswordTokenByToken = async (token: string) => {
  const resetPasswordToken = await db.resetPasswordToken.findUnique({
    where: { token },
  });

  return resetPasswordToken;
};

export const getResetPasswordTokenByEmail = async (email: string) => {
  const passwordResetToken = await db.resetPasswordToken.findFirst({
    where: { email },
  });

  return passwordResetToken;
};

export const deleteResetPasswordToken = async (id: string) => {
  await db.resetPasswordToken.delete({
    where: { id },
  });
};

export const updatePassword = async (id: string, password: string) => {
  await db.user.update({
    where: { id },
    data: { password },
  });
};

export const createResetPasswordToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); //two hours

  const existingToken = await getResetPasswordTokenByEmail(email);
  if (existingToken) {
    await deleteResetPasswordToken(existingToken.id);
  }

  const verificationToken = await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
