import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  addText: string;
  addHref: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  addText,
  addHref,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn(
      "relative w-full overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card/98 to-card/95 backdrop-blur-sm  transition-all duration-500 mb-6 sm:mb-8",
      className
    )}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/8 opacity-60" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-2xl opacity-25" />

      {/* Subtle border gradient */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent opacity-50">
        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-card via-card/98 to-card/95" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
          {/* Content Section */}
          <div className="flex-1 space-y-4 sm:space-y-5">
            {/* Title with gradient effect */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
                {title}
              </h1>
              {/* Decorative underline */}
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
            </div>

            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed font-medium">
              {description}
            </p>

            {/* Additional info section for mobile */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground lg:hidden">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Get started by creating your first item</span>
            </div>
          </div>

          {/* Action Button Section */}
          <div className="flex-shrink-0">
            <Link
              href={addHref}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-base sm:text-lg whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background overflow-hidden"
            >
              {/* Button background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <Plus className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 group-hover:scale-110 transition-all duration-300 relative z-10" />
              <span className="relative z-10">{addText}</span>

              {/* Shine effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500" />
            </Link>
          </div>
        </div>


      </div>
    </header>
  );
}
