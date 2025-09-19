import * as React from "react";

import Logo from "@/assets/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/hooks/redux";
import { adminDashboardRoutes } from "@/routes/admin.route";
import { senderDashboardRoutes } from "@/routes/sender.route";
import type { IDashboard } from "@/types";
import { Link } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector((state) => state.auth.user);
  let navMain: IDashboard[] = [];
  switch (user?.role) {
    case "ADMIN":
      navMain = adminDashboardRoutes;
      break;
    case "SENDER":
      navMain = senderDashboardRoutes;
      break;

    default:
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          to={"/"}
          className="mt-4 flex items-center gap-2 text-primary font-bold text-2xl"
        >
          <Logo /> PDSystem
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:text-primary active:text-primary"
                  >
                    <Link to={item.url}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
