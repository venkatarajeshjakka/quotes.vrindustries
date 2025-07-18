"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode, useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

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
  icon?: ReactNode;
  helpText?: string;
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
  icon,
  helpText,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Basic validation
    if (required && newValue.trim() === "") {
      setIsValid(false);
    } else if (type === "email" && newValue && !/\S+@\S+\.\S+/.test(newValue)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const hasValue = value && value.trim() !== "";
  const showValidation = hasValue && !isFocused;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2">
        {icon && (
          <div className="text-primary/70">
            {icon}
          </div>
        )}
        <Label 
          htmlFor={id} 
          className={`font-semibold transition-colors duration-200 ${
            isFocused ? 'text-primary' : 'text-foreground'
          }`}
        >
          {label} 
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      </div>
      
      <div className="relative group">
        {type === "textarea" ? (
          <Textarea
            id={id}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={rows}
            required={required}
            placeholder={placeholder}
            className={`w-full bg-gradient-to-br from-background to-background/50 border-2 rounded-2xl shadow-sm transition-all duration-300 text-base px-4 py-4 resize-none ${
              isFocused 
                ? 'border-primary shadow-lg shadow-primary/10 bg-background' 
                : showValidation && !isValid
                ? 'border-destructive/50 bg-destructive/5'
                : showValidation && isValid
                ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20'
                : 'border-border hover:border-border/80 hover:shadow-md'
            }`}
          />
        ) : (
          <Input
            id={id}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
            placeholder={placeholder}
            className={`w-full bg-gradient-to-br from-background to-background/50 border-2 rounded-2xl shadow-sm transition-all duration-300 text-base px-4 py-4 h-14 ${
              isFocused 
                ? 'border-primary shadow-lg shadow-primary/10 bg-background' 
                : showValidation && !isValid
                ? 'border-destructive/50 bg-destructive/5'
                : showValidation && isValid
                ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20'
                : 'border-border hover:border-border/80 hover:shadow-md'
            }`}
          />
        )}
        
        {/* Validation Icons */}
        {showValidation && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isValid ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-destructive" />
            )}
          </div>
        )}
        
        {/* Focus ring effect */}
        {isFocused && (
          <div className="absolute inset-0 rounded-2xl bg-primary/5 -z-10 blur-xl" />
        )}
      </div>
      
      {/* Help text or validation message */}
      {(helpText || (showValidation && !isValid)) && (
        <div className={`text-sm transition-colors duration-200 ${
          showValidation && !isValid 
            ? 'text-destructive' 
            : 'text-muted-foreground'
        }`}>
          {showValidation && !isValid 
            ? required && !value.trim() 
              ? `${label} is required`
              : type === "email" 
              ? "Please enter a valid email address"
              : "Please check your input"
            : helpText
          }
        </div>
      )}
    </div>
  );
}