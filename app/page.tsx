import { getUserProfile } from "@/lib/auth/get-user-profile";
import { ROLE_REDIRECT } from "@/lib/auth/roles";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await getUserProfile();

  if (!profile) redirect("/sign-in");

  redirect(ROLE_REDIRECT[profile.role.name]);
}
