"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Eye, FileText, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuotation } from "@/contexts/quotation-context";
import ClientSection from "@/components/sections/client-section";
import OrganizationSection from "@/components/sections/organization-section";
import SubjectSection from "@/components/sections/subject-section";
import KeyFeaturesSection from "@/components/sections/key-features-section";
import TechnicalDetailsSection from "@/components/sections/technical-details-section";
import TermsConditionsSection from "@/components/sections/terms-conditions-section";
import BankDetailsSection from "@/components/sections/bank-details-section";
import ProductSection from "@/components/sections/product-section";
import SignatureSection from "@/components/sections/signature-section";
import { Card } from "@/components/ui/card";
import QuotationHeaderSection from "@/components/sections/quotation-header-sections";
import QuotationPreview from "@/components/sections/quotation-preview";
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
        return <ShoppingCart className="w-4 h-4" />;
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
      draft: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      sent: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      accepted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  if (state.previewMode) {
    return <QuotationPreview />;
  }
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-accent/10">
      <QuotationHeaderSection
        status={state.quotation.status}
        quotationNumber={state.quotation.quotationNumber}
        handleSaveAs={(value) => handleSaveAs(value as any)}
        handleSaveDraft={handleSaveDraft}
        handlePreview={handlePreview}
        handlePrint={handlePrint}
        handleExportPDF={handleExportPDF}
      />
      <main className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6 bg-background/80 backdrop-blur-sm">
            <TabsTrigger
              value="details"
              className="flex items-center gap-2 text-primary"
            >
              {getTabIcon("details")}
              Details
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="flex items-center gap-2 text-primary"
            >
              {getTabIcon("products")}
              Products
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="flex items-center gap-2 text-primary"
            >
              {getTabIcon("content")}
              Content
            </TabsTrigger>
            <TabsTrigger
              value="finalize"
              className="flex items-center gap-2 text-primary"
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
            <ProductSection />
            <BankDetailsSection />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <TechnicalDetailsSection />
            <KeyFeaturesSection />
            <TermsConditionsSection />
          </TabsContent>

          <TabsContent value="finalize" className="space-y-6">
            <SignatureSection />
            <Card className="border-0 shadow-xl bg-gradient-to-r from-accent/20 to-accent/10">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  Quotation Summary
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                  <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Quotation Number
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {state.quotation.quotationNumber}
                    </p>
                  </div>
                  <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Total Amount
                    </p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      ₹{state.quotation.total.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Products
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {state.quotation.products.length} items
                    </p>
                  </div>
                  <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Status
                    </p>
                    <Badge
                      className={`${getStatusBadge(
                        state.quotation.status
                      )} text-sm font-bold`}
                    >
                      {state.quotation.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={handlePreview}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 shadow-lg"
                    >
                      <Eye className="w-5 h-5 mr-2" />
                      Preview & Export
                    </Button>
                    <Button
                      onClick={() => handleSaveAs("sent")}
                      variant="outline"
                      size="lg"
                      className="hover:bg-accent/50"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Mark as Sent
                    </Button>
                    <Button
                      onClick={onBackToDashboard}
                      variant="outline"
                      size="lg"
                      className="hover:bg-accent/50"
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default QuoatationPage;
