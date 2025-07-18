"use client";

import { ReactNode } from "react";

interface ItemDetailProps {
  icon?: ReactNode;
  label?: string;
  value: string;
  className?: string;
}

interface ItemDetailsProps {
  children: ReactNode;
  className?: string;
}

export function ItemDetail({ icon, label, value, className = "" }: ItemDetailProps) {
  return (
    <div className={`group flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-accent/5 to-transparent hover:from-accent/10 hover:to-accent/5 transition-all duration-200 border border-transparent hover:border-border/50 ${className}`}>
      {icon && (
        <div className="flex-shrink-0 mt-0.5 text-primary/70 group-hover:text-primary transition-colors duration-200">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {label && (
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {label}
          </div>
        )}
        <div className="text-foreground font-medium leading-relaxed break-words">
          {value}
        </div>
      </div>
    </div>
  );
}

export function ItemDetails({ children, className = "" }: ItemDetailsProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 ${className}`}>
      {children}
    </div>
  );
}