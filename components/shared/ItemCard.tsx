"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { ReactNode } from "react";

interface ItemCardProps {
  id: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  onEdit: () => void;
  onDelete: () => void;
  children: ReactNode;
  className?: string;
}

export function ItemCard({
  id,
  icon,
  title,
  subtitle,
  onEdit,
  onDelete,
  children,
  className = "",
}: ItemCardProps) {
  return (
    <Card
      key={id}
      className={`hover:shadow-2xl transition-shadow border border-border bg-card rounded-2xl overflow-hidden relative ${className}`}
    >
      <CardContent className="p-8">
        {/* Action buttons absolutely positioned at top-right */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
          <Button
            variant="outline"
            size="sm"
            className="border-primary/20 text-primary hover:bg-primary/10 hover:text-primary font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center"
            onClick={onEdit}
          >
            <Edit className="w-4 h-4 mr-1" />
            <span className="hidden md:inline">Edit</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="border-destructive/20 text-destructive hover:text-destructive-foreground hover:bg-destructive hover:border-destructive font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between md:items-center">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-4 mb-5">
              <div className="bg-gradient-to-br from-primary to-primary/70 p-3 rounded-xl shadow-md">
                {icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground tracking-tight mb-1">
                  {title}
                </h3>
                {subtitle && (
                  <span className="inline-block text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-medium">
                    {subtitle}
                  </span>
                )}
              </div>
            </div>
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}