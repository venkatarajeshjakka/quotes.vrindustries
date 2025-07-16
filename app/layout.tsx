import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ClientProvider } from "@/contexts/client-context";
import { BankProvider } from "@/contexts/bank-context";
import { OrganizationProvider } from "@/contexts/organization-context";
import { QuotationProvider } from "@/contexts/quotation-context";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-screen" suppressHydrationWarning>
      <body className="flex min-h-screen w-full bg-background text-foreground">
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        <ClientProvider>
          <BankProvider>
            <OrganizationProvider>
              <QuotationProvider>
                <SidebarProvider>
                  <AppSidebar />
                  <div className="flex flex-col flex-1">
                    <Header />
                    <main
                      className="flex-1 w-full bg-card px-4 py-6 md:px-8 md:py-10 transition-colors duration-200 overflow-x-auto shadow-inner border-l border-border"
                      tabIndex={-1}
                    >
                      <SidebarTrigger />
                      {children}
                      <Toaster position="top-right" richColors closeButton />
                    </main>
                    <Footer />
                  </div>
                </SidebarProvider>
              </QuotationProvider>
            </OrganizationProvider>
          </BankProvider>
        </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
