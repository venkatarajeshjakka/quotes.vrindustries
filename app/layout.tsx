import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ClientProvider } from "@/contexts/client-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full">
        <ClientProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 w-full min-h-screen">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
