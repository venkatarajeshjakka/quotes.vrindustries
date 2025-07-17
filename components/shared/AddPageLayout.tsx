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
    <div className="min-h-screen flex flex-col items-center py-8 px-2 md:px-0 bg-gradient-to-br from-background to-accent/5">
      <div className="w-full max-w-3xl self-start">
        <BreadcrumbWithCustomSeperator
          prePageHref={prePageHref}
          prePageText={prePageText}
          currentPage={currentPage}
        />
      </div>
      <div className="w-full max-w-3xl mt-2">
        {children}
      </div>
    </div>
  );
}