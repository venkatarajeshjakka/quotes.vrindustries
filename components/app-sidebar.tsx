"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  Building,
  Users,
  CreditCard,
  Home,
  Plus,
  Settings,
  Command,
} from "lucide-react";
import Link from "next/link";
import { NavUser } from "@/components/nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };
  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Quotations",
      url: "/quotation",
      icon: Plus,
    },
    {
      title: "Organizations",
      url: "/organization",
      icon: Building,
    },
    {
      title: "Clients",
      url: "/client",
      icon: Users,
    },
    {
      title: "Bank Details",
      url: "/bank-details",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];
  return (
    <Sidebar className="bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-blue-950 dark:via-muted dark:to-blue-950 border-r border-blue-100 dark:border-blue-900 shadow-xl min-h-screen">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex aspect-square size-10 items-center justify-center rounded-xl shadow-md">
                  <Command className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-base leading-tight ml-3">
                  <span className="truncate font-bold tracking-wide text-blue-900 dark:text-blue-100">
                    Acme Inc
                  </span>
                  <span className="truncate text-xs text-blue-500 dark:text-blue-300">
                    Enterprise
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wider mb-2">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-100/70 dark:hover:bg-blue-900/30 hover:shadow-md"
                    >
                      <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium text-blue-900 dark:text-blue-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 tracking-wide">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-3">
          <NavUser user={data} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
