import { AppSidebar } from "@/common/components/layout/app-sidebar";
import { Avatar } from "@repo/ui/components/ui/avatar";
import { ModeToggle } from "@repo/ui/components/ui/mode-toggle";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@repo/ui/components/ui/sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* <header className=" flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <ModeToggle/>
        </header> */}
        <header className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between border-b border-[#1A1D21]">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Image
              src="/assets/images/logo.png"
              alt="wellConsult logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              wellConsult
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <ModeToggle />
            <Avatar
              initials="JD"
              className="bg-primary text-foreground"
              size="sm"
            />
            <span className="text-sm sm:text-base font-medium">You</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-4 gap-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
