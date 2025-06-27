"use client";

import { Ban } from "lucide-react";
import type React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";

export interface BankDetails {
  id: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  branch: string;
}

type BankAction =
  | { type: "ADD_BANK"; payload: BankDetails }
  | { type: "SET_BANK_DETAILS"; payload: BankDetails[] }
  | { type: "UPDATE_BANK"; payload: BankDetails }
  | { type: "DELETE_BANK"; payload: string };

const initialState: BankDetails[] = [
  {
    id: "1",
    bankName: "HDFC Bank",
    accountNumber: "12345678901234",
    ifscCode: "HDFC0001234",
    accountHolderName: "TechMachinery Solutions Pvt Ltd",
    branch: "Gurgaon Sector 15",
  },
];

function bankReducer(state: BankDetails[], action: BankAction): BankDetails[] {
  switch (action.type) {
    case "SET_BANK_DETAILS":
      return action.payload;
    case "ADD_BANK":
      return [...state, action.payload];
    case "UPDATE_BANK":
      return state.map((bank) =>
        bank.id === action.payload.id ? action.payload : bank
      );
    case "DELETE_BANK":
      return state.filter((bank) => bank.id !== action.payload);
    default:
      return state;
  }
}

const BankContext = createContext<{
  state: BankDetails[];
  dispatch: React.Dispatch<BankAction>;
} | null>(null);

export function BankProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(bankReducer, initialState);

  useEffect(() => {
    // Load clients
    const savedBanks = localStorage.getItem("bankDetails");
    if (savedBanks) {
      try {
        const bankDetails = JSON.parse(savedBanks);
        dispatch({ type: "SET_BANK_DETAILS", payload: bankDetails });
      } catch (error) {
        console.error("Error loading bank details:", error);
      }
    }
  }, []);

  return (
    <BankContext.Provider value={{ state, dispatch }}>
      {children}
    </BankContext.Provider>
  );
}

export function useBankDetails() {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error("useBankDetails must be used within a BankProvider");
  }
  return context;
}
