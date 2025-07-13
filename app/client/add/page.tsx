"use client";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useClient, type Client } from "@/contexts/client-context";
import { useRouter } from "next/navigation";
import { BreadcrumbWithCustomSeperator } from "@/components/bread-crumb-custom";

import { UserRoundPlus } from "lucide-react";

const AddClientForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
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
      id: `client-${crypto.randomUUID()}`,
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
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="rounded-2xl shadow-lg border-0 bg-white/95">
        <CardContent className="py-8 px-4 md:px-10">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-blue-400 to-blue-200 w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-3">
              <UserRoundPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Add a New Client
            </h2>
            <p className="text-gray-600 text-center max-w-md">
              Fill in the details below to add a new client to your records.
              Required fields are marked with{" "}
              <span className="text-red-500">*</span>.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name" className="font-semibold text-gray-800">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name || ""}
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
                    htmlFor="company-name"
                    className="font-semibold text-gray-800"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </Label>
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
                    placeholder="e.g. TechMachinery Solutions Pvt Ltd"
                    className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label
                    htmlFor="address"
                    className="font-semibold text-gray-800"
                  >
                    Company Address <span className="text-red-500">*</span>
                  </Label>
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
                    placeholder="123 Industrial Area, Sector 15, Gurgaon, Haryana - 122001"
                    className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
                  />
                </div>
                <div className="grid gap-3">
                  <Label
                    htmlFor="phone"
                    className="font-semibold text-gray-800"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
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
                    placeholder="e.g. +91 9876543210"
                    className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label
                    htmlFor="email"
                    className="font-semibold text-gray-800"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </Label>
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
                    placeholder="e.g. john@company.com"
                    className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
                  />
                </div>
                <div className="grid gap-3">
                  <Label
                    htmlFor="gstNumber"
                    className="font-semibold text-gray-800"
                  >
                    GST Number
                  </Label>
                  <Input
                    id="gstNumber"
                    value={formData.gstNumber || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gstNumber: e.target.value,
                      }))
                    }
                    placeholder="e.g. 22AAAAA0000A1Z5"
                    className="w-full bg-white/90 border border-blue-100 rounded-lg shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base px-4 py-3"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-6 border-t border-blue-100 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="px-6 py-2 rounded-full border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold transition-all"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-8 py-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white font-bold shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all"
                >
                  Add Client
                </Button>
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
    <div className="min-h-screen flex flex-col items-center py-8 px-2 md:px-0">
      <div className="w-full max-w-3xl self-start">
        <BreadcrumbWithCustomSeperator
          prePageHref="/client"
          prePageText="Clients"
          currentPage="Add Client"
        />
      </div>
      <div className="w-full max-w-3xl mt-2">
        <AddClientForm />
      </div>
    </div>
  );
}
