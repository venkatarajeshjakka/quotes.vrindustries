"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Check, X, RefreshCw, Sparkles, Wand2, ArrowRight, Zap, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

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
  const [showComparison, setShowComparison] = useState(true);

  if (isLoading) {
    return (
      <Card className={cn("group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm shadow-xl", className)}>
        {/* Animated background for loading */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-pulse opacity-50" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-30 animate-pulse" />

        <CardContent className="relative p-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-3 rounded-2xl">
                <Wand2 className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent rounded-2xl blur-xl opacity-50 animate-pulse" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary animate-spin" />
                <span className="text-lg font-bold text-foreground">
                  AI is enhancing your {title.toLowerCase()}...
                </span>
              </div>
              <div className="space-y-2">
                <div className="w-full bg-gradient-to-r from-primary/20 to-primary/10 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full animate-pulse transition-all duration-1000" style={{ width: "75%" }} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Analyzing content and generating improvements...
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300", className)}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-primary/5 opacity-50" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-2xl opacity-20" />

      <CardContent className="relative p-8 space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-green-500/20 via-green-400/10 to-transparent p-3 rounded-2xl">
              <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                AI Enhanced {title}
                <Badge className="bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-700 dark:text-green-300 border-green-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  <Zap className="w-3 h-3 mr-1" />
                  Improved
                </Badge>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Review the AI-enhanced version and choose your preferred option
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={onAccept}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-4 py-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group"
            >
              <Check className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Accept
            </Button>
            <Button
              onClick={onRegenerate}
              variant="outline"
              className="border-2 border-border/50 hover:border-primary/30 px-4 py-2 rounded-2xl hover:bg-accent/50 transition-all duration-300 font-semibold group"
            >
              <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Regenerate
            </Button>
            <Button
              onClick={onReject}
              variant="outline"
              className="border-2 border-border/50 hover:border-destructive/30 px-4 py-2 rounded-2xl hover:bg-destructive/5 transition-all duration-300 font-semibold group"
            >
              <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Comparison Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-foreground">Content Comparison</span>
          </div>
          <Button
            onClick={() => setShowComparison(!showComparison)}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {showComparison ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Hide Comparison
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Show Comparison
              </>
            )}
          </Button>
        </div>

        {/* Content Comparison */}
        {showComparison && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Content */}
            <div className="space-y-3">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full"></div>
                Original Content
              </Label>
              <div className="bg-gradient-to-br from-accent/20 to-accent/10 p-6 rounded-2xl border border-border/30 shadow-sm">
                <div className="text-sm text-foreground prose prose-sm max-w-none leading-relaxed">
                  <ReactMarkdown>{originalContent}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Arrow Separator */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-3 rounded-full">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Enhanced Content */}
            <div className="space-y-3 lg:col-start-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-400 rounded-full animate-pulse"></div>
                AI Enhanced Content
              </Label>
              <div className="bg-gradient-to-br from-green-500/10 via-green-400/5 to-primary/5 p-6 rounded-2xl border border-green-500/20 shadow-sm">
                <div className="text-sm text-foreground prose prose-sm max-w-none leading-relaxed">
                  {isExpanded ? (
                    <ReactMarkdown>{enhancedContent}</ReactMarkdown>
                  ) : (
                    <ReactMarkdown>
                      {enhancedContent.slice(0, 300) + (enhancedContent.length > 300 ? "..." : "")}
                    </ReactMarkdown>
                  )}
                </div>
                {enhancedContent.length > 300 && (
                  <Button
                    onClick={() => setIsExpanded(!isExpanded)}
                    variant="ghost"
                    size="sm"
                    className="mt-4 h-auto p-0 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        Show more
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Content Only (when comparison is hidden) */}
        {!showComparison && (
          <div className="space-y-3">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-400 rounded-full animate-pulse"></div>
              AI Enhanced {title}
            </Label>
            <div className="bg-gradient-to-br from-green-500/10 via-green-400/5 to-primary/5 p-6 rounded-2xl border border-green-500/20 shadow-sm">
              <div className="text-base text-foreground prose prose-sm max-w-none leading-relaxed">
                {isExpanded ? (
                  <ReactMarkdown>{enhancedContent}</ReactMarkdown>
                ) : (
                  <ReactMarkdown>
                    {enhancedContent.slice(0, 400) + (enhancedContent.length > 400 ? "..." : "")}
                  </ReactMarkdown>
                )}
              </div>
              {enhancedContent.length > 400 && (
                <Button
                  onClick={() => setIsExpanded(!isExpanded)}
                  variant="ghost"
                  size="sm"
                  className="mt-4 h-auto p-0 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Show more
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Footer Tip */}
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-4 rounded-2xl border border-border/30">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">Pro Tip:</span>
            The AI has analyzed your content and made it more professional and engaging. You can regenerate for different variations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
