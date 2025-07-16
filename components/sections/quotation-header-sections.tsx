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
import { Download, Eye, Printer, Save } from "lucide-react";
import { useEffect, useState } from "react";

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
    const colors = {
      draft: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      sent: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      accepted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  // Fix: Only set lastSavedTime on the client
  const [lastSavedTime, setLastSavedTime] = useState("");
  useEffect(() => {
    setLastSavedTime(new Date().toLocaleTimeString());
  }, []);
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 p-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Quotation Generator
            </h1>
            <Badge className={`${getStatusBadge(status)} font-medium`}>
              {status.toUpperCase()}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Create professional quotations with AI assistance
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {quotationNumber} • Last saved: {lastSavedTime}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Select
              onValueChange={(value) => handleSaveAs(value as any)}
              value={status}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSaveDraft} variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>

          <Button
            onClick={handlePreview}
            variant="outline"
            size="sm"
            className="hover:bg-accent/50"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="hover:bg-accent/50"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button
            onClick={handleExportPDF}
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    </header>
  );
};

export default QuotationHeaderSection;
export type { HeaderProps };
