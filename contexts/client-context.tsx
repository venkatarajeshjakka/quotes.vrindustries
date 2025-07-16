"use client";

import type React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";

export interface Client {
  id: string;
  name: string;
  company: string;
  address: string;
  phone: string;
  email: string;
  gstNumber?: string;
}

type ClientAction =
  | { type: "SET_CLIENTS"; payload: Client[] }
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "UPDATE_CLIENT"; payload: Client }
  | { type: "DELETE_CLIENT"; payload: string }; // payload is client id

const initialState: Client[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    company: "ABC Manufacturing Ltd",
    address: "456 Factory Road, Industrial Estate, Delhi - 110001",
    phone: "+91 9123456789",
    email: "rajesh@abcmanufacturing.com",
    gstNumber: "07AABCA1234D1Z6",
  },
];

function clientReducer(state: Client[], action: ClientAction): Client[] {
  switch (action.type) {
    case "SET_CLIENTS":
      return action.payload;
    case "ADD_CLIENT":
      const newClient = action.payload;
      return [...state, newClient];
    case "UPDATE_CLIENT":
      const updatedClient = action.payload; // Assuming payload contains the updated client object
      return state.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      );
    case "DELETE_CLIENT":
      const clientIdToDelete = action.payload; // Assuming payload is the client id to delete
      return state.filter((client) => client.id !== clientIdToDelete);
    // You can add more actions like UPDATE_CLIENT, DELETE_CLIENT, etc.
    default:
      return state;
  }
}

const ClientContext = createContext<{
  state: Client[];
  dispatch: React.Dispatch<ClientAction>;
} | null>(null);

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(clientReducer, initialState);
 
  return (
    <ClientContext.Provider value={{ state, dispatch }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useQuotation must be used within a QuotationProvider");
  }
  return context;
}
