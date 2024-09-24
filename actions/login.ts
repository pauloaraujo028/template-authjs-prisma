"use server";

import { loginSchema } from "@/schemas";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Credenciais inválidas!" };
  }
  return { success: "E-mail enviado!" };
};
