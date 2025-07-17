"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function FormField({
  id,
  label,
  required = false,
  type = "text",
  value,
  onChange,
  placeholder,
  rows = 3,
  className,
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="grid gap-3">
      <Label htmlFor={id} className="font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          value={value}
          onChange={handleChange}
          rows={rows}
          required={required}
          placeholder={placeholder}
          className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          required={required}
          placeholder={placeholder}
          className="w-full bg-background/90 border border-border rounded-lg shadow-sm focus:border-primary focus:ring-2 focus:ring-ring text-base px-4 py-3"
        />
      )}
    </div>
  );
}