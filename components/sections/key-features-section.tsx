"use client";

import { useState } from "react";
import { useQuotation } from "@/contexts/quotation-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, Check, Star } from "lucide-react";
import { AIEnhancementCard } from "../ai-enhancement-card";

export default function KeyFeaturesSection() {
  const { state, dispatch } = useQuotation();
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedContent, setEnhancedContent] = useState("");
  const [showEnhancement, setShowEnhancement] = useState(false);

  const context = `Client: ${
    state.quotation.client?.company || "Not specified"
  }, Products: ${state.quotation.products.length} items`;

  const PROMPT = `You are an expert in creating compelling key features and benefits for business quotations. Your task is to enhance the key features section of a quotation to make it more professional and impactful. Input: "${state.quotation.keyFeatures}"${context} ${state.quotation.subject}. Provide only one enhanced key features section that is concise, clear, and relevant to the quotation's content.`;

  const rejectEnhancement = () => {
    setShowEnhancement(false);
    setEnhancedContent("");
  };

  const handleContentChange = (value: string) => {
    dispatch({ type: "UPDATE_QUOTATION", payload: { keyFeatures: value } });
  };

  const enhanceContent = async () => {
    setIsEnhancing(true);
    setShowEnhancement(true);
    try {
      const response = await fetch("/api/gemini-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: PROMPT }),
      });

      // Waits for the response to be converted to JSON format and stores it in the data variable
      const data = await response.json();
      //  If successful, updates the output state with the output field from the response data
      if (response.ok) {
        setEnhancedContent(data.output);
      } else {
      }
    } catch (error) {
      console.warn("AI enhancement failed, using fallback:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const acceptEnhancedContent = () => {
    handleContentChange(enhancedContent);
    setShowEnhancement(false);
    setEnhancedContent("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          Key Features
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium">
              Product Features & Benefits
            </label>
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
          </div>
          <Textarea
            value={state.quotation.keyFeatures}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Enter key features, benefits, unique selling points..."
            rows={8}
          />
        </div>
        {showEnhancement && (
          <AIEnhancementCard
            title="Subject Line"
            originalContent={state.quotation.subject}
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
