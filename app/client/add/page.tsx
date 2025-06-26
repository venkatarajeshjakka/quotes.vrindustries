"use client";
import Link from "next/link";
import { SlashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useClient, type Client } from "@/contexts/client-context";
import { useRouter } from "next/navigation";

const BreadcrumbWithCustomSeperator = () => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <SlashIcon />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <Link href="/client">Clients</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>
        <SlashIcon />
      </BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Add Client</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

const AddQuoteForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { state, dispatch } = useClient();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Client>>({
    name: "",
    company: "",
    address: "",
    phone: "",
    email: "",
    gstNumber: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      address: "",
      phone: "",
      email: "",
      gstNumber: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clientData: Client = {
      id: `client-${Date.now()}`,
      name: formData.name!,
      company: formData.company!,
      address: formData.address!,
      phone: formData.phone!,
      email: formData.email!,
      gstNumber: formData.gstNumber || "",
    };
    dispatch({ type: "ADD_CLIENT", payload: clientData });
    router.push("/client");
    resetForm();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  placeholder="Enter client name"
                  className="w-full"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  type="text"
                  value={formData.company || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }))
                  }
                  required
                  placeholder="Enter company name"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="address">Company Address *</Label>
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
                  placeholder="Enter complete company address..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    required
                    className="mt-1"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                    className="mt-1"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
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
                <Button type="submit">Add Client</Button>
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
        <BreadcrumbWithCustomSeperator />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6 mx-auto">
        <h1 className="text-2xl font-bold mb-2 self-center">Add Client</h1>
        <AddQuoteForm />
      </div>
    </div>
  );
}
