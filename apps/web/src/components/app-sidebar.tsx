"use client";

import { LayoutDashboardIcon, UserIcon } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    first_name: "Yadnesh",
    last_name: "Narawade",
    email: "yadnesh@gmail.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: <UserIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <span className="flex size-7 items-end justify-center gap-0.75 rounded-md bg-primary px-1.5 pb-2">
                  <span className="h-1.5 w-0.75 rounded-full bg-primary-foreground/80" />
                  <span className="h-2.5 w-0.75 rounded-full bg-primary-foreground" />
                  <span className="h-1 w-0.75 rounded-full bg-primary-foreground/60" />
                </span>
                <div className="grid flex-1 text-left text-lg leading-tight">
                  <span className="truncate  font-heading">Cadence</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
