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
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <p className="text-blue-600 font-medium">{company}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Building className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{phone}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{email}</span>
              </div>
              {gstNumber && (
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">GST: {gstNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Edit client")}
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteClient(id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
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
