"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getBalance } from "@/app/actions/dashboard/get-balance.action";

type BalanceContextType = {
  balance: number;
  refresh: () => Promise<void>;
};

const BalanceContext = createContext<BalanceContextType | null>(null);

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(0);

  const refresh = async () => {
    const res = await getBalance();
    console.log("REFRESH BALANCE", res);

    setBalance(res?.data?.balance ?? 0);
  };

  // ✅ delay like Dashboard does
  useEffect(() => {
    const timer = setTimeout(refresh, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, refresh }}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const ctx = useContext(BalanceContext);
  if (!ctx) throw new Error("useBalance must be inside BalanceProvider");
  return ctx;
}
