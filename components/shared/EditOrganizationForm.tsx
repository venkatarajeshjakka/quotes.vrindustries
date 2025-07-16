"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOrganizationDetails, type Organization } from "@/contexts/organization-context";
import { toast } from "sonner";
import { EditDialog } from "./EditDialog";

interface EditOrganizationFormProps {
    organization: Organization;
    isOpen: boolean;
    onClose: () => void;
}

export function EditOrganizationForm({ organization, isOpen, onClose }: EditOrganizationFormProps) {
    const { dispatch } = useOrganizationDetails();
    const [formData, setFormData] = useState<Organization>({
        ...organization,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_ORGANIZATION", payload: formData });
        toast.success("Organization updated successfully!");
        onClose();
    };

    const handleSave = (data: Organization) => {
        dispatch({ type: "UPDATE_ORGANIZATION", payload: data });
        toast.success("Organization updated successfully!");
        onClose();
    };

    return (
        <EditDialog
            data={formData}
            isOpen={isOpen}
            onClose={onClose}
            onSave={handleSave}
            title="Edit Organization"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="edit-org-name" className="font-semibold text-foreground">
                            Company Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="edit-org-name"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            required
                            placeholder="e.g. TechMachinery Solutions Pvt Ltd"
                            className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label
                            htmlFor="edit-org-email"
                            className="font-semibold text-foreground"
                        >
                            Email Address
                        </Label>
                        <Input
                            id="edit-org-email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, email: e.target.value }))
                            }
                            placeholder="e.g. info@company.com"
                            className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label
                            htmlFor="edit-org-address"
                            className="font-semibold text-foreground"
                        >
                            Business Address <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                            id="edit-org-address"
                            value={formData.address}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, address: e.target.value }))
                            }
                            rows={3}
                            required
                            placeholder="123 Industrial Area, Sector 15, Gurgaon, Haryana - 122001"
                            className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label
                            htmlFor="edit-org-phone"
                            className="font-semibold text-foreground"
                        >
                            Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="edit-org-phone"
                            type="text"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, phone: e.target.value }))
                            }
                            required
                            placeholder="e.g. +91 9876543210"
                            className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label
                            htmlFor="edit-org-gstNumber"
                            className="font-semibold text-foreground"
                        >
                            GST Number
                        </Label>
                        <Input
                            id="edit-org-gstNumber"
                            value={formData.gstNumber || ""}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, gstNumber: e.target.value }))
                            }
                            placeholder="e.g. 22AAAAA0000A1Z5"
                            className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label
                            htmlFor="edit-org-website"
                            className="font-semibold text-foreground"
                        >
                            Website
                        </Label>
                        <Input
                            id="edit-org-website"
                            value={formData.website || ""}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, website: e.target.value }))
                            }
                            placeholder="e.g. www.company.com"
                            className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-6 border-t border-border mt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="px-6 py-2 rounded-full font-semibold transition-all"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="px-8 py-2 rounded-full bg-primary text-primary-foreground font-bold shadow-lg hover:bg-primary/90 transition-all"
                        >
                            Update Organization
                        </Button>
                    </div>
                </div>
            </form>
        </EditDialog>
    );
}