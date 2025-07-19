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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-accent/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/8 via-accent/4 to-transparent rounded-full blur-2xl opacity-40" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl opacity-30" />
      </div>

      <QuotationHeaderSection
        status={state.quotation.status}
        quotationNumber={state.quotation.quotationNumber}
        handleSaveAs={(value) => handleSaveAs(value as any)}
        handleSaveDraft={handleSaveDraft}
        handlePreview={handlePreview}
        handlePrint={handlePrint}
        handleExportPDF={handleExportPDF}
      />

      <main className="flex-1 p-3 sm:p-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="relative mb-6 sm:mb-8">
              {/* Mobile-Optimized Tab Navigation */}
              <TabsList className="grid w-full grid-cols-4 h-14 sm:h-16 bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl shadow-lg p-1.5 sm:p-2 gap-1">
                <TabsTrigger
                  value="details"
                  className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs font-semibold rounded-xl transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/50 px-1 sm:px-3 py-2 cursor-pointer"
                >
                  <div className="w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center">
                    {getTabIcon("details")}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Details</span>
                </TabsTrigger>

                <TabsTrigger
                  value="products"
                  className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs font-semibold rounded-xl transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/50 px-1 sm:px-3 py-2 cursor-pointer"
                >
                  <div className="w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center">
                    {getTabIcon("products")}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Products</span>
                </TabsTrigger>

                <TabsTrigger
                  value="content"
                  className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs font-semibold rounded-xl transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/50 px-1 sm:px-3 py-2 cursor-pointer"
                >
                  <div className="w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center">
                    {getTabIcon("content")}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Content</span>
                </TabsTrigger>

                <TabsTrigger
                  value="finalize"
                  className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs font-semibold rounded-xl transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/50 px-1 sm:px-3 py-2 cursor-pointer"
                >
                  <div className="w-5 h-5 sm:w-4 sm:h-4 flex items-center justify-center">
                    {getTabIcon("finalize")}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">Finalize</span>
                </TabsTrigger>
              </TabsList>

              {/* Mobile Tab Progress Indicator */}
              <div className="block md:hidden mt-3">
                <div className="flex items-center justify-center gap-2">
                  {["details", "products", "content", "finalize"].map((tab, index) => (
                    <div
                      key={tab}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeTab === tab
                          ? "w-8 bg-primary"
                          : index < ["details", "products", "content", "finalize"].indexOf(activeTab)
                            ? "w-4 bg-primary/60"
                            : "w-4 bg-border"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <TabsContent value="details" className="space-y-4 sm:space-y-8 animate-in fade-in-50 duration-300">
              <OrganizationSection />
              <ClientSection />
              <SubjectSection />
            </TabsContent>

            <TabsContent value="products" className="space-y-4 sm:space-y-8 animate-in fade-in-50 duration-300">
              <ProductSection />
              <BankDetailsSection />
            </TabsContent>

            <TabsContent value="content" className="space-y-4 sm:space-y-8 animate-in fade-in-50 duration-300">
              <TechnicalDetailsSection />
              <KeyFeaturesSection />
              <TermsConditionsSection />
            </TabsContent>

            <TabsContent value="finalize" className="space-y-4 sm:space-y-8">
              <SignatureSection />

              {/* Enhanced Quotation Summary Card */}
              <Card className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-card via-card/98 to-card/95 shadow-2xl hover:shadow-3xl transition-all duration-500">
                {/* Sophisticated background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-primary/5 opacity-60" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/8 to-transparent rounded-full blur-2xl opacity-25" />

                {/* Subtle border gradient */}
                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-green-500/20 via-primary/10 to-transparent opacity-60">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-card via-card/98 to-card/95" />
                </div>

                <div className="relative p-6 sm:p-8 lg:p-10">
                  {/* Enhanced Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-green-500/20 via-green-400/15 to-green-300/10 p-4 sm:p-5 rounded-2xl shadow-lg">
                        <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" />
                      </div>
                      {/* Icon glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-green-400/20 rounded-2xl blur-xl opacity-40" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                        Quotation Summary
                      </h3>
                      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                        Review your quotation details before finalizing
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Statistics Grid */}
                  <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12">
                    {/* Quote Number Card */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-card to-card/90 border border-border/30 p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full shadow-sm"></div>
                          <p className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                            Quote Number
                          </p>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-blue-600 transition-colors duration-300 break-all leading-tight">
                          {state.quotation.quotationNumber}
                        </p>
                      </div>
                    </div>

                    {/* Total Amount Card */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-card to-card/90 border border-border/30 p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-400 rounded-full shadow-sm"></div>
                          <p className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                            Total Amount
                          </p>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300">
                          ₹{state.quotation.total.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Products Card */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-card to-card/90 border border-border/30 p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full shadow-sm"></div>
                          <p className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                            Products
                          </p>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-purple-600 transition-colors duration-300">
                          {state.quotation.products.length} items
                        </p>
                      </div>
                    </div>

                    {/* Status Card */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-card to-card/90 border border-border/30 p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full shadow-sm"></div>
                          <p className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider">
                            Status
                          </p>
                        </div>
                        <Badge
                          className={`${getStatusBadge(
                            state.quotation.status
                          )} text-sm font-bold px-4 py-2 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300`}
                        >
                          {state.quotation.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action Section */}
                  <div className="border-t border-gradient-to-r from-border/50 via-border to-border/50 pt-8 sm:pt-10">
                    <div className="space-y-6">
                      {/* Primary Action */}
                      <div className="flex justify-center">
                        <Button
                          onClick={handlePreview}
                          size="lg"
                          className="group bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-primary-foreground px-8 sm:px-12 py-4 sm:py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg sm:text-xl"
                        >
                          <Eye className="w-5 h-5 sm:w-6 sm:h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                          Preview & Export
                        </Button>
                      </div>

                      {/* Secondary Actions */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
                        <Button
                          onClick={() => handleSaveAs("sent")}
                          variant="outline"
                          size="lg"
                          className="group px-6 sm:px-8 py-4 rounded-2xl border-2 border-border hover:border-primary/50 hover:bg-accent/30 font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105"
                        >
                          <FileText className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                          Mark as Sent
                        </Button>
                        <Button
                          onClick={onBackToDashboard}
                          variant="outline"
                          size="lg"
                          className="group px-6 sm:px-8 py-4 rounded-2xl border-2 border-border hover:border-primary/50 hover:bg-accent/30 font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105"
                        >
                          Back to Dashboard
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default QuoatationPage;
