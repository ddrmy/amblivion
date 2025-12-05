"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolver/zod";
import { z } from "zod";
import { useState } from "react";

const schema = z
  .object({
    name: z.string().min(2, { message: "Name should have at least 2 letters" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Senha precisa ter no mínimo 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default async function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // React Hook Form + Zod

  // Função que roda ao clicar em criar conta

  const handleRegister = () => {
    // primeiro limpa mensagens antigas
    setError("");
    setSuccess("");

    // Valida o formulário
    const validation = form.validate();
    if (validation.hasErrors) {
      return; // para aqui se tiver erro
    }

    const { name, email, password } = form.values;

    // Verifica se já existe alguém com esse e-mail

    const userExist = localStorage.getItem(email);
    if (userExist) {
      setError("Esse e-mail já está cadastrado!");
      return;
    }

    // Salva o usuário no localStorage
    const newUser = {
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(email, JSON.stringify(newUser));

    setSuccess("Conta criada com sucesso! Redirecionando para login... ");

    // Depois de 2 segundos vai para a tela de login
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="h-86 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold">Bem vindo ao Amblivion</h1>
        <h1 className="text-2xl font-bold">Registre-se para começar</h1>
        <p className="text-muted-foreground text-sm">
          Insira os seus dados para se cadastrar
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input type="name" placeholder="Nome" />
        <Input type="email" placeholder="user@hotmail.com" />
        <Input type="password" placeholder="***************" />
        <Input type="confirmPassword" placeholder="***************" />
      </div>
      <div className="flex flex-row gap-4 justify-between">
        <Button
          variant="outline"
          className="bg-[#5E81F4] text-white font-bold hover:bg-[#475EAA] hover:text-white w-42 h-10"
        >
          Criar Conta
        </Button>
        <Button
          variant="outline"
          className="bg-[#8181A5]/10 text-[#5E81F4] font-bold hover:bg-[#475EAA] hover:text-white w-42 h-10"
          onClick={() => router.push("/login")}
        >
          Já possui uma conta?
        </Button>
      </div>
    </div>
  );
}
