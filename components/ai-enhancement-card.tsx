"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Check, X, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIEnhancementCardProps {
  title: string;
  originalContent: string;
  enhancedContent: string;
  isLoading: boolean;
  onAccept: () => void;
  onReject: () => void;
  onRegenerate: () => void;
  className?: string;
}

export function AIEnhancementCard({
  title,
  originalContent,
  enhancedContent,
  isLoading,
  onAccept,
  onReject,
  onRegenerate,
  className,
}: AIEnhancementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return (
      <Card className={cn("border-blue-200 bg-blue-50/50", className)}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <LoadingSpinner size="sm" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Wand2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  AI is enhancing your {title.toLowerCase()}...
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full animate-pulse"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "border-green-200 bg-gradient-to-r from-green-50 to-blue-50",
        className
      )}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-900">
                AI Enhanced {title}
              </span>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 text-xs"
              >
                Improved
              </Badge>
            </div>
            <div className="flex gap-1">
              <Button
                onClick={onAccept}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="w-3 h-3 mr-1" />
                Accept
              </Button>
              <Button
                onClick={onRegenerate}
                size="sm"
                variant="outline"
                className="border-blue-200 hover:bg-blue-50"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Regenerate
              </Button>
              <Button
                onClick={onReject}
                size="sm"
                variant="outline"
                className="border-gray-200 hover:bg-gray-50"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-white/80 rounded-lg p-3 border border-green-200">
              <div className="text-sm text-gray-700">
                {isExpanded
                  ? enhancedContent
                  : `${enhancedContent.slice(0, 200)}${
                      enhancedContent.length > 200 ? "..." : ""
                    }`}
              </div>
              {enhancedContent.length > 200 && (
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-auto p-0 text-blue-600 hover:text-blue-700"
                >
                  {isExpanded ? "Show less" : "Show more"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
