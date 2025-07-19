"use client";

import { useQuotation } from "@/contexts/quotation-context";
import { useClient } from "@/contexts/client-context";
import { Users } from "lucide-react";
import { DetailCard } from "@/components/shared/detail-card";

export default function ClientSection() {
  const { state, dispatch } = useQuotation();
  const { state: clientState } = useClient();
  
  const handleClientSelect = (clientId: string) => {
    const client = clientState.find((c) => c.id === clientId);
    dispatch({ type: "UPDATE_QUOTATION", payload: { client } });
  };

  const options = clientState.map((client) => ({
    value: client.id,
    label: client.name,
    subtitle: client.company,
  }));

  const fields = state.quotation.client ? [
    {
      label: "Contact Person",
      value: state.quotation.client.name,
      className: "text-lg font-bold",
    },
    {
      label: "Company",
      value: state.quotation.client.company,
      className: "text-lg font-bold",
    },
    {
      label: "Phone Number",
      value: state.quotation.client.phone,
      className: "text-base font-mono tracking-wider",
    },
    {
      label: "Email Address",
      value: state.quotation.client.email,
      className: "text-base font-mono tracking-wider break-all",
    },
    {
      label: "Business Address",
      value: state.quotation.client.address,
      className: "text-base leading-relaxed",
      span: "full" as const,
    },
    ...(state.quotation.client.gstNumber ? [{
      label: "GST Number",
      value: state.quotation.client.gstNumber,
      className: "text-base font-mono tracking-wider",
    }] : []),
  ] : undefined;

  return (
    <DetailCard
      icon={<Users className="w-6 h-6" />}
      title="Client Details"
      description="Select and manage client information for the quotation"
      selectLabel="Select Client"
      selectPlaceholder="Choose client from your list"
      options={options}
      selectedData={state.quotation.client}
      fields={fields}
      onSelect={handleClientSelect}
      onAdd={() => {/* Add client handler */}}
      iconColor="blue"
    />
  );
}