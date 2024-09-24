import { Button } from "@/components/ui/button";
import { LoginButton } from "../auth/login/_components/login-button";

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🔐 Auth
        </h1>
        <p className="text-white text-lg">Um serviço simples de autenticação</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
}
