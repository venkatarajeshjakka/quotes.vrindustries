"use client";
import React, { useState } from "react";
import { BreadcrumbWIthSeparator } from "@/components/bread-crumb";
import { PageHeader } from "@/components/page-header";
import { PageSearch } from "@/components/page-search";
import { useBankDetails, type BankDetails } from "@/contexts/bank-context";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Building, CreditCard, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditBankDetailsForm } from "@/components/shared/EditBankDetailsForm";

const BankDetailCard = ({
  bank,
  deleteBankDetails,
  editBankDetails,
}: {
  bank: BankDetails;
  deleteBankDetails: (id: string) => void;
  editBankDetails: (bank: BankDetails) => void;
}) => (
  <Card
    key={bank.id}
    className="hover:shadow-2xl transition-shadow border border-border bg-card/95 dark:bg-card/90 rounded-2xl overflow-hidden relative"
  >
    <CardContent className="p-8">
      {/* Action buttons absolutely positioned at top-right */}
      <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
        <Button
          variant="outline"
          size="sm"
          className="border-primary/20 text-primary hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center"
          onClick={() => editBankDetails(bank)}
        >
          <Edit className="w-4 h-4 mr-1" />
          <span className="hidden md:inline">Edit</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => deleteBankDetails(bank.id)}
          className="border-destructive/20 text-destructive hover:text-destructive-foreground hover:bg-destructive hover:border-destructive font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-gradient-to-br from-primary to-primary/70 dark:from-primary/80 dark:to-primary/60 p-3 rounded-xl shadow-md">
              <CreditCard className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground tracking-tight mb-1">
                {bank.bankName}
              </h3>
              <span className="inline-block text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-medium">
                {bank.accountHolderName}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-muted-foreground">
                  Account Number:
                </span>
                <span className="text-foreground font-mono">
                  {bank.accountNumber}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-muted-foreground">IFSC Code:</span>
                <span className="text-foreground font-mono">{bank.ifscCode}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary/70 dark:text-primary/80" />
                <span className="text-foreground font-medium">
                  Branch: {bank.branch}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBankDetails, setEditingBankDetails] = useState<BankDetails | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { state, dispatch } = useBankDetails();

  const filteredBankDetails = state.filter(
    (bank) =>
      bank.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.accountHolderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.accountNumber.includes(searchTerm) ||
      bank.ifscCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteBankDetails = (id: string) => {
    dispatch({ type: "DELETE_BANK", payload: id });
    toast.success("Bank details deleted successfully!");
  };

  const editBankDetails = (bank: BankDetails) => {
    setEditingBankDetails(bank);
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingBankDetails(null);
  };
  return (
    <div className="flex flex-col min-h-screen w-full p-8">
      <BreadcrumbWIthSeparator title="Bank Details" />
      <PageHeader
        title="Bank Details"
        description="Manage your bank details here."
        addText="Add Bank Detail"
        addHref="/bank-details/add"
      />
      <main className="flex-1 mt-8">
        <PageSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="grid gap-6">
          {filteredBankDetails.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No bank details found.
            </div>
          ) : (
            filteredBankDetails.map((bank) => (
              <BankDetailCard
                bank={bank}
                key={bank.id}
                deleteBankDetails={deleteBankDetails}
                editBankDetails={editBankDetails}
              />
            ))
          )}
        </div>
      </main>

      {/* Edit Bank Details Dialog */}
      {editingBankDetails && (
        <EditBankDetailsForm
          bankDetails={editingBankDetails}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
        />
      )}
    </div>
  );
}
