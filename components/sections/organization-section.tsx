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
import { Label } from "@/components/ui/label";
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
    <Card className="shadow-md border border-gray-200 dark:border-muted bg-white dark:bg-muted/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Organization Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label
            htmlFor="organization-select"
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Select Organization
          </Label>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <Select onValueChange={handleOrganizationSelect}>
              <SelectTrigger className="w-full sm:w-72 bg-white dark:bg-muted border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Choose organization" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {state.organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id} className="text-sm">
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-muted hover:bg-blue-50 dark:hover:bg-muted/60 transition"
            >
              <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </Button>
          </div>
        </div>

        {state.quotation.organization && (
          <div className="space-y-4 p-6 rounded-2xl border border-blue-200 dark:border-blue-700 shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block">
                  Company Name
                </Label>
                <div className="text-lg font-semibold py-2 min-h-[44px] flex items-center text-blue-900 dark:text-blue-100 ">
                  {state.quotation.organization.name}
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block">
                  Phone
                </Label>
                <div className="text-lg font-semibold py-2 min-h-[44px] flex items-center text-blue-900 dark:text-blue-100 ">
                  {state.quotation.organization.phone}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block">
                  Email
                </Label>
                <div className="text-lg font-mono tracking-wider py-2 min-h-[44px] flex items-center text-blue-900 dark:text-blue-100 ">
                  {state.quotation.organization.email}
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block">
                  Website
                </Label>
                <div className="text-lg font-mono tracking-wider py-2 min-h-[44px] flex items-center text-blue-900 dark:text-blue-100 ">
                  {state.quotation.organization.website || "-"}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block">
                  GST Number
                </Label>
                <div className="text-lg font-mono tracking-wider py-2 min-h-[44px] flex items-center text-blue-900 dark:text-blue-100 ">
                  {state.quotation.organization.gstNumber || "-"}
                </div>
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1 block">
                  Address
                </Label>
                <div className="text-lg py-2 min-h-[44px] flex items-center text-blue-900 dark:text-blue-100 ">
                  {state.quotation.organization.address}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
