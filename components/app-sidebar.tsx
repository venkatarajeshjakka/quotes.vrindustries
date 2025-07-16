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
import { usePathname } from "next/navigation";
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
      icon: Plus, // Plus for new quotation or list
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
  const pathname = usePathname();
  return (
    <Sidebar className="bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-r border-border shadow-xl min-h-screen">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex aspect-square size-10 items-center justify-center rounded-xl shadow-md">
                  <Command className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-base leading-tight ml-3">
                  <span className="truncate font-bold tracking-wide text-foreground">
                    VR Industries
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
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
          <SidebarGroupLabel className="uppercase text-xs font-semibold text-muted-foreground tracking-wider mb-2">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                // Match exact or subpath for active state (e.g., /client, /client/add)
                const isActive =
                  pathname === item.url ||
                  (item.url !== "/" && pathname.startsWith(item.url + "/"));
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out
                          relative overflow-hidden
                          ${isActive
                            ? "bg-primary/10 text-primary shadow-lg scale-105 border border-primary/20 font-bold"
                            : "hover:bg-accent/50 hover:text-accent-foreground hover:shadow-md text-muted-foreground"
                          }
                        `}
                      >
                        <span
                          className={`absolute left-0 top-0 h-full w-1 bg-primary rounded-r transition-all duration-500 ease-in-out
                            ${isActive
                              ? "opacity-100 scale-y-100"
                              : "opacity-0 scale-y-0"
                            }
                          `}
                          aria-hidden="true"
                        />
                        <item.icon
                          className={`w-5 h-5 transition-transform duration-300 ease-in-out
                          ${isActive
                              ? "text-primary scale-110"
                              : "group-hover:scale-110 group-hover:text-foreground"
                            }
                        `}
                        />
                        <span
                          className={`font-semibold tracking-wide transition-colors duration-300 ease-in-out
                            ${isActive
                              ? "text-primary"
                              : "group-hover:text-foreground"
                            }
                          `}
                        >
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
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
