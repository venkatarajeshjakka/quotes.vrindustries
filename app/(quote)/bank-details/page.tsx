"use client";

import { useState } from "react";
import { Building, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useBankDetails, type BankDetails } from "@/contexts/bank-context";
import { ListPageLayout } from "@/components/shared/ListPageLayout";
import { ItemCard } from "@/components/shared/ItemCard";
import { ItemDetails, ItemDetail } from "@/components/shared/ItemDetails";
import { EditBankDetailsForm } from "@/components/shared/EditBankDetailsForm";

export default function BankDetailsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBankDetails, setEditingBankDetails] = useState<BankDetails | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { state, dispatch } = useBankDetails();

  const filterBankDetails = (banks: BankDetails[], searchTerm: string) => {
    return banks.filter(
      (bank) =>
        bank.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.accountHolderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.accountNumber.includes(searchTerm) ||
        bank.ifscCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

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

  const renderBankItem = (bank: BankDetails) => (
    <ItemCard
      key={bank.id}
      id={bank.id}
      icon={<CreditCard className="w-7 h-7 text-primary-foreground" />}
      title={bank.bankName}
      subtitle={bank.accountHolderName}
      onEdit={() => editBankDetails(bank)}
      onDelete={() => deleteBankDetails(bank.id)}
    >
      <ItemDetails>
        <div className="space-y-3">
          <ItemDetail label="Account Number" value={bank.accountNumber} />
          <ItemDetail label="IFSC Code" value={bank.ifscCode} />
        </div>
        <div className="space-y-3">
          <ItemDetail 
            icon={<Building className="w-5 h-5 text-primary/70" />}
            value={`Branch: ${bank.branch}`}
          />
        </div>
      </ItemDetails>
    </ItemCard>
  );

  return (
    <ListPageLayout
      title="Bank Details"
      description="Manage your bank details here."
      addText="Add Bank Detail"
      addHref="/bank-details/add"
      items={state}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filterItems={filterBankDetails}
      renderItem={renderBankItem}
      emptyStateIcon={<CreditCard className="w-10 h-10 text-primary" />}
      emptyStateTitle="No Bank Details Found"
      emptyStateDescription={
        state.length === 0
          ? "Add your first bank account to start managing your financial information."
          : "Try adjusting your search terms or add a new bank account."
      }
    >
      {/* Edit Bank Details Dialog */}
      {editingBankDetails && (
        <EditBankDetailsForm
          bankDetails={editingBankDetails}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
        />
      )}
    </ListPageLayout>
  );
}