"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Plus, Search, SlashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useClient } from "@/contexts/client-context";

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
        <BreadcrumbPage>Clients</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);
export default function ClientPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { state, dispatch } = useClient();
  console.log("Client State:", state);
  return (
    <div className="flex flex-col min-h-screen w-full p-8">
      <BreadcrumbWithCustomSeperator />
      <header className="flex bg-white mt-4">
        <div className="flex items-center justify-between w-3/4">
          <div className="">
            <h1 className="text-2xl font-bold text-gray-900">
              Client Management
            </h1>
            <p className="text-gray-600">
              Manage your client contacts and company information
            </p>
          </div>
          <div>
            <Link
              href="/client/add"
              className="flex items-center bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 mt-8">
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
