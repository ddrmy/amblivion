export type Role = "admin" | "user" | "customer";

export const ROLE_REDIRECT: Record<Role, string> = {
  admin: "/admin",
  user: "/dashboard",
  customer: "/customer",
};
