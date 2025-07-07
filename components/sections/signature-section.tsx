"use client";

import { useQuotation } from "@/contexts/quotation-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PenTool } from "lucide-react";

export default function SignatureSection() {
  const { state, dispatch } = useQuotation();

  const handleSignatureChange = (value: string) => {
    dispatch({ type: "UPDATE_QUOTATION", payload: { signature: value } });
  };

  return (
    <Card className="shadow-lg border border-blue-100 dark:border-blue-900 bg-white dark:bg-muted/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <PenTool className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Signature & Authorization</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label
            htmlFor="signature"
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Authorized Signatory Details
          </Label>
          <Textarea
            id="signature"
            value={state.quotation.signature}
            onChange={(e) => handleSignatureChange(e.target.value)}
            placeholder="Enter authorized signatory name, designation, and contact details..."
            rows={4}
            className="mt-2 bg-blue-50/60 dark:bg-muted/40 border border-blue-200 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="p-6 rounded-2xl border border-blue-200 dark:border-blue-700 bg-gradient-to-br from-blue-50/60 to-white dark:from-blue-900/30 dark:to-muted/60 shadow-md">
          <h4 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">
            Signature Preview
          </h4>
          <div className="space-y-2">
            <div className="flex flex-col items-end border-b border-blue-200 dark:border-blue-700 pb-8 mb-4">
              <div className="w-48 h-16 border-b-2 border-blue-400 dark:border-blue-500 ml-auto mb-2 bg-white/60 dark:bg-muted/60 rounded-t-xl transition-all duration-300"></div>
              <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                Authorized Signature
              </p>
            </div>
            {state.quotation.signature && (
              <div className="whitespace-pre-wrap text-base font-medium text-blue-900 dark:text-blue-100 bg-blue-100/60 dark:bg-blue-900/30 rounded-lg px-4 py-2 border border-blue-100 dark:border-blue-800 shadow-sm">
                {state.quotation.signature}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="quotation-number"
              className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block"
            >
              Quotation Number
            </Label>
            <Input
              id="quotation-number"
              value={state.quotation.quotationNumber}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_QUOTATION",
                  payload: { quotationNumber: e.target.value },
                })
              }
              className="bg-white dark:bg-muted/70 border border-blue-200 dark:border-blue-700 text-base font-mono tracking-wider rounded-lg px-3 py-2 min-h-[44px]"
            />
          </div>
          <div>
            <Label
              htmlFor="status"
              className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block"
            >
              Status
            </Label>
            <Input
              id="status"
              value={state.quotation.status}
              readOnly
              className="bg-blue-50/60 dark:bg-muted/40 border border-blue-200 dark:border-blue-700 text-base capitalize rounded-lg px-3 py-2 min-h-[44px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
