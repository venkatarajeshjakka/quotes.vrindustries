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
    <div className={`flex items-center gap-2 ${className}`}>
      {icon}
      {label && (
        <span className="font-medium text-muted-foreground">
          {label}:
        </span>
      )}
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}

export function ItemDetails({ children, className = "" }: ItemDetailsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 text-base ${className}`}>
      {children}
    </div>
  );
}