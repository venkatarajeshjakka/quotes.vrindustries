"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Badge,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileText,
  Printer,
  Save,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuotation } from "@/contexts/quotation-context";
import ClientSection from "@/components/sections/client-section";
import OrganizationSection from "@/components/sections/organization-section";
import SubjectSection from "@/components/sections/subject-section";
import KeyFeaturesSection from "@/components/sections/key-features-section";
import TechnicalDetailsSection from "@/components/sections/technical-details-section";
import TermsConditionsSection from "@/components/sections/terms-conditions-section";
import BankDetailsSection from "@/components/sections/bank-details-section";
type HeaderProps = {
  status: string;
  quotationNumber: string;
  handleSaveAs: (value: string) => void;
  handleSaveDraft: () => void;
  handlePreview: () => void;
  handlePrint: () => void;
  handleExportPDF: () => void;
};

const Header = ({
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
      draft: "bg-amber-100 text-amber-800",
      sent: "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };
  // Fix: Only set lastSavedTime on the client
  const [lastSavedTime, setLastSavedTime] = useState("");
  useEffect(() => {
    setLastSavedTime(new Date().toLocaleTimeString());
  }, []);
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
              Quotation Generator
            </h1>
            <Badge className={`${getStatusBadge(status)} font-medium`}>
              {status.toUpperCase()}
            </Badge>
          </div>
          <p className="text-gray-600">
            Create professional quotations with AI assistance
          </p>
          <p className="text-sm text-gray-500 mt-1">
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
            className="hover:bg-blue-50"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="hover:bg-purple-50"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button
            onClick={handleExportPDF}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    </header>
  );
};
interface QuotationGeneratorProps {
  editingId?: string | null;
  onBackToDashboard: () => void;
}
const QuoatationPage = ({
  editingId,
  onBackToDashboard,
}: QuotationGeneratorProps) => {
  const { state, dispatch } = useQuotation();
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    if (editingId) {
      const savedQuotation = localStorage.getItem(`quotation-${editingId}`);
      if (savedQuotation) {
        try {
          const quotation = JSON.parse(savedQuotation);
          dispatch({ type: "LOAD_DRAFT", payload: quotation });
        } catch (error) {
          console.error("Error loading quotation:", error);
        }
      }
    } else {
      // Reset to new quotation
      dispatch({
        type: "LOAD_DRAFT",
        payload: {
          id: "",
          quotationNumber: `QUO-${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          organization: null,
          client: null,
          subject: "",
          products: [],
          subtotal: 0,
          gstRate: 18,
          gstAmount: 0,
          total: 0,
          bankDetails: null,
          technicalDetails: "",
          keyFeatures: "",
          termsAndConditions: "",
          signature: "",
          status: "draft",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }
  }, [editingId, dispatch]);

  const handleSaveDraft = () => {
    const draftId = state.quotation.id || `draft-${Date.now()}`;
    const updatedQuotation = {
      ...state.quotation,
      id: draftId,
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: "UPDATE_QUOTATION", payload: { id: draftId } });
    localStorage.setItem(
      `quotation-${draftId}`,
      JSON.stringify(updatedQuotation)
    );
  };

  const handleSaveAs = (status: "draft" | "sent" | "accepted" | "rejected") => {
    const quotationId = state.quotation.id || `quotation-${Date.now()}`;
    const updatedQuotation = {
      ...state.quotation,
      id: quotationId,
      status,
      updatedAt: new Date().toISOString(),
    };

    dispatch({
      type: "UPDATE_QUOTATION",
      payload: { id: quotationId, status },
    });
    localStorage.setItem(
      `quotation-${quotationId}`,
      JSON.stringify(updatedQuotation)
    );
  };

  const handlePreview = () => {
    dispatch({ type: "TOGGLE_PREVIEW" });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    handlePreview();
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "details":
        return <FileText className="w-4 h-4" />;
      case "products":
        return <Sparkles className="w-4 h-4" />;
      case "content":
        return <CheckCircle className="w-4 h-4" />;
      case "finalize":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: "bg-amber-100 text-amber-800",
      sent: "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header
        status="draft"
        quotationNumber="QTN-00123"
        handleSaveAs={(value) => console.log("Save as:", value)}
        handleSaveDraft={() => console.log("Draft saved")}
        handlePreview={() => console.log("Preview clicked")}
        handlePrint={() => console.log("Print clicked")}
        handleExportPDF={() => console.log("Export PDF clicked")}
      />
      <main className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 bg-white/80 backdrop-blur-sm">
            <TabsTrigger
              value="details"
              className="flex items-center gap-2  text-blue-600 dark:text-blue-400"
            >
              {getTabIcon("details")}
              Details
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400"
            >
              {getTabIcon("products")}
              Products
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="flex items-center gap-2  text-blue-600 dark:text-blue-400"
            >
              {getTabIcon("content")}
              Content
            </TabsTrigger>
            <TabsTrigger
              value="finalize"
              className="flex items-center gap-2  text-blue-600 dark:text-blue-400"
            >
              {getTabIcon("finalize")}
              Finalize
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <OrganizationSection />
              <ClientSection />
            </div>
            <SubjectSection />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <BankDetailsSection />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <TechnicalDetailsSection />
            <KeyFeaturesSection />
            <TermsConditionsSection />
          </TabsContent>

          <TabsContent value="finalize" className="space-y-6"></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default QuoatationPage;
