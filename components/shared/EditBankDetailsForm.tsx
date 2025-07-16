"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBankDetails, type BankDetails } from "@/contexts/bank-context";
import { toast } from "sonner";
import { EditDialog } from "./EditDialog";

interface EditBankDetailsFormProps {
  bankDetails: BankDetails;
  isOpen: boolean;
  onClose: () => void;
}

export function EditBankDetailsForm({ bankDetails, isOpen, onClose }: EditBankDetailsFormProps) {
  const { dispatch } = useBankDetails();
  const [formData, setFormData] = useState<BankDetails>({
    ...bankDetails,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_BANK", payload: formData });
    toast.success("Bank details updated successfully!");
    onClose();
  };

  const handleSave = (data: BankDetails) => {
    dispatch({ type: "UPDATE_BANK", payload: data });
    toast.success("Bank details updated successfully!");
    onClose();
  };

  return (
    <EditDialog
      data={formData}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      title="Edit Bank Details"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label
              htmlFor="edit-bankName"
              className="font-semibold text-foreground"
            >
              Bank Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-bankName"
              value={formData.bankName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bankName: e.target.value,
                }))
              }
              required
              placeholder="e.g. HDFC Bank"
              className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
            />
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="edit-accountHolderName"
              className="font-semibold text-foreground"
            >
              Account Holder Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-accountHolderName"
              value={formData.accountHolderName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  accountHolderName: e.target.value,
                }))
              }
              required
              placeholder="e.g. Rajesh Kumar"
              className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
            />
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="edit-accountNumber"
              className="font-semibold text-foreground"
            >
              Account Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-accountNumber"
              value={formData.accountNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  accountNumber: e.target.value,
                }))
              }
              required
              placeholder="e.g. 123456789012"
              className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
            />
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="edit-ifscCode"
              className="font-semibold text-foreground"
            >
              IFSC Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-ifscCode"
              value={formData.ifscCode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  ifscCode: e.target.value,
                }))
              }
              required
              placeholder="e.g. HDFC0001234"
              className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="edit-branch" className="font-semibold text-foreground">
              Branch <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-branch"
              value={formData.branch}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, branch: e.target.value }))
              }
              required
              placeholder="e.g. MG Road, Bangalore"
              className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
            />
          </div>
          <div className="flex justify-end gap-4 pt-6 border-t border-border mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-2 rounded-full font-semibold transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-8 py-2 rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:bg-primary/90 transition-all"
            >
              Update Bank Details
            </Button>
          </div>
        </div>
      </form>
    </EditDialog>
  );
}