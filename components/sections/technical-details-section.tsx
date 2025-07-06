"use client";

import { Settings } from "lucide-react";
import { useQuotation } from "@/contexts/quotation-context";
import { MarkdownSection } from "./markdown-section";

export default function TechnicalDetailsSection() {
  const { state, dispatch } = useQuotation();
  const PROMPT = `You are an expert in creating detailed technical specifications for business quotations. Your task is to enhance the technical details section of a quotation to make it more professional and comprehensive. Input: "${
    state.quotation.technicalDetails
  }" Client: ${state.quotation.client?.company || "Not specified"}, Products: ${
    state.quotation.products.length
  } items. Provide only one enhanced technical details section that is concise, clear, and relevant to the quotation's content.`;
  return (
    <MarkdownSection
      icon={<Settings className="w-5 h-5" />}
      title="Technical Details"
      label="Technical Specifications"
      value={state.quotation.technicalDetails}
      placeholder="Enter technical specifications, installation requirements, compliance details..."
      prompt={PROMPT}
      onChange={(value: string) =>
        dispatch({
          type: "UPDATE_QUOTATION",
          payload: { technicalDetails: value },
        })
      }
    />
  );
}
