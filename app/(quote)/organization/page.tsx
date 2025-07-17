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
import { toast } from "sonner";
import { useOrganizationDetails, type Organization } from "@/contexts/organization-context";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbWIthSeparator } from "@/components/bread-crumb";
import { PageHeader } from "@/components/page-header";
import { PageSearch } from "@/components/page-search";
import { EditOrganizationForm } from "@/components/shared/EditOrganizationForm";
type OrganizationCardProps = {
  organization: Organization;
  deleteOrganization: (id: string) => void;
  editOrganization: (organization: Organization) => void;
};

const OrganizationCard = ({
  organization,
  deleteOrganization,
  editOrganization,
}: OrganizationCardProps) => (
  <Card className="hover:shadow-2xl transition-shadow border-0 bg-white/95 rounded-2xl overflow-hidden relative">
    <CardContent className="p-8">
      {/* Action buttons absolutely positioned at top-right */}
      <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
        <Button
          variant="outline"
          size="sm"
          className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-900 font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center"
          onClick={() => editOrganization(organization)}
        >
          <Edit className="w-4 h-4 mr-1" />
          <span className="hidden md:inline">Edit</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => deleteOrganization(organization.id)}
          className="border-red-200 text-red-600 hover:text-white hover:bg-red-500 hover:border-red-500 font-semibold px-4 py-2 rounded-lg shadow-sm flex items-center"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-gradient-to-br from-blue-400 to-blue-200 p-3 rounded-xl shadow-md">
              <Building className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                {organization.name}
              </h3>
              {organization.gstNumber && (
                <span className="inline-block text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  GST: {organization.gstNumber}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Building className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{organization.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-800 font-medium">{organization.phone}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-800 font-medium">{organization.email}</span>
              </div>
              {organization.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-800 font-medium underline underline-offset-2">
                    {organization.website}
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

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingOrganization, setEditingOrganization] = useState<Organization | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { state, dispatch } = useOrganizationDetails();

  const deleteOrganization = (id: string) => {
    dispatch({ type: "DELETE_ORGANIZATION", payload: id });
    toast.success("Organization deleted successfully!");
  };

  const editOrganization = (organization: Organization) => {
    setEditingOrganization(organization);
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingOrganization(null);
  };

  const filteredOrganizations = state.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.phone.includes(searchTerm)
  );

  return (
    <div className="flex flex-col min-h-screen w-full  p-0 md:p-8">
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
            <Card className="mx-auto max-w-xl shadow-xl border-0 bg-white/90">
              <CardContent className="text-center py-16 flex flex-col items-center">
                <div className="bg-gradient-to-br from-blue-200 to-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md">
                  <Users className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                  No Organizations Found
                </h3>
                <p className="text-gray-600 mb-8 text-base max-w-md mx-auto">
                  {state.length === 0
                    ? "Add your first organization to start creating quotations and managing your business information."
                    : "Try adjusting your search terms or add a new organization to get started."}
                </p>
                {state.length === 0 && (
                  <Button
                    onClick={() => (window.location.href = "/organization/add")}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-200"
                  >
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
                organization={org}
                deleteOrganization={deleteOrganization}
                editOrganization={editOrganization}
              />
            ))
          )}
        </div>
      </main>

      {/* Edit Organization Dialog */}
      {editingOrganization && (
        <EditOrganizationForm
          organization={editingOrganization}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
        />
      )}
    </div>
  );
}
