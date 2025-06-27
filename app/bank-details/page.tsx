"use client";
import React, { useState } from "react";
import { BreadcrumbWIthSeparator } from "@/components/bread-crumb";
import { PageHeader } from "@/components/page-header";
import { PageSearch } from "@/components/page-search";
import { useBankDetails, type BankDetails } from "@/contexts/bank-context";
import { Card, CardContent } from "@/components/ui/card";
import { Building, CreditCard, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BankDetailCard = ({
  bank,
  deleteBankDetails,
}: {
  bank: BankDetails;
  deleteBankDetails: (id: string) => void;
}) => (
  <Card key={bank.id} className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-2 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {bank.bankName}
              </h3>
              <p className="text-blue-600 font-medium">
                {bank.accountHolderName}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">
                  Account Number:
                </span>
                <span className="text-gray-900 font-mono">
                  {bank.accountNumber}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-600">IFSC Code:</span>
                <span className="text-gray-900 font-mono">{bank.ifscCode}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Branch: {bank.branch}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Edit bank details")}
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteBankDetails(bank.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function page() {
  const [searchTerm, setSearchTerm] = useState("");
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
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
