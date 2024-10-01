import { object, string } from "zod";

export const loginSchema = object({
  email: string({ required_error: "O e-mail é obrigatório" })
    .min(1, "O e-mail é obrigatório")
    .email("E-mail inválido"),
  password: string({ required_error: "A senha é obrigatória" }).min(
    1,
    "A senha é obrigatória"
  ),
});

export const registerSchema = object({
  email: string({ required_error: "O e-mail é obrigatório" })
    .min(1, "O e-mail é obrigatório")
    .email("E-mail inválido"),
  password: string({ required_error: "A senha é obrigatória" })
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(32, "A senha deve ter menos de 32 caracteres"),
  name: string({ required_error: "O nome é obrigatório" }).min(
    1,
    "O nome é obrigatório"
  ),
});

export const resetPasswordSchema = object({
  email: string().email({
    message: "E-mail é obrigatório",
  }),
});

export const newPasswordSchema = object({
  password: string().min(6, {
    message: "A senha deve ter no mínimo 6 caracteres",
  }),
});
