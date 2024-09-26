"use client";

import { BackButton } from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import { SocialLogin } from "@/components/auth/social-login";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { ClassNameValue } from "tailwind-merge";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  classNames?: ClassNameValue;
  title?: string;
  text?: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  classNames,
  title,
  text,
}: CardWrapperProps) => {
  return (
    <Card className={`${classNames} w-[400px] shadow-md`}>
      <CardHeader>
        <Header label={headerLabel} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <SocialLogin />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton text={text} label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
