import { createClient } from "@/lib/supabase/server";

type ProfileWithRole = {
  role: {
    name: "admin" | "user";
  } | null;
};

export async function getUserRole(): Promise<"admin" | "user"> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("[getUserRole] user:", user?.id);

  if (!user) return "user";

  const { data } = await supabase
    .from("profiles")
    .select("role:roles(name)")
    .eq("id", user.id)
    .single<ProfileWithRole>();

  return data?.role?.name ?? "user";
}
