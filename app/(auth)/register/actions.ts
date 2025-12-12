"use server";

import { createClient } from "@/lib/supabase/server";

export async function signup(data: { email: string; password: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
