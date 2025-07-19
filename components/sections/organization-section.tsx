"use client";
import { useOrganizationDetails } from "@/contexts/organization-context";
import { useQuotation } from "@/contexts/quotation-context";
import { Building } from "lucide-react";
import { DetailCard } from "@/components/shared/detail-card";

export default function OrganizationSection() {
  const { state, dispatch } = useQuotation();
  const { state: organizationState } = useOrganizationDetails();
  
  const handleOrganizationSelect = (orgId: string) => {
    const organization = organizationState.find((org) => org.id === orgId);
    dispatch({ type: "UPDATE_QUOTATION", payload: { organization } });
  };

  const options = state.organizations.map((org) => ({
    value: org.id,
    label: org.name,
    subtitle: org.email,
  }));

  const fields = state.quotation.organization ? [
    {
      label: "Company Name",
      value: state.quotation.organization.name,
      className: "text-lg font-bold",
    },
    {
      label: "Phone Number",
      value: state.quotation.organization.phone,
      className: "text-base font-mono tracking-wider",
    },
    {
      label: "Email Address",
      value: state.quotation.organization.email,
      className: "text-base font-mono tracking-wider break-all",
    },
    {
      label: "Website",
      value: state.quotation.organization.website || "Not specified",
      className: "text-base font-mono tracking-wider",
    },
    {
      label: "GST Number",
      value: state.quotation.organization.gstNumber || "Not specified",
      className: "text-base font-mono tracking-wider",
    },
    {
      label: "Business Address",
      value: state.quotation.organization.address,
      className: "text-base leading-relaxed",
      span: "full" as const,
    },
  ] : undefined;

  return (
    <DetailCard
      icon={<Building className="w-6 h-6" />}
      title="Organization Details"
      description="Select your organization information for the quotation"
      selectLabel="Select Organization"
      selectPlaceholder="Choose your organization"
      options={options}
      selectedData={state.quotation.organization}
      fields={fields}
      onSelect={handleOrganizationSelect}
      onAdd={() => {/* Add organization handler */}}
      iconColor="purple"
    />
  );
}