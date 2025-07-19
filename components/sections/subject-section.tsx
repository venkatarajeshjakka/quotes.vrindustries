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

  const context = `Client: ${state.quotation.client?.company || "Not specified"
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
    <div className="space-y-8">
      <Card className="group relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-primary/20">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-2xl opacity-20" />

        <CardHeader className="relative pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="bg-gradient-to-br from-yellow-500/20 via-yellow-400/10 to-transparent p-2.5 rounded-xl">
              <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <span className="text-foreground">Subject & Timeline</span>
              <p className="text-sm font-normal text-muted-foreground mt-1">
                Create compelling subject and set quotation dates
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="relative space-y-8">
          <div className="space-y-4">
            <Label htmlFor="subject" className="text-sm font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"></div>
              Quotation Subject Line
            </Label>
            <div className="flex flex-col lg:flex-row gap-3">
              <Input
                id="subject"
                value={state.quotation.subject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                placeholder="e.g., Industrial Packaging Machine with Installation & Training"
                className="flex-1 h-12 bg-gradient-to-r from-background to-background/80 border-2 border-border/50 hover:border-primary/30 focus:border-primary rounded-2xl shadow-sm transition-all duration-200 text-base"
              />
              <Button
                onClick={enhanceSubject}
                disabled={!state.quotation.subject.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 h-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Enhance with AI
              </Button>
            </div>
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 p-4 rounded-2xl border border-border/30">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">Pro Tip:</span> Be specific about your product/service for better AI enhancement results
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label
                htmlFor="date"
                className="text-sm font-semibold text-foreground flex items-center gap-2"
              >
                <div className="p-1.5 bg-gradient-to-br from-blue-500/20 to-blue-400/10 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
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
                className="h-12 bg-gradient-to-r from-background to-background/80 border-2 border-border/50 hover:border-primary/30 focus:border-primary rounded-2xl shadow-sm transition-all duration-200"
              />
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="expiry-date"
                className="text-sm font-semibold text-foreground flex items-center gap-2"
              >
                <div className="p-1.5 bg-gradient-to-br from-red-500/20 to-red-400/10 rounded-lg">
                  <Clock className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
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
                className="h-12 bg-gradient-to-r from-background to-background/80 border-2 border-border/50 hover:border-primary/30 focus:border-primary rounded-2xl shadow-sm transition-all duration-200"
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
