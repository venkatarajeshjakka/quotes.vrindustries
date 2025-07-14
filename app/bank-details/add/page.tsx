"use client";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Banknote } from "lucide-react";
import { useState } from "react";
import { useBankDetails, type BankDetails } from "@/contexts/bank-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    toast.success("Bank details added successfully!");
    router.push("/bank-details");
    resetForm();
  };

  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="rounded-2xl shadow-lg border-0 bg-white/95">
        <CardContent className="py-8 px-4 md:px-10">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-blue-400 to-blue-200 w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-3">
              <Banknote className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Add Bank Details
            </h2>
            <p className="text-gray-600 text-center max-w-md">
              Enter your bank account details below. All fields are required.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label
                    htmlFor="bankName"
                    className="font-semibold text-gray-800"
                  >
                    Bank Name <span className="text-red-500">*</span>
                  </Label>
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
                    placeholder="e.g. HDFC Bank"
                    className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
                  />
                </div>
                <div className="grid gap-3">
                  <Label
                    htmlFor="accountHolderName"
                    className="font-semibold text-gray-800"
                  >
                    Account Holder Name <span className="text-red-500">*</span>
                  </Label>
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
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label
                    htmlFor="accountNumber"
                    className="font-semibold text-gray-800"
                  >
                    Account Number <span className="text-red-500">*</span>
                  </Label>
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
                    placeholder="e.g. 123456789012"
                    className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
                  />
                </div>
                <div className="grid gap-3">
                  <Label
                    htmlFor="ifscCode"
                    className="font-semibold text-gray-800"
                  >
                    IFSC Code <span className="text-red-500">*</span>
                  </Label>
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
                    placeholder="e.g. HDFC0001234"
                    className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="branch" className="font-semibold text-gray-800">
                  Branch <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="branch"
                  value={formData.branch || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, branch: e.target.value }))
                  }
                  required
                  placeholder="e.g. MG Road, Bangalore"
                  className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
                />
              </div>
              <div className="flex justify-end gap-4 pt-6 border-t border-blue-100 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="px-6 py-2 rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold transition-all"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-8 py-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white font-bold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                >
                  Add Bank
                </Button>
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
    <div className="min-h-screen flex flex-col items-center py-8 px-2 md:px-0">
      <div className="w-full max-w-3xl self-start">
        <BreadcrumbWithCustomSeperator
          prePageHref="/bank-details"
          prePageText="Bank Details"
          currentPage="Add Bank Details"
        />
      </div>
      <div className="w-full max-w-3xl mt-2">
        <AddBankForm />
      </div>
    </div>
  );
}
