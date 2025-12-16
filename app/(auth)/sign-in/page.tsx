"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RiSpam3Fill } from "@remixicon/react";

import { signInWithPassword } from "../sign-in/actions";

const loginFormSchema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z.string(),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function SignIn() {
  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormSchema) => {
    try {
      const result = await signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (!result.success) {
        toast.custom((t) => (
          <Alert
            variant="mono"
            icon="destructive"
            onClose={() => toast.dismiss(t)}
          >
            <AlertIcon>
              <RiSpam3Fill />
            </AlertIcon>
            <AlertTitle>{`Erro: ${result.error}`}</AlertTitle>
          </Alert>
        ));
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      toast.error("Erro inesperado ao fazer login");
    }
  };

  return (
    <div className="h-72 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold">Bem vindo ao Amblivion</h1>
        <h1 className="text-2xl font-bold">Faça seu Login para entrar</h1>
        <p className="text-muted-foreground text-sm">Entre para continuar</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" {...field} />
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
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-4 justify-between">
            <Button
              type="submit"
              className="bg-[#5E81F4] text-white font-bold hover:bg-[#475EAA] w-42 h-10"
            >
              Entrar
            </Button>

            <Button
              type="button"
              variant="outline"
              className="bg-[#8181A5]/10 text-[#5E81F4] font-bold hover:bg-[#475EAA] hover:text-white w-42 h-10"
              onClick={() => router.push("/register")}
            >
              Cadastre-se
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
