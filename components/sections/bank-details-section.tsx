"use client";

import { useBankDetails } from "@/contexts/bank-context";
import { useQuotation } from "@/contexts/quotation-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard } from "lucide-react";

export default function BankDetailsSection() {
  const { state, dispatch } = useBankDetails();
  const { state: quotationState, dispatch: quotationDispatch } = useQuotation();

  const handleBankDetailsSelect = (bankId: string) => {
    const bankDetails = state.find((bank) => bank.id === bankId);
    quotationDispatch({ type: "UPDATE_QUOTATION", payload: { bankDetails } });
  };

  return (
    <Card className="shadow-md border border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <CreditCard className="w-5 h-5 text-primary" />
          <span>Bank Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label
            htmlFor="bank-select"
            className="text-sm font-medium text-foreground"
          >
            Select Bank Account
          </Label>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <Select onValueChange={handleBankDetailsSelect}>
              <SelectTrigger className="w-full sm:w-72 bg-background border border-border focus:ring-2 focus:ring-ring">
                <SelectValue placeholder="Choose bank account" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {state.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id} className="text-sm">
                    {bank.bankName}{" "}
                    <span className="text-muted-foreground">
                      - {bank.accountNumber.slice(-4)}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="border border-border bg-background hover:bg-accent/50 transition"
            >
              <Plus className="w-4 h-4 text-primary" />
            </Button>
          </div>
        </div>

        {quotationState.quotation.bankDetails && (
          <div className="space-y-4 p-6 rounded-2xl border border-border shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  Bank Name
                </Label>
                <div className="text-lg font-semibold py-2 min-h-[44px] flex items-center text-foreground ">
                  {quotationState.quotation.bankDetails.bankName}
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  Account Holder Name
                </Label>
                <div className="text-lg font-semibold  py-2 min-h-[44px] flex items-center text-foreground ">
                  {quotationState.quotation.bankDetails.accountHolderName}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  Account Number
                </Label>
                <div className="text-lg font-mono tracking-wider py-2 min-h-[44px] flex items-center text-foreground ">
                  {quotationState.quotation.bankDetails.accountNumber}
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  IFSC Code
                </Label>
                <div className="text-lg font-mono tracking-wider  py-2 min-h-[44px] flex items-center text-foreground ">
                  {quotationState.quotation.bankDetails.ifscCode}
                </div>
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold text-foreground mb-1 block">
                Branch
              </Label>
              <div className="text-lg  py-2 min-h-[44px] flex items-center text-foreground ">
                {quotationState.quotation.bankDetails.branch}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
