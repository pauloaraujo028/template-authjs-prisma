"use client";

import { login } from "@/actions/auth/login";
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
import { loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
// import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthFormMessage from "./auth-form-message";

export const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  // const searchParams = useSearchParams();
  // const callbackError = searchParams
  //   ? searchParams.get("error") === "OAuthAccountNotLinked"
  //     ? "E-mail em uso com provedor diferente"
  //     : undefined
  //   : undefined;

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      try {
        const resp = await login(values);

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
          headerLabel="Bem vindo de volta"
          backButtonLabel="Cadastre-se"
          text="Não tem uma conta?"
          backButtonHref="/auth/register"
          showSocial
          classNames="lg:rounded-r-none"
          title="Login"
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
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
                Entrar
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
