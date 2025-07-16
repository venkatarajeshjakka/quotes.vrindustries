"use client";

import { useQuotation } from "@/contexts/quotation-context";
import { useClient } from "@/contexts/client-context";
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
import { Plus, Users } from "lucide-react";

export default function ClientSection() {
  const { state, dispatch } = useQuotation();
  const { state: clientState } = useClient();
  const handleClientSelect = (clientId: string) => {
    const client = clientState.find((c) => c.id === clientId);
    dispatch({ type: "UPDATE_QUOTATION", payload: { client } });
  };

  return (
    <Card className="shadow-md border border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Users className="w-5 h-5 text-primary" />
          <span>Client Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label
            htmlFor="client-select"
            className="text-sm font-medium text-foreground"
          >
            Select Client
          </Label>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <Select onValueChange={handleClientSelect}>
              <SelectTrigger className="w-full sm:w-72 bg-background border border-border focus:ring-2 focus:ring-ring">
                <SelectValue placeholder="Choose client" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {clientState.map((client) => (
                  <SelectItem
                    key={client.id}
                    value={client.id}
                    className="text-sm"
                  >
                    {client.name} - {client.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="border border-border bg-background hover:bg-accent/50 transition"
            >
              <Plus className="w-4 h-4 text-primary" />
            </Button>
          </div>
        </div>

        {state.quotation.client && (
          <div className="space-y-4 p-6 rounded-2xl border border-border shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  Contact Person
                </Label>
                <div className="text-lg font-semibold py-2 min-h-[44px] flex items-center text-foreground ">
                  {state.quotation.client.name}
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  Company
                </Label>
                <div className="text-lg font-semibold py-2 min-h-[44px] flex items-center text-foreground ">
                  {state.quotation.client.company}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  Phone
                </Label>
                <div className="text-lg font-mono tracking-wider py-2 min-h-[44px] flex items-center text-foreground ">
                  {state.quotation.client.phone}
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  Email
                </Label>
                <div className="text-lg font-mono tracking-wider py-2 min-h-[44px] flex items-center text-foreground ">
                  {state.quotation.client.email}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <Label className="text-xs font-semibold text-foreground mb-1 block">
                  Address
                </Label>
                <div className="text-lg py-2 min-h-[44px] flex items-center text-foreground ">
                  {state.quotation.client.address}
                </div>
              </div>
              {state.quotation.client.gstNumber && (
                <div>
                  <Label className="text-xs font-semibold text-foreground mb-1 block">
                    GST Number
                  </Label>
                  <div className="text-lg font-mono tracking-wider py-2 min-h-[44px] flex items-center text-foreground ">
                    {state.quotation.client.gstNumber}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
