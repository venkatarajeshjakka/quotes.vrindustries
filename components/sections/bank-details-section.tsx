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
import { Input } from "@/components/ui/input";
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Bank Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="bank-select">Select Bank Account</Label>
          <div className="flex gap-2 mt-1">
            <Select onValueChange={handleBankDetailsSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose bank account" />
              </SelectTrigger>
              <SelectContent>
                {state.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id}>
                    {bank.bankName} - {bank.accountNumber.slice(-4)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {quotationState.quotation.bankDetails && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>Bank Name</Label>
                <Input
                  value={quotationState.quotation.bankDetails.bankName}
                  readOnly
                />
              </div>
              <div>
                <Label>Account Holder Name</Label>
                <Input
                  value={quotationState.quotation.bankDetails.accountHolderName}
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>Account Number</Label>
                <Input
                  value={quotationState.quotation.bankDetails.accountNumber}
                  readOnly
                />
              </div>
              <div>
                <Label>IFSC Code</Label>
                <Input
                  value={quotationState.quotation.bankDetails.ifscCode}
                  readOnly
                />
              </div>
            </div>
            <div>
              <Label>Branch</Label>
              <Input
                value={quotationState.quotation.bankDetails.branch}
                readOnly
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
