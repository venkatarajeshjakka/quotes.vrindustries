"use client";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  useOrganizationDetails,
  type Organization,
} from "@/contexts/organization-context";

import { useRouter } from "next/navigation";

import { BreadcrumbWithCustomSeperator } from "@/components/bread-crumb-custom";

const AddClientForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { state, dispatch } = useOrganizationDetails();
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
    resetForm();
    router.push("/organization");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  placeholder="Enter organization name"
                  className="w-full"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="Enter organization email"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  rows={3}
                  required
                  className="mt-1"
                  placeholder="Enter complete business address..."
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="text"
                  value={formData.phone || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  required
                  className="mt-1"
                  placeholder="Enter organization phone number"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  value={formData.gstNumber || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      gstNumber: e.target.value,
                    }))
                  }
                  className="mt-1"
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">Add Organization</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default function AddClientPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-10">
      <div className="self-start">
        <BreadcrumbWithCustomSeperator
          prePageHref="/organization"
          prePageText="Organizations"
          currentPage="Add Organization"
        />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6 mx-auto">
        <h1 className="text-2xl font-bold mb-2 self-center">
          Add Organization
        </h1>
        <AddClientForm />
      </div>
    </div>
  );
}
