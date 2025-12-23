import { getUserProfile } from "@/lib/auth/get-user-profile";
import { ROLE_REDIRECT } from "@/lib/auth/roles";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const profile = await getUserProfile();

  if (!profile) redirect("/sign-in");

  if (profile.role.name !== "admin") {
    redirect(ROLE_REDIRECT[profile.role.name]);
  }

  return <>{children}</>;
}
