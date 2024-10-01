"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/auth";
import { getUserbyEmail } from "@/services/auth";
import { generateVerificationToken } from "@/services/auth/email-verification";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Credenciais inválidas!" };
  }

  try {
    const { email, password } = validatedFields.data;
    const existingUser = await getUserbyEmail(email);

    if (!existingUser) {
      return {
        error: "Usuário não encontrado",
      };
    }
    //Verificação de E-mail
    if (!existingUser.emailVerified) {
      await generateVerificationToken(existingUser.email);

      return {
        success: "Verificação de E-mail enviada com sucesso",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: process.env.AUTH_LOGIN_REDIRECT,
    });

    return {
      success: "Login realizado com sucesso!",
    };
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
