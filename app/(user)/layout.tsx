import { getUserProfile } from "@/lib/auth/get-user-profile";
import { ROLE_REDIRECT } from "@/lib/auth/roles";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const profile = await getUserProfile();

  if (!profile) redirect("/sign-in");

  // customer NÃO entra no dashboard interno
  if (profile.role.name !== "user") {
    redirect(ROLE_REDIRECT[profile.role.name]);
  }

  return <>{children}</>;
}
