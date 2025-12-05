"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function TabsDemo() {
  const router = useRouter();

  return (
    <div className="h-72 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold">Bem vindo ao Amblivion</h1>
        <h1 className="text-2xl font-bold">Faça seu Login para entrar</h1>
        <p className="text-muted-foreground text-sm">Entre para continuar</p>
      </div>
      <div className="flex flex-col gap-4">
        <Input type="email" placeholder="user@hotmail.com" />
        <Input type="password" placeholder="***************" />
      </div>
      <div className="flex flex-row gap-4 justify-between">
        <Button
          variant="outline"
          className="bg-[#5E81F4] text-white font-bold hover:bg-[#475EAA] hover:text-white w-42 h-10"
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
