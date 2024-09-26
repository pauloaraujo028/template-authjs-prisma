"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

type LogoutButtonProps = {
  text: string;
};

const LogoutButton = ({ text }: LogoutButtonProps) => {
  return <Button onClick={() => signOut()}>{text}</Button>;
};

export default LogoutButton;
