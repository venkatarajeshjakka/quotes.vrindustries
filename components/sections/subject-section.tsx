"use client";

import { useState } from "react";
import { useQuotation } from "@/contexts/quotation-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AIEnhancementCard } from "@/components/ai-enhancement-card";
import { Sparkles, Calendar, Clock, Lightbulb } from "lucide-react";

export default function SubjectSection() {
  const { state, dispatch } = useQuotation();
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedSubject, setEnhancedSubject] = useState("");
  const [showEnhancement, setShowEnhancement] = useState(false);

  const context = `Client: ${
    state.quotation.client?.company || "Not specified"
  }, Products: ${state.quotation.products.length} items`;

  const PROMPT = `You are an expert in creating compelling subject lines for business quotations. Your task is to enhance the subject line of a quotation to make it more professional and impactful. Input: "${state.quotation.subject}"${context}. Provide only one enhanced subject line that is concise, clear, and relevant to the quotation's content.`;

  const handleSubjectChange = (value: string) => {
    dispatch({ type: "UPDATE_QUOTATION", payload: { subject: value } });
  };

  const enhanceSubject = async () => {
    if (!state.quotation.subject.trim()) {
      return;
    }

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
        setEnhancedSubject(data.output);
      } else {
      }
    } catch (error) {
      console.warn("AI enhancement failed, using fallback:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const acceptEnhancement = () => {
    handleSubjectChange(enhancedSubject);
    setShowEnhancement(false);
    setEnhancedSubject("");
  };

  const rejectEnhancement = () => {
    setShowEnhancement(false);
    setEnhancedSubject("");
  };

  const regenerateEnhancement = () => {
    enhanceSubject();
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Subject Line
            <span className="text-sm font-normal text-gray-500">
              - Make it compelling
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium">
              Quotation Subject
            </Label>
            <div className="flex gap-2">
              <Input
                id="subject"
                value={state.quotation.subject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                placeholder="e.g., Industrial Packaging Machine with Installation"
                className="flex-1 h-11"
              />
              <Button
                onClick={enhanceSubject}
                disabled={isEnhancing || !state.quotation.subject.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Enhance with AI
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              💡 Tip: Be specific about your product/service for better AI
              enhancement
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="flex items-center gap-1 text-sm font-medium"
              >
                <Calendar className="w-4 h-4" />
                Quotation Date
              </Label>
              <Input
                id="date"
                type="date"
                value={state.quotation.date}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_QUOTATION",
                    payload: { date: e.target.value },
                  })
                }
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="expiry-date"
                className="flex items-center gap-1 text-sm font-medium"
              >
                <Clock className="w-4 h-4" />
                Expiry Date
              </Label>
              <Input
                id="expiry-date"
                type="date"
                value={state.quotation.expiryDate}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_QUOTATION",
                    payload: { expiryDate: e.target.value },
                  })
                }
                className="h-11"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {showEnhancement && (
        <AIEnhancementCard
          title="Subject Line"
          originalContent={state.quotation.subject}
          enhancedContent={enhancedSubject}
          isLoading={isEnhancing}
          onAccept={acceptEnhancement}
          onReject={rejectEnhancement}
          onRegenerate={regenerateEnhancement}
        />
      )}
    </div>
  );
}
