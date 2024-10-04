"use client";

import LogoutButton from "@/components/auth/logout-button";
import { useSession } from "next-auth/react";

const Settings = () => {
  const session = useSession();

  // if (session?.user?.role !== "ADMIN") {
  //   return <div>Você não é um admin</div>;
  // }

  return (
    <div className="flex flex-col gap-4">
      {JSON.stringify(session)}

      <LogoutButton text="Sair" />
    </div>
  );
};

export default Settings;
