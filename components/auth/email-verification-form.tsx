"use client";

import { VerifyToken } from "@/actions/auth";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import AuthFormMessage from "./auth-form-message";
import { CardWrapper } from "./card-wrapper";

export const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (error || success) return;

    if (!token) {
      setError("Token inválido");
      return;
    }

    VerifyToken(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Algo deu errado!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      title="Auth"
      headerLabel="Confirmando sua verificação"
      backButtonLabel="Voltar ao Login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        {success && (
          <AuthFormMessage title="Sucesso" type="success" message={success} />
        )}
        {error && (
          <AuthFormMessage
            title="Encontramos um problema"
            type="error"
            message={error}
          />
        )}
      </div>
    </CardWrapper>
  );
};
