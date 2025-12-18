import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Users, Settings } from "lucide-react";
import Link from "next/link";

type Role = "admin" | "user";

const menuByRole: Record<Role, { title: string; url: string; icon: any }[]> = {
  user: [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Pedidos", url: "/pedidos", icon: Settings },
  ],
  admin: [
    { title: "Dashboard", url: "/admin", icon: Home },
    { title: "Usuários", url: "/admin/usuarios", icon: Users },
  ],
};

export function AppSidebar({ role }: { role: Role }) {
  const items = menuByRole[role];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {role === "admin" ? "Admin" : "Aplicação"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
