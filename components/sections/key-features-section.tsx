"use client";

import { Star } from "lucide-react";
import { useQuotation } from "@/contexts/quotation-context";
import { MarkdownSection } from "./markdown-section";

export default function KeyFeaturesSection() {
  const { state, dispatch } = useQuotation();
  const PROMPT = `You are an expert in creating compelling key features and benefits for business quotations. Your task is to enhance the key features section of a quotation to make it more professional and impactful. Input: "${
    state.quotation.keyFeatures
  }" Client: ${state.quotation.client?.company || "Not specified"}, Products: ${
    state.quotation.products.length
  } items. ${
    state.quotation.subject
  }. Provide only one enhanced key features section that is concise, clear, and relevant to the quotation's content.`;

  return (
    <MarkdownSection
      icon={<Star className="w-5 h-5" />}
      title="Key Features"
      label="Product Features & Benefits"
      value={state.quotation.keyFeatures}
      placeholder="Enter key features, benefits, unique selling points..."
      prompt={PROMPT}
      onChange={(value: string) =>
        dispatch({ type: "UPDATE_QUOTATION", payload: { keyFeatures: value } })
      }
    />
  );
}
