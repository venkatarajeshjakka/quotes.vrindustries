import { Search, X } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PageSearch({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="mb-8 w-full flex justify-center">
      <div className="relative w-full max-w-2xl group">
        {/* Background glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-xl transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'
          }`} />

        <div className="relative">
          <div className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${isFocused ? 'text-primary scale-110' : 'text-muted-foreground'
            }`}>
            <Search className="w-5 h-5 pointer-events-none" />
          </div>

          <Input
            placeholder="Search by name, email, phone, or any details..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`relative pl-14 pr-12 py-4 h-14 rounded-3xl bg-gradient-to-r from-background via-background to-background/80 border-2 shadow-lg backdrop-blur-sm text-base transition-all duration-300 placeholder:text-muted-foreground/70 ${isFocused
              ? 'border-primary shadow-2xl shadow-primary/10 bg-background'
              : 'border-border/50 hover:border-border hover:shadow-xl'
              }`}
          />

          {/* Clear button */}
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className={`absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full hover:bg-accent transition-all duration-200 ${isFocused ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
                }`}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Search suggestions or status */}
        {searchTerm && (
          <div className="absolute top-full left-0 right-0 mt-2 text-center">
            <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
              Searching for "{searchTerm}"
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
