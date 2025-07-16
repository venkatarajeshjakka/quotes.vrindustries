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
    <header className="w-full bg-gradient-to-r from-accent/20 to-background rounded-2xl shadow-sm border px-6 py-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0 mt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-1">
          {title}
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          {description}
        </p>
      </div>
      <Link
        href={addHref}
        className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 font-semibold text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <Plus className="w-5 h-5 mr-1" />
        {addText}
      </Link>
    </header>
  );
}
