"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useClient, type Client } from "@/contexts/client-context";
import { toast } from "sonner";
import { EditDialog } from "./EditDialog";

interface EditClientFormProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

export function EditClientForm({ client, isOpen, onClose }: EditClientFormProps) {
  const { dispatch } = useClient();
  const [formData, setFormData] = useState<Client>({
    ...client,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_CLIENT", payload: formData });
    toast.success("Client updated successfully!");
    onClose();
  };

  const handleSave = (data: Client) => {
    dispatch({ type: "UPDATE_CLIENT", payload: data });
    toast.success("Client updated successfully!");
    onClose();
  };

  return (
    <EditDialog
      data={formData}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleSave}
      title="Edit Client"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="edit-name" className="font-semibold text-gray-800">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              placeholder="e.g. John Doe"
              className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
            />
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="edit-company"
              className="font-semibold text-gray-800"
            >
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-company"
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, company: e.target.value }))
              }
              required
              placeholder="e.g. TechMachinery Solutions Pvt Ltd"
              className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
            />
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="edit-address"
              className="font-semibold text-gray-800"
            >
              Company Address <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="edit-address"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
              rows={3}
              required
              placeholder="123 Industrial Area, Sector 15, Gurgaon, Haryana - 122001"
              className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
            />
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="edit-phone"
              className="font-semibold text-gray-800"
            >
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              required
              placeholder="e.g. +91 9876543210"
              className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
            />
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="edit-email"
              className="font-semibold text-gray-800"
            >
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              placeholder="e.g. john@company.com"
              className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
            />
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="edit-gstNumber"
              className="font-semibold text-gray-800"
            >
              GST Number
            </Label>
            <Input
              id="edit-gstNumber"
              value={formData.gstNumber || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, gstNumber: e.target.value }))
              }
              placeholder="e.g. 22AAAAA0000A1Z5"
              className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
            />
          </div>
          <div className="flex justify-end gap-4 pt-6 border-t border-blue-100 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-2 rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-8 py-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white font-bold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all"
            >
              Update Client
            </Button>
          </div>
        </div>
      </form>
    </EditDialog>
  );
}