"use server";

import { cookies } from "next/headers";
import { registerSchema } from "@/lib/validators/auth/register";
import bcrypt from "bcryptjs";

export async function registerAction(formData: any) {
  const parsed = registerSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  const hashed = await bcrypt.hash(password, 10);

  const user = { name, email, password: hashed };

  cookies().set("temp-user", JSON.stringify(user), {
    maxAge: 60 * 10,
    path: "/",
  });

  return { success: true };
}
