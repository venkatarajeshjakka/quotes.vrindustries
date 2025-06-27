"use client";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useBankDetails, type BankDetails } from "@/contexts/bank-context";
import { useRouter } from "next/navigation";

import { BreadcrumbWithCustomSeperator } from "@/components/bread-crumb-custom";

const AddBankForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { state, dispatch } = useBankDetails();
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
      id: `client-${crypto.randomUUID()}`,
      bankName: formData.bankName!,
      accountNumber: formData.accountNumber!,
      ifscCode: formData.ifscCode!,
      accountHolderName: formData.accountHolderName!,
      branch: formData.branch!,
    };
    dispatch({ type: "ADD_BANK", payload: bankData });

    router.push("/bank-details");
    resetForm();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  value={formData.bankName || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bankName: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                <Input
                  id="accountHolderName"
                  value={formData.accountHolderName || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      accountHolderName: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      accountNumber: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="ifscCode">IFSC Code *</Label>
                <Input
                  id="ifscCode"
                  value={formData.ifscCode || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ifscCode: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="branch">Branch *</Label>
                <Input
                  id="branch"
                  value={formData.branch || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, branch: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">Add Bank</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default function page() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-10">
      <div className="self-start">
        <BreadcrumbWithCustomSeperator
          prePageHref="/bank-details"
          prePageText="Bank Details"
          currentPage="Add Bank Details"
        />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6 mx-auto">
        <h1 className="text-2xl font-bold mb-2 self-center">
          Add New Bank Details
        </h1>
        <AddBankForm />
      </div>
    </div>
  );
}
