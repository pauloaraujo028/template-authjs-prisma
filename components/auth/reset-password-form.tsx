"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
// import { useSearchParams } from "next/navigation";
import { changePassword } from "@/actions/auth/password-reset";
import { resetPasswordSchema } from "@/schemas/auth";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthFormMessage from "./auth-form-message";

export const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    startTransition(async () => {
      try {
        const resp = await changePassword(values);

        if (!resp) {
          setError("Resposta inválida do servidor");
          setSuccess("");
          form.reset();
          return;
        }

        const { error, success } = resp;

        if (error) {
          setError(resp.error);
          setSuccess("");
          form.reset();
          return;
        }
        if (success) {
          setSuccess(success);
          setError("");
          return;
        }

        form.reset();
      } catch {
        setError("Algo deu errado");
        setSuccess("");
        form.reset();
      }
    });
  };

  return (
    <div className="lg:grid lg:grid-cols-2 items-center justify-center">
      <div>
        <CardWrapper
          headerLabel="Esqueceu sua senha?"
          backButtonLabel="Voltar ao login"
          backButtonHref="/auth/login"
          classNames="lg:rounded-r-none"
          title="Auth"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@exemplo.com"
                          {...field}
                          disabled={isPending}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* {callbackError && (
                <FormMessageError
                  type="error"
                  message={callbackError}
                  title="Erro"
                  onClearMessage={() => setError("")}
                />
              )} */}
              {error && (
                <AuthFormMessage
                  type="error"
                  message={error}
                  title="Erro"
                  // onClearMessage={() => setError("")}
                />
              )}
              {success && (
                <AuthFormMessage
                  type="success"
                  message={success}
                  title="Sucesso"
                  // onClearMessage={() => setSuccess("")}
                />
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                <LoaderCircle
                  size={20}
                  className={!isPending ? "hidden" : "animate-spin mr-2"}
                />
                Enviar e-mail de redefinição
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
      <Card className="relative w-[400px] h-full shadow-md rounded-l-none hidden bg-white lg:block">
        <h1 className="text-4xl font-bold text-center p-8">Logo Name</h1>
        <Image
          src="/stock.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="absolute bottom-0 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </Card>
    </div>
  );
};
