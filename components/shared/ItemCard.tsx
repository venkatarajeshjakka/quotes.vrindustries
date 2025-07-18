"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreVertical } from "lucide-react";
import { ReactNode, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      key={id}
      className={`group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative p-8">
        {/* Action Menu - Modern dropdown approach */}
        <div className="absolute top-6 right-6 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm transition-all duration-200 ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onDelete} 
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary via-primary to-primary/80 p-4 rounded-2xl shadow-lg shadow-primary/20">
                {icon}
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-bold text-foreground tracking-tight mb-2 leading-tight">
                {title}
              </h3>
              {subtitle && (
                <div className="inline-flex items-center">
                  <span className="inline-block text-sm bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-3 py-1 rounded-full font-medium shadow-sm">
                    {subtitle}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Content Section */}
          <div className="space-y-4">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}