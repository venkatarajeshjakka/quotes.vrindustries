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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Client Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="client-select">Select Client</Label>
          <div className="flex gap-2 mt-1">
            <Select onValueChange={handleClientSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose client" />
              </SelectTrigger>
              <SelectContent>
                {clientState.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name} - {client.company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {state.quotation.client && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>Contact Person</Label>
                <Input value={state.quotation.client.name} readOnly />
              </div>
              <div>
                <Label>Company</Label>
                <Input value={state.quotation.client.company} readOnly />
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Textarea
                value={state.quotation.client.address}
                readOnly
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>Phone</Label>
                <Input value={state.quotation.client.phone} readOnly />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={state.quotation.client.email} readOnly />
              </div>
            </div>
            {state.quotation.client.gstNumber && (
              <div>
                <Label>GST Number</Label>
                <Input value={state.quotation.client.gstNumber} readOnly />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
