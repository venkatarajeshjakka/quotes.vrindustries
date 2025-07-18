"use client";

import { ReactNode } from "react";
import { BreadcrumbWIthSeparator } from "@/components/bread-crumb";
import { PageHeader } from "@/components/page-header";
import { PageSearch } from "@/components/page-search";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

interface ListPageLayoutProps<T> {
  title: string;
  description: string;
  addText: string;
  addHref: string;
  items: T[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterItems: (items: T[], searchTerm: string) => T[];
  renderItem: (item: T) => ReactNode;
  emptyStateIcon: ReactNode;
  emptyStateTitle: string;
  emptyStateDescription: string;
  showAddButton?: boolean;
  children?: ReactNode;
}

export function ListPageLayout<T>({
  title,
  description,
  addText,
  addHref,
  items,
  searchTerm,
  onSearchChange,
  filterItems,
  renderItem,
  emptyStateIcon,
  emptyStateTitle,
  emptyStateDescription,
  showAddButton = true,
  children,
}: ListPageLayoutProps<T>) {
  const filteredItems = filterItems(items, searchTerm);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.accent.DEFAULT/0.15)_1px,_transparent_0)] [background-size:20px_20px] pointer-events-none" />
      
      <div className="relative flex flex-col min-h-screen w-full p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          <BreadcrumbWIthSeparator title={title} />
          
          <PageHeader
            title={title}
            description={description}
            addText={addText}
            addHref={addHref}
          />
          
          <main className="flex-1 space-y-8">
            <div className="w-full max-w-2xl mx-auto">
              <PageSearch searchTerm={searchTerm} setSearchTerm={onSearchChange} />
            </div>

            <div className="space-y-6">
              {filteredItems.length === 0 ? (
                <Card className="mx-auto max-w-2xl border-0 shadow-2xl bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm">
                  <CardContent className="text-center py-20 px-8">
                    <div className="relative mb-8">
                      <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-primary/10">
                        {emptyStateIcon}
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-accent to-accent/80 rounded-full opacity-60" />
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-primary/40 to-primary/20 rounded-full" />
                    </div>
                    
                    <div className="space-y-4 mb-10">
                      <h3 className="text-3xl font-bold text-foreground tracking-tight">
                        {emptyStateTitle}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                        {emptyStateDescription}
                      </p>
                    </div>
                    
                    {items.length === 0 && showAddButton && (
                      <Button
                        onClick={() => (window.location.href = addHref)}
                        size="lg"
                        className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg group"
                      >
                        <div className="flex items-center gap-3">
                          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                          <span>{addText}</span>
                          <Sparkles className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 auto-rows-fr">
                  {filteredItems.map(renderItem)}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      {children}
    </div>
  );
}