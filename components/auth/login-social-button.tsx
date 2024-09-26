"use client";

import { signIn } from "next-auth/react";
import { ReactNode } from "react";
import { Button } from "../ui/button";

interface LoginSocialButtonProps {
  provider: "google" | "github";
  callbackUrl?: string;
  children?: ReactNode;
}

export const LoginSocialButton = ({
  provider,
  callbackUrl,
  children,
}: LoginSocialButtonProps) => {
  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full"
      onClick={async () => {
        signIn(provider, { redirect: true, callbackUrl });
      }}
    >
      {children}
    </Button>
  );
};
