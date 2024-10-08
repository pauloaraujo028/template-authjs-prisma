import { db } from "@/lib/db";

export const getUserbyEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserbyId = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        // isTwoFactorAuthEnabled: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};
