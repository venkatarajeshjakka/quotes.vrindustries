"use client";

import { Banknote } from "lucide-react";
import { useState } from "react";
import { useBankDetails, type BankDetails } from "@/contexts/bank-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddFormLayout } from "@/components/shared/AddFormLayout";
import { AddPageLayout } from "@/components/shared/AddPageLayout";
import { FormField } from "@/components/shared/FormField";

const AddBankForm = () => {
  const { dispatch } = useBankDetails();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<BankDetails>>({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    branch: "",
  });

  const resetForm = () => {
    setFormData({
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      branch: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bankData: BankDetails = {
      id: `bank-${crypto.randomUUID()}`,
      bankName: formData.bankName!,
      accountNumber: formData.accountNumber!,
      ifscCode: formData.ifscCode!,
      accountHolderName: formData.accountHolderName!,
      branch: formData.branch!,
    };
    dispatch({ type: "ADD_BANK", payload: bankData });
    toast.success("Bank details added successfully!");
    router.push("/bank-details");
    resetForm();
  };

  const updateFormData = (field: keyof BankDetails) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AddFormLayout
      icon={<Banknote className="w-8 h-8 text-primary-foreground" />}
      title="Add Bank Details"
      description="Enter your bank account details below. All fields are required."
      onSubmit={handleSubmit}
      onCancel={resetForm}
      submitText="Add Bank"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="bankName"
          label="Bank Name"
          required
          value={formData.bankName || ""}
          onChange={updateFormData("bankName")}
          placeholder="e.g. HDFC Bank"
        />
        <FormField
          id="accountHolderName"
          label="Account Holder Name"
          required
          value={formData.accountHolderName || ""}
          onChange={updateFormData("accountHolderName")}
          placeholder="e.g. Rajesh Kumar"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="accountNumber"
          label="Account Number"
          required
          value={formData.accountNumber || ""}
          onChange={updateFormData("accountNumber")}
          placeholder="e.g. 123456789012"
        />
        <FormField
          id="ifscCode"
          label="IFSC Code"
          required
          value={formData.ifscCode || ""}
          onChange={updateFormData("ifscCode")}
          placeholder="e.g. HDFC0001234"
        />
      </div>
      <FormField
        id="branch"
        label="Branch"
        required
        value={formData.branch || ""}
        onChange={updateFormData("branch")}
        placeholder="e.g. MG Road, Bangalore"
      />
    </AddFormLayout>
  );
};

export default function page() {
  return (
    <AddPageLayout
      prePageHref="/bank-details"
      prePageText="Bank Details"
      currentPage="Add Bank Details"
    >
      <AddBankForm />
    </AddPageLayout>
  );
}
