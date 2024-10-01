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
import { newPasswordSchema } from "@/schemas/auth";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthFormMessage from "./auth-form-message";

export const ChangePasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const { success, error } = await changePassword(values, token);
        if (error) setError(error);
        setSuccess(success || "");
        form.reset();
      } catch {
        setSuccess("");
        setError("Algo deu errado.");
        form.reset();
      }
    });
  };

  return (
    <div className="lg:grid lg:grid-cols-2 items-center justify-center">
      <div>
        <CardWrapper
          headerLabel="Digite uma nova senha"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          {...field}
                          disabled={isPending}
                          type="password"
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
                Redefinir senha
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
