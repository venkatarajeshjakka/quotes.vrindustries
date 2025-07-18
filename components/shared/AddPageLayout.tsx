"use client";

import { BreadcrumbWithCustomSeperator } from "@/components/bread-crumb-custom";
import { ReactNode } from "react";

interface AddPageLayoutProps {
  prePageHref: string;
  prePageText: string;
  currentPage: string;
  children: ReactNode;
}

export function AddPageLayout({
  prePageHref,
  prePageText,
  currentPage,
  children,
}: AddPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.accent.DEFAULT/0.1)_1px,_transparent_0)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl opacity-60" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl opacity-40" />
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl opacity-30" />
      
      <div className="relative flex flex-col items-center py-8 px-4 md:px-8">
        <div className="w-full max-w-4xl space-y-8">
          {/* Breadcrumb with enhanced styling */}
          <div className="w-full">
            <BreadcrumbWithCustomSeperator
              prePageHref={prePageHref}
              prePageText={prePageText}
              currentPage={currentPage}
            />
          </div>
          
          {/* Main content with enhanced container */}
          <div className="w-full max-w-3xl mx-auto">
            <div className="relative">
              {/* Subtle glow effect behind the form */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl blur-3xl opacity-50" />
              <div className="relative">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}