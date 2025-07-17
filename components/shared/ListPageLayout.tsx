"use client";

import { ReactNode, useState } from "react";
import { BreadcrumbWIthSeparator } from "@/components/bread-crumb";
import { PageHeader } from "@/components/page-header";
import { PageSearch } from "@/components/page-search";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
    <div className="flex flex-col min-h-screen w-full p-8 bg-gradient-to-br from-background to-accent/5">
      <BreadcrumbWIthSeparator title={title} />
      <PageHeader
        title={title}
        description={description}
        addText={addText}
        addHref={addHref}
      />
      <main className="flex-1 mt-8">
        <PageSearch searchTerm={searchTerm} setSearchTerm={onSearchChange} />

        <div className="grid gap-6">
          {filteredItems.length === 0 ? (
            <Card className="mx-auto max-w-xl shadow-xl border border-border bg-card">
              <CardContent className="text-center py-16 flex flex-col items-center">
                <div className="bg-gradient-to-br from-accent/30 to-accent/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md">
                  {emptyStateIcon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                  {emptyStateTitle}
                </h3>
                <p className="text-muted-foreground mb-8 text-base max-w-md mx-auto">
                  {emptyStateDescription}
                </p>
                {items.length === 0 && showAddButton && (
                  <Button
                    onClick={() => (window.location.href = addHref)}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full shadow-lg transition-all duration-200"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    {addText}
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredItems.map(renderItem)
          )}
        </div>
      </main>
      {children}
    </div>
  );
}