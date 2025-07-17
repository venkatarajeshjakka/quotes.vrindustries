"use client";

import { useState } from "react";
import { Building, Mail, Phone, Users } from "lucide-react";
import { toast } from "sonner";
import { useClient, type Client } from "@/contexts/client-context";
import { ListPageLayout } from "@/components/shared/ListPageLayout";
import { ItemCard } from "@/components/shared/ItemCard";
import { ItemDetails, ItemDetail } from "@/components/shared/ItemDetails";
import { EditClientForm } from "@/components/shared/EditClientForm";

export default function ClientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { state, dispatch } = useClient();

  const filterClients = (clients: Client[], searchTerm: string) => {
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    );
  };

  const deleteClient = (id: string) => {
    dispatch({ type: "DELETE_CLIENT", payload: id });
    toast.success("Client deleted successfully!");
  };

  const editClient = (client: Client) => {
    setEditingClient(client);
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingClient(null);
  };

  const renderClientItem = (client: Client) => (
    <ItemCard
      key={client.id}
      id={client.id}
      icon={<Users className="w-7 h-7 text-primary-foreground" />}
      title={client.name}
      subtitle={client.company}
      onEdit={() => editClient(client)}
      onDelete={() => deleteClient(client.id)}
    >
      <ItemDetails>
        <div className="space-y-3">
          <ItemDetail 
            icon={<Building className="w-5 h-5 text-primary/70 mt-0.5 flex-shrink-0" />}
            value={client.address}
          />
          <ItemDetail 
            icon={<Phone className="w-5 h-5 text-primary/70" />}
            value={client.phone}
          />
        </div>
        <div className="space-y-3">
          <ItemDetail 
            icon={<Mail className="w-5 h-5 text-primary/70" />}
            value={client.email}
          />
          {client.gstNumber && (
            <ItemDetail 
              icon={<Building className="w-5 h-5 text-primary/70" />}
              value={`GST: ${client.gstNumber}`}
            />
          )}
        </div>
      </ItemDetails>
    </ItemCard>
  );

  return (
    <ListPageLayout
      title="Client Management"
      description="Manage your client contacts and company information"
      addText="Add Client"
      addHref="/client/add"
      items={state}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filterItems={filterClients}
      renderItem={renderClientItem}
      emptyStateIcon={<Users className="w-10 h-10 text-primary" />}
      emptyStateTitle="No Clients Found"
      emptyStateDescription={
        state.length === 0
          ? "Add your first client to start creating quotations and managing your business relationships."
          : "Try adjusting your search terms or add a new client."
      }
    >
      {/* Edit Client Dialog */}
      {editingClient && (
        <EditClientForm
          client={editingClient}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
        />
      )}
    </ListPageLayout>
  );
}