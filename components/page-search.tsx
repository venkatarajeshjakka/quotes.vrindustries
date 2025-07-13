import { Search } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";

export function PageSearch({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  return (
    <div className="mb-8 w-full flex justify-center">
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 w-5 h-5 pointer-events-none" />
        <Input
          placeholder="Search organizations, emails, or phone..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          className="pl-12 pr-4 py-3 rounded-full bg-white/90 border border-blue-100 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-base transition-all placeholder-gray-400"
          autoFocus
        />
      </div>
    </div>
  );
}
