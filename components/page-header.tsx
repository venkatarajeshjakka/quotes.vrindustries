import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export function PageHeader({
  title,
  description,
  addText,
  addHref,
}: {
  title: string;
  description: string;
  addText: string;
  addHref: string;
}) {
  return (
    <header className="w-full bg-gradient-to-r from-accent/10 via-background to-accent/5 rounded-2xl shadow-sm border border-border backdrop-blur-sm px-6 py-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4">
      <div className="flex flex-col gap-3 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex-shrink-0">
        <Link
          href={addHref}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 font-semibold text-base whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        >
          <Plus className="w-5 h-5" />
          {addText}
        </Link>
      </div>
    </header>
  );
}
