"use client";

import { Building2 } from "lucide-react";
import { useState } from "react";
import {
  useOrganizationDetails,
  type Organization,
} from "@/contexts/organization-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddFormLayout } from "@/components/shared/AddFormLayout";
import { AddPageLayout } from "@/components/shared/AddPageLayout";
import { FormField } from "@/components/shared/FormField";

const AddOrganizationForm = () => {
  const { dispatch } = useOrganizationDetails();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Organization>>({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    gstNumber: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      gstNumber: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orgData: Organization = {
      id: `organization-${crypto.randomUUID()}`,
      name: formData.name!,
      address: formData.address!,
      phone: formData.phone!,
      email: formData.email!,
      website: formData.website || "",
      gstNumber: formData.gstNumber || "",
    };

    dispatch({ type: "ADD_ORGANIZATION", payload: orgData });
    toast.success("Organization added successfully!");
    resetForm();
    router.push("/organization");
  };

  const updateFormData = (field: keyof Organization) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AddFormLayout
      icon={<Building2 className="w-8 h-8 text-primary-foreground" />}
      title="Add a New Organization"
      description="Fill in the details below to add a new organization to your business records. Required fields are marked with *."
      onSubmit={handleSubmit}
      onCancel={resetForm}
      submitText="Add Organization"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="name"
          label="Company Name"
          required
          value={formData.name || ""}
          onChange={updateFormData("name")}
          placeholder="e.g. TechMachinery Solutions Pvt Ltd"
        />
        <FormField
          id="email"
          label="Email Address"
          type="email"
          value={formData.email || ""}
          onChange={updateFormData("email")}
          placeholder="e.g. info@company.com"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="address"
          label="Business Address"
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
          id="gstNumber"
          label="GST Number"
          value={formData.gstNumber || ""}
          onChange={updateFormData("gstNumber")}
          placeholder="e.g. 22AAAAA0000A1Z5"
        />
        <FormField
          id="website"
          label="Website"
          value={formData.website || ""}
          onChange={updateFormData("website")}
          placeholder="e.g. www.company.com"
        />
      </div>
    </AddFormLayout>
  );
};

export default function AddOrganizationPage() {
  return (
    <AddPageLayout
      prePageHref="/organization"
      prePageText="Organizations"
      currentPage="Add Organization"
    >
      <AddOrganizationForm />
    </AddPageLayout>
  );
}
