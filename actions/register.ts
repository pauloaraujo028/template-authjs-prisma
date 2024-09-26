"use server";

import { db } from "@/lib/db";
import { registerSchema } from "@/schemas/auth";
import { findUserbyEmail } from "@/services";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Credenciais inválidas!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await findUserbyEmail(email);

  if (existingUser) {
    return { error: "O e-mail já está em uso!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Usuário criado com sucesso!" };
};
