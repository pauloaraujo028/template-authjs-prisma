"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/auth";
import { findUserbyEmail } from "@/services";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Credenciais inválidas!" };
  }

  try {
    const { email, password } = validatedFields.data;
    const user = await findUserbyEmail(email);
    if (!user) {
      return {
        error: "Usuário não encontrado",
      };
    }
    //Verificação de E-mail

    await signIn("credentials", {
      email,
      password,
      redirectTo: process.env.AUTH_LOGIN_REDIRECT,
    });
  } catch (err) {
    // if (err instanceof AuthError) {
    //   if (err instanceof CredentialsSignin) {
    //     return {
    //       error: "Credenciais inválidas",
    //     };
    //   }
    // }

    throw err; // Rethrow all other errors
  }
};
