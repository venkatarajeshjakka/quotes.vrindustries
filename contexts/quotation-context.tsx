"use client";

import type React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import { Organization } from "./organization-context";
import { Client } from "./client-context";
import { BankDetails } from "./bank-context";

export interface ProductItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface QuotationData {
  id: string;
  quotationNumber: string;
  date: string;
  expiryDate: string;
  organization: Organization | null;
  client: Client | null;
  subject: string;
  products: ProductItem[];
  subtotal: number;
  gstRate: number;
  gstAmount: number;
  total: number;
  bankDetails: BankDetails | null;
  technicalDetails: string;
  keyFeatures: string;
  termsAndConditions: string;
  signature: string;
  status: "draft" | "sent" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

interface QuotationState {
  quotation: QuotationData;
  organizations: Organization[];
  clients: Client[];
  bankDetails: BankDetails[];
  isLoading: boolean;
  previewMode: boolean;
}

type QuotationAction =
  | { type: "UPDATE_QUOTATION"; payload: Partial<QuotationData> }
  | { type: "ADD_PRODUCT"; payload: ProductItem }
  | {
      type: "UPDATE_PRODUCT";
      payload: { id: string; product: Partial<ProductItem> };
    }
  | { type: "REMOVE_PRODUCT"; payload: string }
  | { type: "SET_ORGANIZATIONS"; payload: Organization[] }
  | { type: "SET_CLIENTS"; payload: Client[] }
  | { type: "SET_BANK_DETAILS"; payload: BankDetails[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "TOGGLE_PREVIEW" }
  | { type: "CALCULATE_TOTALS" }
  | { type: "LOAD_DRAFT"; payload: QuotationData };

const initialQuotation: QuotationData = {
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
};

const initialState: QuotationState = {
  quotation: initialQuotation,
  organizations: [
    {
      id: "1",
      name: "TechMachinery Solutions Pvt Ltd",
      address: "123 Industrial Area, Sector 15, Gurgaon, Haryana - 122001",
      phone: "+91 9876543210",
      email: "info@techmachinery.com",
      website: "www.techmachinery.com",
      gstNumber: "06AABCT1234C1Z5",
    },
  ],
  clients: [
    {
      id: "1",
      name: "Rajesh Kumar",
      company: "ABC Manufacturing Ltd",
      address: "456 Factory Road, Industrial Estate, Delhi - 110001",
      phone: "+91 9123456789",
      email: "rajesh@abcmanufacturing.com",
      gstNumber: "07AABCA1234D1Z6",
    },
  ],
  bankDetails: [
    {
      id: "1",
      bankName: "HDFC Bank",
      accountNumber: "12345678901234",
      ifscCode: "HDFC0001234",
      accountHolderName: "TechMachinery Solutions Pvt Ltd",
      branch: "Gurgaon Sector 15",
    },
  ],
  isLoading: false,
  previewMode: false,
};

function quotationReducer(
  state: QuotationState,
  action: QuotationAction
): QuotationState {
  switch (action.type) {
    case "UPDATE_QUOTATION":
      return {
        ...state,
        quotation: {
          ...state.quotation,
          ...action.payload,
          updatedAt: new Date().toISOString(),
        },
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: [...state.quotation.products, action.payload],
          updatedAt: new Date().toISOString(),
        },
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: state.quotation.products.map((product) =>
            product.id === action.payload.id
              ? { ...product, ...action.payload.product }
              : product
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        quotation: {
          ...state.quotation,
          products: state.quotation.products.filter(
            (product) => product.id !== action.payload
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    case "SET_ORGANIZATIONS":
      return { ...state, organizations: action.payload };
    case "SET_CLIENTS":
      return { ...state, clients: action.payload };
    case "SET_BANK_DETAILS":
      return { ...state, bankDetails: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "TOGGLE_PREVIEW":
      return { ...state, previewMode: !state.previewMode };
    case "CALCULATE_TOTALS":
      const subtotal = state.quotation.products.reduce(
        (sum, product) => sum + product.amount,
        0
      );
      const gstAmount = (subtotal * state.quotation.gstRate) / 100;
      const total = subtotal + gstAmount;
      return {
        ...state,
        quotation: {
          ...state.quotation,
          subtotal,
          gstAmount,
          total,
        },
      };
    case "LOAD_DRAFT":
      return {
        ...state,
        quotation: action.payload,
      };
    default:
      return state;
  }
}

const QuotationContext = createContext<{
  state: QuotationState;
  dispatch: React.Dispatch<QuotationAction>;
} | null>(null);

export function QuotationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quotationReducer, initialState);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.quotation.id) {
        localStorage.setItem(
          `quotation-${state.quotation.id}`,
          JSON.stringify(state.quotation)
        );
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [state.quotation]);

  // Calculate totals when products change
  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTALS" });
  }, [state.quotation.products, state.quotation.gstRate]);

  // Load clients

  return (
    <QuotationContext.Provider value={{ state, dispatch }}>
      {children}
    </QuotationContext.Provider>
  );
}

export function useQuotation() {
  const context = useContext(QuotationContext);
  if (!context) {
    throw new Error("useQuotation must be used within a QuotationProvider");
  }
  return context;
}
