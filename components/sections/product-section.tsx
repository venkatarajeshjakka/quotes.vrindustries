"use client";

import { useState } from "react";
import { useQuotation, type ProductItem } from "@/contexts/quotation-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AIEnhancementCard } from "@/components/ai-enhancement-card";
import { Plus, Trash2, Package, Calculator, Sparkles } from "lucide-react";

export default function ProductSection() {
  const { state, dispatch } = useQuotation();
  const [newProduct, setNewProduct] = useState<Partial<ProductItem>>({
    description: "",
    quantity: 1,
    rate: 0,
  });
  const [enhancingProductId, setEnhancingProductId] = useState<string | null>(
    null
  );
  const [enhancedDescriptions, setEnhancedDescriptions] = useState<
    Record<string, string>
  >({});
  const [showEnhancements, setShowEnhancements] = useState<
    Record<string, boolean>
  >({});

  const addProduct = () => {
    if (!newProduct.description?.trim()) {
      return;
    }

    const product: ProductItem = {
      id: `product-${Date.now()}`,
      description: newProduct.description,
      quantity: newProduct.quantity || 1,
      rate: newProduct.rate || 0,
      amount: (newProduct.quantity || 1) * (newProduct.rate || 0),
    };

    dispatch({ type: "ADD_PRODUCT", payload: product });
    setNewProduct({ description: "", quantity: 1, rate: 0 });
  };

  const updateProduct = (id: string, field: keyof ProductItem, value: any) => {
    const updates: Partial<ProductItem> = { [field]: value };

    if (field === "quantity" || field === "rate") {
      const product = state.quotation.products.find((p) => p.id === id);
      if (product) {
        const quantity = field === "quantity" ? value : product.quantity;
        const rate = field === "rate" ? value : product.rate;
        updates.amount = quantity * rate;
      }
    }

    dispatch({ type: "UPDATE_PRODUCT", payload: { id, product: updates } });
  };

  const removeProduct = (id: string) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: id });
    // Clean up enhancement states
    setEnhancedDescriptions((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
    setShowEnhancements((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const enhanceProductDescription = async (
    productId: string,
    currentDescription: string
  ) => {
    setEnhancingProductId(productId);
    setShowEnhancements((prev) => ({ ...prev, [productId]: true }));
    const PROMPT = `You are an expert in enhancing product descriptions for business quotations. Your task is to improve the product description to make it more professional and compelling. Input: "${currentDescription}" Client: ${
      state.quotation.client?.company || "Not specified"
    }, Products: ${state.quotation.products.length} items. ${
      state.quotation.subject
    }. Provide only one enhanced product description that is concise, clear, and relevant to the quotation's content.`;

    try {
      const response = await fetch("/api/gemini-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: PROMPT }),
      });
      const data = await response.json();
      if (response.ok) {
        setEnhancedDescriptions((prev) => ({
          ...prev,
          [productId]: data.output,
        }));
      }
    } catch (error) {
      console.warn("AI enhancement failed, using fallback:", error);
    } finally {
      setEnhancingProductId(null);
    }
  };

  const acceptEnhancedDescription = (productId: string) => {
    const enhanced = enhancedDescriptions[productId];
    if (enhanced) {
      updateProduct(productId, "description", enhanced);
      setEnhancedDescriptions((prev) => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
      setShowEnhancements((prev) => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
    }
  };

  const rejectEnhancement = (productId: string) => {
    setEnhancedDescriptions((prev) => {
      const newState = { ...prev };
      delete newState[productId];
      return newState;
    });
    setShowEnhancements((prev) => {
      const newState = { ...prev };
      delete newState[productId];
      return newState;
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border border-blue-100 dark:border-blue-900 bg-white dark:bg-muted/80">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-blue-900 dark:text-blue-100">
            <Package className="w-5 h-5 text-blue-500" />
            Product Details
            <span className="text-base font-normal text-blue-500 dark:text-blue-300">
              – Add your products/services
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Add New Product */}
          <div className="p-6 border-2 border-dashed border-blue-200 dark:border-blue-700 rounded-2xl bg-gradient-to-br from-blue-50/70 to-purple-50/60 dark:from-blue-900/30 dark:to-purple-900/20 shadow-sm">
            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2 text-lg">
              <Plus className="w-4 h-4" />
              Add New Product/Service
            </h4>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  Product Description
                </Label>
                <Textarea
                  value={newProduct.description || ""}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="e.g., Industrial Packaging Machine with automated controls..."
                  rows={3}
                  className="mt-1 bg-blue-50/60 dark:bg-muted/40 border border-blue-200 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={newProduct.quantity || 1}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        quantity: Number.parseInt(e.target.value) || 1,
                      }))
                    }
                    className="mt-1 bg-white dark:bg-muted/70 border border-blue-200 dark:border-blue-700 rounded-lg"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Rate (₹)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProduct.rate || 0}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        rate: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="mt-1 bg-white dark:bg-muted/70 border border-blue-200 dark:border-blue-700 rounded-lg"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Amount (₹)</Label>
                  <Input
                    value={(
                      (newProduct.quantity || 1) * (newProduct.rate || 0)
                    ).toLocaleString("en-IN")}
                    readOnly
                    className="bg-blue-50/60 dark:bg-muted/40 mt-1 font-semibold text-green-600 border border-blue-200 dark:border-blue-700 rounded-lg"
                  />
                </div>
              </div>
              <Button
                onClick={addProduct}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-md rounded-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Product List */}
          <div className="space-y-6">
            {state.quotation.products.map((product, index) => (
              <div key={product.id} className="space-y-4">
                <Card className="border border-blue-100 dark:border-blue-900 hover:shadow-xl transition-all duration-200 bg-white dark:bg-muted/80 rounded-2xl">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-bold text-lg text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Product {index + 1}
                      </h4>
                      <Button
                        onClick={() => removeProduct(product.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 dark:border-red-700 rounded-lg"
                        title="Remove Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Label className="text-sm font-medium">
                            Description
                          </Label>
                          <Button
                            onClick={() =>
                              enhanceProductDescription(
                                product.id,
                                product.description
                              )
                            }
                            disabled={enhancingProductId === product.id}
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            Enhance with AI
                          </Button>
                        </div>
                        <Textarea
                          value={product.description}
                          onChange={(e) =>
                            updateProduct(
                              product.id,
                              "description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="font-medium bg-blue-50/60 dark:bg-muted/40 border border-blue-200 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Quantity
                          </Label>
                          <Input
                            type="number"
                            min="1"
                            value={product.quantity}
                            onChange={(e) =>
                              updateProduct(
                                product.id,
                                "quantity",
                                Number.parseInt(e.target.value) || 1
                              )
                            }
                            className="mt-1 bg-white dark:bg-muted/70 border border-blue-200 dark:border-blue-700 rounded-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Rate (₹)
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={product.rate}
                            onChange={(e) =>
                              updateProduct(
                                product.id,
                                "rate",
                                Number.parseFloat(e.target.value) || 0
                              )
                            }
                            className="mt-1 bg-white dark:bg-muted/70 border border-blue-200 dark:border-blue-700 rounded-lg"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Amount (₹)
                          </Label>
                          <Input
                            value={product.amount.toLocaleString("en-IN")}
                            readOnly
                            className="bg-blue-50/60 dark:bg-muted/40 mt-1 font-semibold text-green-600 border border-blue-200 dark:border-blue-700 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {showEnhancements[product.id] && (
                  <AIEnhancementCard
                    title="Product Description"
                    originalContent={product.description}
                    enhancedContent={enhancedDescriptions[product.id] || ""}
                    isLoading={enhancingProductId === product.id}
                    onAccept={() => acceptEnhancedDescription(product.id)}
                    onReject={() => rejectEnhancement(product.id)}
                    onRegenerate={() =>
                      enhanceProductDescription(product.id, product.description)
                    }
                  />
                )}
              </div>
            ))}
          </div>

          {/* Enhanced Totals */}
          {state.quotation.products.length > 0 && (
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Quotation Summary
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700 font-medium">Subtotal:</span>
                    <span className="font-bold text-xl text-gray-900">
                      ₹{state.quotation.subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-700 font-medium">GST:</span>
                      <Select
                        value={state.quotation.gstRate.toString()}
                        onValueChange={(value) =>
                          dispatch({
                            type: "UPDATE_QUOTATION",
                            payload: { gstRate: Number.parseFloat(value) },
                          })
                        }
                      >
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="12">12%</SelectItem>
                          <SelectItem value="18">18%</SelectItem>
                          <SelectItem value="28">28%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <span className="font-bold text-xl text-gray-900">
                      ₹{state.quotation.gstAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg px-4">
                    <span className="text-lg font-bold text-gray-900">
                      Total Amount:
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{state.quotation.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
