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
    <Card className="shadow-md border border-gray-200 dark:border-muted bg-white dark:bg-muted/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Bank Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label
            htmlFor="bank-select"
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Select Bank Account
          </Label>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <Select onValueChange={handleBankDetailsSelect}>
              <SelectTrigger className="w-full sm:w-72 bg-white dark:bg-muted border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Choose bank account" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {state.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id} className="text-sm">
                    {bank.bankName}{" "}
                    <span className="text-gray-500">
                      - {bank.accountNumber.slice(-4)}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-muted hover:bg-blue-50 dark:hover:bg-muted/60 transition"
            >
              <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </Button>
          </div>
        </div>

        {quotationState.quotation.bankDetails && (
          <div className="space-y-4 p-6 rounded-2xl border border-blue-200 dark:border-blue-700 shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block">
                  Bank Name
                </Label>
                <div className="text-lg font-semibold py-2 min-h-[44px] flex items-center text-blue-900 dark:text-blue-100 ">
                  {quotationState.quotation.bankDetails.bankName}
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block">
                  Account Holder Name
                </Label>
                <div className="text-lg font-semibold  py-2 min-h-[44px] flex items-center text-blue-900 dark:text-blue-100 ">
                  {quotationState.quotation.bankDetails.accountHolderName}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block">
                  Account Number
                </Label>
                <div className="text-lg font-mono tracking-wider py-2 min-h-[44px] flex items-center text-blue-900 dark:text-blue-100 ">
                  {quotationState.quotation.bankDetails.accountNumber}
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block">
                  IFSC Code
                </Label>
                <div className="text-lg font-mono tracking-wider  py-2 min-h-[44px] flex items-center text-blue-900 dark:text-blue-100 ">
                  {quotationState.quotation.bankDetails.ifscCode}
                </div>
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block">
                Branch
              </Label>
              <div className="text-lg  py-2 min-h-[44px] flex items-center text-blue-900 dark:text-blue-100 ">
                {quotationState.quotation.bankDetails.branch}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
