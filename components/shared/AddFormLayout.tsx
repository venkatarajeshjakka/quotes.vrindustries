"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface AddFormLayoutProps {
  className?: string;
  icon: ReactNode;
  title: string;
  description: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitText: string;
  children: ReactNode;
  isSubmitting?: boolean;
}

export function AddFormLayout({
  className,
  icon,
  title,
  description,
  onSubmit,
  onCancel,
  submitText,
  children,
  isSubmitting = false,
  ...props
}: AddFormLayoutProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="rounded-2xl shadow-lg border border-border bg-card">
        <CardContent className="py-8 px-4 md:px-10">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-primary to-primary/70 w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-3">
              {icon}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-1">
              {title}
            </h2>
            <p className="text-muted-foreground text-center max-w-md">
              {description}
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              {children}
              <div className="flex justify-end gap-4 pt-6 border-t border-border mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-full font-semibold transition-all"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2 rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:bg-primary/90 transition-all"
                >
                  {isSubmitting ? "Adding..." : submitText}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}