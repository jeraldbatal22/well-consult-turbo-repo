"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, ShoppingBag, User } from "lucide-react";

import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/ui/sidebar";

const menuItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Calendar,
  },
  {
    title: "Shop",
    url: "/shop",
    icon: ShoppingBag,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      side="left"
      className=""
    >
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={32}
            height={32}
          />
          <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">
            wellConsult
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.url || pathname?.startsWith(item.url + "/");

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className=" h-12"
                    >
                      <Link href={item.url}>
                        <Icon className=" h-5! w-5!" />
                        <span className="text-[16px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
