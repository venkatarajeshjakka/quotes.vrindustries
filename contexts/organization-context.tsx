"use client";

import type React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";

export interface Organization {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  gstNumber?: string;
}

type OrganizationAction =
  | { type: "ADD_ORGANIZATION"; payload: Organization }
  | { type: "SET_ORGANIZATION"; payload: Organization[] }
  | { type: "UPDATE_ORGANIZATION"; payload: Organization }
  | { type: "DELETE_ORGANIZATION"; payload: string };

const initialState: Organization[] = [
  {
    id: "1",
    name: "TechMachinery Solutions Pvt Ltd",
    address: "123 Industrial Area, Sector 15, Gurgaon, Haryana - 122001",
    phone: "+91 9876543210",
    email: "info@techmachinery.com",
    website: "www.techmachinery.com",
    gstNumber: "06AABCT1234C1Z5",
  },
];

function organizationReducer(
  state: Organization[],
  action: OrganizationAction
): Organization[] {
  switch (action.type) {
    case "SET_ORGANIZATION":
      return action.payload;
    case "ADD_ORGANIZATION":
      return [...state, action.payload];
    case "UPDATE_ORGANIZATION":
      return state.map((org) =>
        org.id === action.payload.id ? action.payload : org
      );
    case "DELETE_ORGANIZATION":
      return state.filter((org) => org.id !== action.payload);
    default:
      return state;
  }
}

export const OrganizationContext = createContext<{
  state: Organization[];
  dispatch: React.Dispatch<OrganizationAction>;
} | null>(null);

export function OrganizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(organizationReducer, initialState);

  useEffect(() => {
    // Load organizations
    const savedOrganizations = localStorage.getItem("organizationDetails");
    if (savedOrganizations) {
      try {
        const organizationDetails = JSON.parse(savedOrganizations);
        dispatch({ type: "SET_ORGANIZATION", payload: organizationDetails });
      } catch (error) {
        console.error("Error loading organization details:", error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem("organizationDetails", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving organization details:", error);
    }
  }, [state]);

  return (
    <OrganizationContext.Provider value={{ state, dispatch }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganizationDetails() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error(
      "useOrganizationDetails must be used within an OrganizationProvider"
    );
  }
  return context;
}
