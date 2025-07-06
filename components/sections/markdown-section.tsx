"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import { Eye, Pencil, RefreshCw, Sparkles } from "lucide-react";
import { AIEnhancementCard } from "../ai-enhancement-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface MarkdownSectionProps {
  title: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  placeholder: string;
  prompt: string;
  onChange: (value: string) => void;
}

export function MarkdownSection({
  title,
  icon,
  label,
  value,
  placeholder,
  prompt,
  onChange,
}: MarkdownSectionProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedContent, setEnhancedContent] = useState("");
  const [showEnhancement, setShowEnhancement] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const enhanceContent = async () => {
    setIsEnhancing(true);
    setShowEnhancement(true);
    try {
      const response = await fetch("/api/gemini-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });
      const data = await response.json();
      if (response.ok) {
        setEnhancedContent(data.output);
      }
    } catch (error) {
      console.warn("AI enhancement failed, using fallback:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const acceptEnhancedContent = () => {
    onChange(enhancedContent);
    setShowEnhancement(false);
    setEnhancedContent("");
  };
  const rejectEnhancement = () => {
    setShowEnhancement(false);
    setEnhancedContent("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium">{label}</label>
            <Button
              onClick={enhanceContent}
              disabled={isEnhancing}
              variant="outline"
              size="sm"
            >
              {isEnhancing ? (
                <RefreshCw className="w-3 h-3 animate-spin mr-1" />
              ) : (
                <Sparkles className="w-3 h-3 mr-1" />
              )}
              Enhance with AI
            </Button>
            <Button
              onClick={() => setIsEditing((v) => !v)}
              variant="ghost"
              size="sm"
              className="ml-auto"
              aria-label={isEditing ? "Preview" : "Edit"}
            >
              {isEditing ? (
                <Eye className="w-4 h-4" />
              ) : (
                <Pencil className="w-4 h-4" />
              )}
            </Button>
          </div>
          {isEditing ? (
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={8}
            />
          ) : (
            <div className="mt-2 bg-white/90 dark:bg-muted/30 rounded-lg p-4 border border-green-200 text-base prose prose-blue prose-li:my-1 prose-strong:text-blue-700 prose-strong:font-semibold max-w-none min-h-[120px] shadow-sm">
              <ReactMarkdown>
                {value || `_No ${label.toLowerCase()} provided yet._`}
              </ReactMarkdown>
            </div>
          )}
        </div>
        {showEnhancement && (
          <AIEnhancementCard
            title={title}
            originalContent={value}
            enhancedContent={enhancedContent}
            isLoading={isEnhancing}
            onAccept={acceptEnhancedContent}
            onReject={rejectEnhancement}
            onRegenerate={enhanceContent}
          />
        )}
      </CardContent>
    </Card>
  );
}
