import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Opa! Algo deu errado!"
      backButtonHref="/auth/login"
      backButtonLabel="Voltar ao Login"
    >
      <div className="flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive h-full w-10 h10" />
      </div>
    </CardWrapper>
  );
};
