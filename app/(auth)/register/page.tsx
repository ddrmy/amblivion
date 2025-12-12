"use client";

import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RiCheckboxCircleFill, RiSpam3Fill } from "@remixicon/react";
import { toast } from "sonner";
import { z } from "zod";

import { signup } from "../register/actions";

// ZOD SCHEMA
const registerSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter ao menos um número")
      .regex(
        /[^A-Za-z0-9]/,
        "A senha deve conter ao menos um caractere especial"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterForm(data: {
  email: string;
  password: string;
}) {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  // Observa os campos em tempo real
  const password = form.watch("password") || "";
  const confirmPassword = form.watch("confirmPassword") || "";

  // Checks
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    match: password === confirmPassword && password.length > 0,
  };

  const FormSchema = z.object();

  const onSubmit = async (values: RegisterSchema) => {
    try {
      // 1 — Envia pro server action
      const result = await signup({
        email: values.email,
        password: values.password,
      });

      // 2 — Erro vindo do supabase
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

      // 3 — Sucesso
      toast.custom((t) => (
        <Alert variant="mono" icon="success" onClose={() => toast.dismiss(t)}>
          <AlertIcon>
            <RiCheckboxCircleFill />
          </AlertIcon>
          <AlertTitle>Conta criada com sucesso!</AlertTitle>
        </Alert>
      ));
    } catch (err) {
      // 4 — Erro inesperado no client (raro)
      toast.error("Erro inesperado. Tente novamente.");
    }
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address:</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Senha */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Confirmação de senha */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Repetir a senha"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* CHECKLIST */}
        <ul className="text-sm space-y-1 bg-neutral-50 p-4 rounded-lg border">
          <li>{checks.length ? "✔️" : "❌"} Mínimo de 8 caracteres</li>
          <li>{checks.upper ? "✔️" : "❌"} Pelo menos 1 letra maiúscula</li>
          <li>{checks.lower ? "✔️" : "❌"} Pelo menos 1 letra minúscula</li>
          <li>{checks.number ? "✔️" : "❌"} Pelo menos 1 número</li>
          <li>
            {checks.special ? "✔️" : "❌"} Pelo menos 1 caractere especial
            (!@#$%)
          </li>
          <li>{checks.match ? "✔️" : "❌"} As senhas coincidem</li>
        </ul>
        <div className="flex items-center justify-end gap-2.5">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
