"use server";

import { registerSchema } from "@/schemas";
import { z } from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Credenciais inválidas!" };
  }
  return { success: "E-mail enviado!" };
};
