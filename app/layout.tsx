import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ClientProvider } from "@/contexts/client-context";
import { BankProvider } from "@/contexts/bank-context";
import { OrganizationProvider } from "@/contexts/organization-context";
import { QuotationProvider } from "@/contexts/quotation-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-screen">
      <body className="flex min-h-screen w-full bg-background text-foreground">
        <ClientProvider>
          <BankProvider>
            <OrganizationProvider>
              <QuotationProvider>
                <SidebarProvider>
                  <AppSidebar />
                  <main
                    className="flex-1 w-full min-h-screen bg-card px-4 py-6 md:px-8 md:py-10 transition-colors duration-200 overflow-x-auto shadow-inner border-l border-border"
                    tabIndex={-1}
                  >
                    <SidebarTrigger />
                    {children}
                  </main>
                </SidebarProvider>
              </QuotationProvider>
            </OrganizationProvider>
          </BankProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
