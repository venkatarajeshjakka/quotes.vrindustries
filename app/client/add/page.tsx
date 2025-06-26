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
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter client name"
                  className="w-full"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter company name"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="address">Company Address *</Label>
                <Textarea
                  id="address"
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
                  className="mt-1"
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline">
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
    <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-10">
      <BreadcrumbWithCustomSeperator />
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="flex items-center gap-2 self-center font-medium">
          Add Client
        </h1>
        <AddQuoteForm />
      </div>
    </div>
  );
}
