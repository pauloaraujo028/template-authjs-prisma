"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
  text: string;
}

export const BackButton = ({ href, label, text }: BackButtonProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-1">
      <span className="font-normal text-xs">{text}</span>
      <Button className="font-normal p-0" variant="link" size="sm" asChild>
        <Link href={href}> {label}</Link>
      </Button>
    </div>
  );
};
