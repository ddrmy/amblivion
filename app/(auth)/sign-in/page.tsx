"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const loginFormSchema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export default function SignIn() {
  const router = useRouter();

  type LoginFormSchema = z.infer<typeof loginFormSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(dataLogin: LoginFormSchema) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: dataLogin.email,
      password: dataLogin.password,
    });

    if (error!) {
      toast.success("Login efetuado com sucesso!");
      router.push("/dashboard");
      return;
    }

    toast.warning("Erro ao efetuar login.", {
      description: errors.password?.message,
    });

    console.log("DATA LOGIN:", data);
  }

  return (
    <div className="h-72 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold">Bem vindo ao Amblivion</h1>
        <h1 className="text-2xl font-bold">Faça seu Login para entrar</h1>
        <p className="text-muted-foreground text-sm">Entre para continuar</p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="user@hotmail.com"
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="***************"
          {...register("password")}
        />
      </div>
      <div className="flex flex-row gap-4 justify-between">
        <Button
          variant="outline"
          className="bg-[#5E81F4] text-white font-bold hover:bg-[#475EAA] hover:text-white w-42 h-10"
          onClick={handleSubmit(onSubmit)}
        >
          Entrar
        </Button>
        <Button
          variant="outline"
          className="bg-[#8181A5]/10 text-[#5E81F4] font-bold hover:bg-[#475EAA] hover:text-white w-42 h-10"
          onClick={() => router.push("/register")}
        >
          Cadastre-se
        </Button>
      </div>
    </div>
  );
}
