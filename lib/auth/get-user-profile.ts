import { createClient } from "@/lib/supabase/server";

export type UserProfile = {
  id: string;
  first_name: string | null;
  last_name?: string | null;
  role: {
    name: "admin" | "user";
  }[];
};

export async function getUserProfile(): Promise<UserProfile | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      first_name,
      last_name,
      role:roles (
        name
      )
      `
    )
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("getUserProfile error:", error);
    return null;
  }
  console.log("RAW DATA:", JSON.stringify(data, null, 2));

  return data;
}
