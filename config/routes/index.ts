import type { ConfigRoutes } from "@/types/routes";

export const configRoutes: ConfigRoutes = {
  publicRoutes: [
    "/auth/login",
    "/auth/register",
    "/auth/change-password",
    "/auth/reset-password",
    "/auth/verify-email",
    "/example/web-site-builder/campaign-hot-page",
    "/auth/users",
  ],
  authRoutes: [
    "/auth/login",
    "/auth/register",
    "/api/auth/signin",
    "/api/auth/callback/*",
  ],
  apiRoutes: ["/api/*"],
  protectedRoutes: ["/", "/settings"],
};
