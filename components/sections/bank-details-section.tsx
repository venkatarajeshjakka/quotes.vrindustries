"use client";

import { useBankDetails } from "@/contexts/bank-context";
import { useQuotation } from "@/contexts/quotation-context";
import { CreditCard } from "lucide-react";
import { DetailCard } from "@/components/shared/detail-card";

export default function BankDetailsSection() {
  const { state, dispatch } = useBankDetails();
  const { state: quotationState, dispatch: quotationDispatch } = useQuotation();

  const handleBankDetailsSelect = (bankId: string) => {
    const bankDetails = state.find((bank) => bank.id === bankId);
    quotationDispatch({ type: "UPDATE_QUOTATION", payload: { bankDetails } });
  };

  const options = state.map((bank) => ({
    value: bank.id,
    label: bank.bankName,
    subtitle: `****${bank.accountNumber.slice(-4)}`,
  }));

  const fields = quotationState.quotation.bankDetails ? [
    {
      label: "Bank Name",
      value: quotationState.quotation.bankDetails.bankName,
      className: "text-lg font-bold",
    },
    {
      label: "Account Holder",
      value: quotationState.quotation.bankDetails.accountHolderName,
      className: "text-lg font-bold",
    },
    {
      label: "Account Number",
      value: quotationState.quotation.bankDetails.accountNumber,
      className: "text-base font-mono tracking-wider",
    },
    {
      label: "IFSC Code",
      value: quotationState.quotation.bankDetails.ifscCode,
      className: "text-base font-mono tracking-wider",
    },
    {
      label: "Branch Location",
      value: quotationState.quotation.bankDetails.branch,
      className: "text-base leading-relaxed",
      span: "full" as const,
    },
  ] : undefined;

  return (
    <DetailCard
      icon={<CreditCard className="w-6 h-6" />}
      title="Bank Details"
      description="Select payment account information for the quotation"
      selectLabel="Select Bank Account"
      selectPlaceholder="Choose your bank account"
      options={options}
      selectedData={quotationState.quotation.bankDetails}
      fields={fields}
      onSelect={handleBankDetailsSelect}
      onAdd={() => {/* Add bank details handler */}}
      iconColor="green"
    />
  );
}