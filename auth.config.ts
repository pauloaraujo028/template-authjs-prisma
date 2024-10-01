import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./schemas/auth";
import { getUserbyEmail } from "./services/auth";

import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserbyEmail(email);

          if (!user || !user.password) return null;

          const validPassword = await bcrypt.compare(password, user.password);

          if (validPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
