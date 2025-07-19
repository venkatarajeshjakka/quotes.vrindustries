"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Eye,
  Printer,
  Save,
  FileText,
  Clock,
  MoreHorizontal,
  Menu
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type HeaderProps = {
  status: string;
  quotationNumber: string;
  handleSaveAs: (value: string) => void;
  handleSaveDraft: () => void;
  handlePreview: () => void;
  handlePrint: () => void;
  handleExportPDF: () => void;
};

const QuotationHeaderSection = ({
  status,
  quotationNumber,
  handleSaveAs,
  handleSaveDraft,
  handlePreview,
  handlePrint,
  handleExportPDF,
}: HeaderProps) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: {
        bg: "bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20",
        text: "text-amber-800 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-700/50",
        dot: "bg-amber-500"
      },
      sent: {
        bg: "bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20",
        text: "text-blue-800 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-700/50",
        dot: "bg-blue-500"
      },
      accepted: {
        bg: "bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20",
        text: "text-green-800 dark:text-green-300",
        border: "border-green-200 dark:border-green-700/50",
        dot: "bg-green-500"
      },
      rejected: {
        bg: "bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20",
        text: "text-red-800 dark:text-red-300",
        border: "border-red-200 dark:border-red-700/50",
        dot: "bg-red-500"
      },
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
  };

  const [lastSavedTime, setLastSavedTime] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setLastSavedTime(new Date().toLocaleTimeString());

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const statusConfig = getStatusBadge(status);

  return (
    <header className="relative bg-card/95 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-sm">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/98 to-background opacity-80" />

      <div className="relative">
        {/* Main Header Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
            {/* Left Section - Title and Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent leading-tight">
                      Quotation Generator
                    </h1>
                    <Badge
                      className={cn(
                        "w-fit px-3 py-1.5 rounded-full border font-semibold text-xs sm:text-sm shadow-sm flex items-center gap-2",
                        statusConfig.bg,
                        statusConfig.text,
                        statusConfig.border
                      )}
                    >
                      <div className={cn("w-2 h-2 rounded-full", statusConfig.dot)} />
                      {status.toUpperCase()}
                    </Badge>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-2">
                    Create professional quotations with AI assistance
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">{quotationNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Last saved: {lastSavedTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Status Selector and Save */}
              <div className="flex items-center gap-3">
                <Select
                  onValueChange={(value) => handleSaveAs(value as any)}
                  value={status}
                >
                  <SelectTrigger className="w-32 sm:w-36 h-10 bg-background border-border/50 hover:border-primary/50 rounded-xl shadow-sm transition-all duration-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/50 shadow-xl">
                    <SelectItem value="draft" className="rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        Draft
                      </div>
                    </SelectItem>
                    <SelectItem value="sent" className="rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        Sent
                      </div>
                    </SelectItem>
                    <SelectItem value="accepted" className="rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        Accepted
                      </div>
                    </SelectItem>
                    <SelectItem value="rejected" className="rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        Rejected
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={handleSaveDraft}
                  variant="outline"
                  size="default"
                  className="h-10 px-4 bg-background border-border/50 hover:border-primary/50 hover:bg-accent/50 rounded-xl shadow-sm transition-all duration-200 font-medium"
                >
                  <Save className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Save</span>
                </Button>
              </div>

              {/* Action Buttons */}
              {!isMobile ? (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handlePreview}
                    variant="outline"
                    size="default"
                    className="h-10 px-4 bg-background border-border/50 hover:border-primary/50 hover:bg-accent/50 rounded-xl shadow-sm transition-all duration-200 font-medium"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    size="default"
                    className="h-10 px-4 bg-background border-border/50 hover:border-primary/50 hover:bg-accent/50 rounded-xl shadow-sm transition-all duration-200 font-medium"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button
                    onClick={handleExportPDF}
                    size="default"
                    className="h-10 px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleExportPDF}
                    size="default"
                    className="flex-1 h-10 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-xl shadow-lg font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 bg-background border-border/50 hover:border-primary/50 hover:bg-accent/50 rounded-xl shadow-sm"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl border-border/50 shadow-xl">
                      <DropdownMenuItem onClick={handlePreview} className="rounded-lg">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handlePrint} className="rounded-lg">
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default QuotationHeaderSection;
export type { HeaderProps };
