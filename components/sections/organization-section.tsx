"use client";
import { useOrganizationDetails } from "@/contexts/organization-context";
import { useQuotation } from "@/contexts/quotation-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Building } from "lucide-react";

export default function OrganizationSection() {
  const { state, dispatch } = useQuotation();
  const { state: organizationState } = useOrganizationDetails();
  const handleOrganizationSelect = (orgId: string) => {
    const organization = organizationState.find((org) => org.id === orgId);
    dispatch({ type: "UPDATE_QUOTATION", payload: { organization } });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          Organization Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="organization-select">Select Organization</Label>
          <div className="flex gap-2 mt-1">
            <Select onValueChange={handleOrganizationSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose organization" />
              </SelectTrigger>
              <SelectContent>
                {state.organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {state.quotation.organization && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label>Company Name</Label>
              <Input value={state.quotation.organization.name} readOnly />
            </div>
            <div>
              <Label>Address</Label>
              <Textarea
                value={state.quotation.organization.address}
                readOnly
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>Phone</Label>
                <Input value={state.quotation.organization.phone} readOnly />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={state.quotation.organization.email} readOnly />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>Website</Label>
                <Input
                  value={state.quotation.organization.website || ""}
                  readOnly
                />
              </div>
              <div>
                <Label>GST Number</Label>
                <Input
                  value={state.quotation.organization.gstNumber || ""}
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
