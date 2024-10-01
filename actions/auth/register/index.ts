"use server";

import { db } from "@/lib/db";
import { sendAccountVerificationEmail } from "@/lib/mail";
import { registerSchema } from "@/schemas/auth";
import { generateVerificationToken } from "@/services/auth/email-verification";
import { UserRole } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";
import { z } from "zod";
// import { sendAccountVerificationEmail } from "../email-verification";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Credenciais inválidas!" };
  }

  try {
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // const existingUser = await getUserbyEmail(email);

    // if (existingUser) {
    //   return { error: "O e-mail já está em uso!" };
    // }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRole.USER,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendAccountVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "E-mail de confirmação enviado!" };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: "Já existe uma conta relacionada a este e-mail.",
        };
      }
    }

    throw error;
  }
};
