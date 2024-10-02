import { auth } from "@/auth";
import LogoutButton from "@/components/auth/logout-button";

const Settings = async () => {
  const session = await auth();

  // if (session?.user?.role !== "ADMIN") {
  //   return <div>Você não é um admin</div>;
  // }

  return (
    <div className="">
      {JSON.stringify(session, null, 2)}

      <div>{session?.user.role}</div>

      <div>
        <LogoutButton text="Sair" />
      </div>
    </div>
  );
};

export default Settings;
