"use client";

import { useState } from "react";
import { Building, Globe, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { useOrganizationDetails, type Organization } from "@/contexts/organization-context";
import { ListPageLayout } from "@/components/shared/ListPageLayout";
import { ItemCard } from "@/components/shared/ItemCard";
import { ItemDetails, ItemDetail } from "@/components/shared/ItemDetails";
import { EditOrganizationForm } from "@/components/shared/EditOrganizationForm";

export default function OrganizationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingOrganization, setEditingOrganization] = useState<Organization | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { state, dispatch } = useOrganizationDetails();

  const filterOrganizations = (organizations: Organization[], searchTerm: string) => {
    return organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.phone.includes(searchTerm)
    );
  };

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

  const renderOrganizationItem = (organization: Organization) => (
    <ItemCard
      key={organization.id}
      id={organization.id}
      icon={<Building className="w-7 h-7 text-primary-foreground" />}
      title={organization.name}
      subtitle={organization.gstNumber ? `GST: ${organization.gstNumber}` : undefined}
      onEdit={() => editOrganization(organization)}
      onDelete={() => deleteOrganization(organization.id)}
    >
      <ItemDetails>
        <div className="space-y-3">
          <ItemDetail 
            icon={<Building className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />}
            value={organization.address}
          />
          <ItemDetail 
            icon={<Phone className="w-5 h-5 text-primary/70" />}
            value={organization.phone}
          />
        </div>
        <div className="space-y-3">
          <ItemDetail 
            icon={<Mail className="w-5 h-5 text-primary/70" />}
            value={organization.email}
          />
          {organization.website && (
            <ItemDetail 
              icon={<Globe className="w-5 h-5 text-primary/70" />}
              value={organization.website}
              className="underline underline-offset-2"
            />
          )}
        </div>
      </ItemDetails>
    </ItemCard>
  );

  return (
    <ListPageLayout
      title="Organization Management"
      description="Manage your company and organization details"
      addText="Add Organization"
      addHref="/organization/add"
      items={state}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filterItems={filterOrganizations}
      renderItem={renderOrganizationItem}
      emptyStateIcon={<Building className="w-10 h-10 text-primary" />}
      emptyStateTitle="No Organizations Found"
      emptyStateDescription={
        state.length === 0
          ? "Add your first organization to start creating quotations and managing your business information."
          : "Try adjusting your search terms or add a new organization."
      }
    >
      {/* Edit Organization Dialog */}
      {editingOrganization && (
        <EditOrganizationForm
          organization={editingOrganization}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
        />
      )}
    </ListPageLayout>
  );
}