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
    <Card className="shadow-lg border border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <PenTool className="w-5 h-5 text-primary" />
          <span>Signature & Authorization</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label
            htmlFor="signature"
            className="text-sm font-medium text-foreground"
          >
            Authorized Signatory Details
          </Label>
          <Textarea
            id="signature"
            value={state.quotation.signature}
            onChange={(e) => handleSignatureChange(e.target.value)}
            placeholder="Enter authorized signatory name, designation, and contact details..."
            rows={4}
            className="mt-2 bg-background/60 border border-border rounded-lg focus:ring-2 focus:ring-ring transition"
          />
        </div>

        <div className="p-6 rounded-2xl border border-border bg-gradient-to-br from-accent/20 to-background shadow-md">
          <h4 className="font-semibold mb-3 text-foreground">
            Signature Preview
          </h4>
          <div className="space-y-2">
            <div className="flex flex-col items-end border-b border-border pb-8 mb-4">
              <div className="w-48 h-16 border-b-2 border-primary ml-auto mb-2 bg-background/60 rounded-t-xl transition-all duration-300"></div>
              <p className="text-xs text-muted-foreground mt-1">
                Authorized Signature
              </p>
            </div>
            {state.quotation.signature && (
              <div className="whitespace-pre-wrap text-base font-medium text-foreground bg-accent/30 rounded-lg px-4 py-2 border border-border shadow-sm">
                {state.quotation.signature}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="quotation-number"
              className="text-xs font-semibold text-foreground mb-1 block"
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
              className="bg-background border border-border text-base font-mono tracking-wider rounded-lg px-3 py-2 min-h-[44px]"
            />
          </div>
          <div>
            <Label
              htmlFor="status"
              className="text-xs font-semibold text-foreground mb-1 block"
            >
              Status
            </Label>
            <Input
              id="status"
              value={state.quotation.status}
              readOnly
              className="bg-accent/20 border border-border text-base capitalize rounded-lg px-3 py-2 min-h-[44px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
