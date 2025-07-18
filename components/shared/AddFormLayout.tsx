"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Loader2, Sparkles } from "lucide-react";

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
      <Card className="rounded-3xl shadow-2xl border-0 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm overflow-hidden">
        {/* Decorative header gradient */}
        <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
        
        <CardContent className="py-12 px-6 md:px-12">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative mb-6">
              <div className="bg-gradient-to-br from-primary via-primary to-primary/80 w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/25">
                {icon}
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-3xl blur-2xl opacity-50" />
              {/* Decorative dots */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-accent to-accent/80 rounded-full" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-primary/40 to-primary/20 rounded-full" />
            </div>
            
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                {title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                {description}
              </p>
            </div>
          </div>
          
          {/* Form Section */}
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="space-y-6">
              {children}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-border/50">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-8 py-3 rounded-2xl font-semibold transition-all duration-200 hover:bg-accent/50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-2">
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  )}
                  <span>{isSubmitting ? "Adding..." : submitText}</span>
                </div>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}