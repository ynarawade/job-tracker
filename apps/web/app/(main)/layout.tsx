import { AppSidebar } from "@/components/app-sidebar";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
          <div className="flex justify-between items-center w-full px-4">
            <div className="flex items-center gap-2 ">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <AppBreadcrumb />
            </div>
            <ThemeModeToggle />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
