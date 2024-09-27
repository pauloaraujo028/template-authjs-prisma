"use client";

import { register } from "@/actions/auth/register";
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
import { registerSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormMessageError } from "./form-message-error";

export const RegisterForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    startTransition(async () => {
      try {
        const { success, error } = await register(values);

        if (error) {
          setError(error);
        }

        setSuccess(success || "");
        form.reset();
      } catch (error) {
        setSuccess("");
        setError("Algo deu errado!");
        form.reset();
      }
    });
  };

  return (
    <div className="lg:grid lg:grid-cols-2 items-center justify-center">
      <Card className="relative w-[400px] h-full shadow-md rounded-r-none hidden bg-white lg:block">
        <h1 className="text-4xl font-bold text-center p-12">Logo Name</h1>
        <Image
          src="/stock.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="absolute bottom-0 object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </Card>
      <div>
        <CardWrapper
          headerLabel="Criar uma conta"
          backButtonLabel="Entrar"
          text="Já tem uma conta?"
          backButtonHref="/auth/login"
          classNames="lg:rounded-l-none"
          title="Registre-se"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome"
                          {...field}
                          disabled={isPending}
                          type="name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              {error && (
                <FormMessageError
                  type="error"
                  message={error}
                  title="Erro"
                  onClearMessage={() => setError("")}
                />
              )}
              {success && (
                <FormMessageError
                  type="success"
                  message={success}
                  title="Sucesso"
                  onClearMessage={() => setSuccess("")}
                />
              )}
              <Button type="submit" className="w-full" disabled={isPending}>
                <LoaderCircle
                  size={20}
                  className={!isPending ? "hidden" : "animate-spin mr-2"}
                />
                Criar uma conta
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};
