"use client";

import {
  Building,
  Edit,
  Globe,
  Mail,
  Phone,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useOrganizationDetails } from "@/contexts/organization-context";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbWIthSeparator } from "@/components/bread-crumb";
import { PageHeader } from "@/components/page-header";
import { PageSearch } from "@/components/page-search";
type ClientCardProps = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  gstNumber?: string;
  website?: string;
  deleteOrganization: (id: string) => void;
};

const OrganizationCard = ({
  id,
  name,
  address,
  phone,
  email,
  gstNumber,
  website,
  deleteOrganization,
}: ClientCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              {gstNumber && (
                <p className="text-sm text-gray-600">GST: {gstNumber}</p>
              )}
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
              {website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{website}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => console.log("Edit organization")}
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteOrganization(id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const { state, dispatch } = useOrganizationDetails();

  const deleteOrganization = (id: string) => {
    dispatch({ type: "DELETE_ORGANIZATION", payload: id });
  };

  const filteredOrganizations = state.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.phone.includes(searchTerm)
  );

  return (
    <div className="flex flex-col min-h-screen w-full p-8">
      <BreadcrumbWIthSeparator title="Organizations" />
      <PageHeader
        title="Organization Management"
        description="Manage your company and organization details"
        addText="Add Organization"
        addHref="/organization/add"
      />
      <main className="flex-1 mt-8">
        <PageSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="grid gap-6">
          {filteredOrganizations.length == 0 ? (
            <Card>
              <CardContent className="text-center py-16">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No Organizations found
                </h3>
                <p className="text-gray-600 mb-6">
                  {state.length === 0
                    ? "Add your first client to start creating quotations"
                    : "Try adjusting your search terms"}
                </p>
                {state.length === 0 && (
                  <Button onClick={() => console.log("aad")} size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Add First Organization
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredOrganizations.map((org) => (
              <OrganizationCard
                key={org.id}
                id={org.id}
                name={org.name}
                address={org.address}
                phone={org.phone}
                email={org.email}
                gstNumber={org.gstNumber}
                deleteOrganization={deleteOrganization}
                website={org.website} // Assuming website is part of the organization details
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
