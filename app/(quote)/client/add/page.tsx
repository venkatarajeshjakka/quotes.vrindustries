"use client";

import { UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useClient, type Client } from "@/contexts/client-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddFormLayout } from "@/components/shared/AddFormLayout";
import { AddPageLayout } from "@/components/shared/AddPageLayout";
import { FormField } from "@/components/shared/FormField";

const AddClientForm = () => {
  const { dispatch } = useClient();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Client>>({
    name: "",
    company: "",
    address: "",
    phone: "",
    email: "",
    gstNumber: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      address: "",
      phone: "",
      email: "",
      gstNumber: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clientData: Client = {
      id: `client-${crypto.randomUUID()}`,
      name: formData.name!,
      company: formData.company!,
      address: formData.address!,
      phone: formData.phone!,
      email: formData.email!,
      gstNumber: formData.gstNumber || "",
    };
    dispatch({ type: "ADD_CLIENT", payload: clientData });
    toast.success("Client added successfully!");
    router.push("/client");
    resetForm();
  };

  const updateFormData = (field: keyof Client) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AddFormLayout
      icon={<UserRoundPlus className="w-8 h-8 text-primary-foreground" />}
      title="Add a New Client"
      description="Fill in the details below to add a new client to your records. Required fields are marked with *."
      onSubmit={handleSubmit}
      onCancel={resetForm}
      submitText="Add Client"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="name"
          label="Name"
          required
          value={formData.name || ""}
          onChange={updateFormData("name")}
          placeholder="e.g. John Doe"
        />
        <FormField
          id="company-name"
          label="Company Name"
          required
          value={formData.company || ""}
          onChange={updateFormData("company")}
          placeholder="e.g. TechMachinery Solutions Pvt Ltd"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="address"
          label="Company Address"
          type="textarea"
          required
          value={formData.address || ""}
          onChange={updateFormData("address")}
          placeholder="123 Industrial Area, Sector 15, Gurgaon, Haryana - 122001"
          rows={3}
        />
        <FormField
          id="phone"
          label="Phone Number"
          required
          value={formData.phone || ""}
          onChange={updateFormData("phone")}
          placeholder="e.g. +91 9876543210"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="email"
          label="Email Address"
          type="email"
          required
          value={formData.email || ""}
          onChange={updateFormData("email")}
          placeholder="e.g. john@company.com"
        />
        <FormField
          id="gstNumber"
          label="GST Number"
          value={formData.gstNumber || ""}
          onChange={updateFormData("gstNumber")}
          placeholder="e.g. 22AAAAA0000A1Z5"
        />
      </div>
    </AddFormLayout>
  );
};

export default function AddClientPage() {
  return (
    <AddPageLayout
      prePageHref="/client"
      prePageText="Clients"
      currentPage="Add Client"
    >
      <AddClientForm />
    </AddPageLayout>
  );
}
