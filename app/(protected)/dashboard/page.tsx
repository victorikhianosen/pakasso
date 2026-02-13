"use client";

import { useEffect, useRef, useState } from "react";
import QuickAction from "./QuickAction";
import BalanceCard from "./BalanceCard";
import AccountLimit from "./AccountLimit";
import RecentTransaction from "./RecentTransaction";
import { getBalance } from "@/app/actions/dashboard/get-balance.action";
import { getTransactions } from "@/app/actions/dashboard/get-transactions.action";

export default function DashboardPage() {
  const hasFetched = useRef(false);

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const load = async () => {
      try {
        const [balRes, trxRes] = await Promise.all([
          getBalance(),
          getTransactions(),
        ]);

        setBalance(balRes?.data?.balance ?? 0);
        setTransactions(trxRes?.data?.transactions ?? []);
      } catch (e) {
        console.error(e);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-8">
      <BalanceCard balance={balance} />

      <QuickAction />

      {/* ✅ pass transactions */}
      <AccountLimit transactions={transactions} />

      <RecentTransaction transactions={transactions} />
    </div>
  );
}
