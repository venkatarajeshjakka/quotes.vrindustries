"use client";
import { FileText } from "lucide-react";
import { MarkdownSection } from "./markdown-section";
import { useQuotation } from "@/contexts/quotation-context";
export default function TermsConditionsSection() {
  const { state, dispatch } = useQuotation();

  const PROMPT = `You are an expert in creating comprehensive terms and conditions for business quotations. Your task is to enhance the terms and conditions section of a quotation to make it more professional and legally sound. Input: "${
    state.quotation.termsAndConditions
  }" Client: ${state.quotation.client?.company || "Not specified"}, Products: ${
    state.quotation.products.length
  } items. Provide only one enhanced terms and conditions section that is concise, clear, and relevant to the quotation's content.`;

  return (
    <MarkdownSection
      icon={<FileText className="w-5 h-5" />}
      title="Terms & Conditions"
      label="Legal Terms & Conditions"
      value={state.quotation.termsAndConditions}
      placeholder="Enter terms, conditions, warranties, liabilities..."
      prompt={PROMPT}
      onChange={(value: string) =>
        dispatch({
          type: "UPDATE_QUOTATION",
          payload: { termsAndConditions: value },
        })
      }
    />
  );
}
