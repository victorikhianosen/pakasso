"use client";

import { createContext, useContext } from "react";
import { User } from "@/types/user.types";

export interface UserContextType {
  user: User;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
};
