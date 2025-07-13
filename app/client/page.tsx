"use client";

import { Building, Edit, Mail, Phone, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { useClient } from "@/contexts/client-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbWIthSeparator } from "@/components/bread-crumb";
import { PageHeader } from "@/components/page-header";
import { PageSearch } from "@/components/page-search";
type ClientCardProps = {
  id: string;
  name: string;
  company: string;
  address: string;
  phone: string;
  email: string;
  gstNumber?: string;
  deleteClient: (id: string) => void;
};

const ClientCard = ({
  id,
  name,
  company,
  address,
  phone,
  email,
  gstNumber,
  deleteClient,
}: ClientCardProps) => (
  <Card className="hover:shadow-2xl transition-shadow border-0 bg-white/95 rounded-2xl overflow-hidden relative">
    <CardContent className="p-8">
      {/* Action buttons absolutely positioned at top-right */}
      <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
        <Button
          variant="outline"
          size="sm"
          className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-900 font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center"
          onClick={() => console.log("Edit client")}
        >
          <Edit className="w-4 h-4 mr-1" />
          <span className="hidden md:inline">Edit</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => deleteClient(id)}
          className="border-red-200 text-red-600 hover:text-white hover:bg-red-500 hover:border-red-500 font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-gradient-to-br from-green-400 to-green-200 p-3 rounded-xl shadow-md">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                {name}
              </h3>
              <span className="inline-block text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                {company}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Building className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-400" />
                <span className="text-gray-800 font-medium">{phone}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-400" />
                <span className="text-gray-800 font-medium">{email}</span>
              </div>
              {gstNumber && (
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-green-400" />
                  <span className="text-gray-800 font-medium">
                    GST: {gstNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function ClientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { state, dispatch } = useClient();

  const deleteClient = (id: string) => {
    dispatch({ type: "DELETE_CLIENT", payload: id });
  };

  const filteredClients = state.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
  );

  return (
    <div className="flex flex-col min-h-screen w-full p-8">
      <BreadcrumbWIthSeparator title="Clients" />
      <PageHeader
        title="Client Management"
        description="Manage your client contacts and company information"
        addText="Add Client"
        addHref="/client/add"
      />
      <main className="flex-1 mt-8">
        <PageSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="grid gap-6">
          {filteredClients.length == 0 ? (
            <Card>
              <CardContent className="text-center py-16">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No clients found
                </h3>
                <p className="text-gray-600 mb-6">
                  {state.length === 0
                    ? "Add your first client to start creating quotations"
                    : "Try adjusting your search terms"}
                </p>
                {state.length === 0 && (
                  <Button onClick={() => console.log("aad")} size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Add First Client
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                id={client.id}
                name={client.name}
                company={client.company}
                address={client.address}
                phone={client.phone}
                email={client.email}
                gstNumber={client.gstNumber}
                deleteClient={deleteClient}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
