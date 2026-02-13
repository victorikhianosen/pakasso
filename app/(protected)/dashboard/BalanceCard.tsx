"use client";

import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BalanceCard() {
  const { user } = useUser();

  /* ======================================
     STATE
  ====================================== */
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [cachedUser, setCachedUser] = useState(null);

  // show cached immediately, update when user loads
  const displayUser = user || cachedUser;

  /* ======================================
     LOAD BALANCE VISIBILITY
  ====================================== */
  useEffect(() => {
    const saved = localStorage.getItem("balanceVisible");
    if (saved !== null) setBalanceVisible(saved === "true");
  }, []);

  /* ======================================
     LOAD CACHED USER (instant render)
  ====================================== */
  useEffect(() => {
    const savedUser = localStorage.getItem("cachedUser");
    if (savedUser) setCachedUser(JSON.parse(savedUser));
  }, []);

  /* ======================================
     SAVE USER TO CACHE WHEN UPDATED
  ====================================== */
  useEffect(() => {
    if (user) {
      localStorage.setItem("cachedUser", JSON.stringify(user));
      setCachedUser(user);
    }
  }, [user]);

  /* ======================================
     TOGGLE BALANCE
  ====================================== */
  const toggleBalance = () => {
    const next = !balanceVisible;
    setBalanceVisible(next);
    localStorage.setItem("balanceVisible", String(next));
  };

  /* ======================================
     SUPER RELIABLE COPY FUNCTION
     (works on Chrome, Safari, mobile, http)
  ====================================== */
  const copyAccount = () => {
    const text = String(displayUser?.accountno ?? "");

    if (!text) {
      toast.error("Account number not available");
      return;
    }

    try {
      // Create hidden textarea (MOST reliable method)
      const textarea = document.createElement("textarea");
      textarea.value = text;

      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      // iOS fix
      textarea.setSelectionRange(0, 99999);

      const successful = document.execCommand("copy");

      document.body.removeChild(textarea);

      if (successful) {
        toast.success("Copied ✓");
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Copy failed");
    }
  };

  /* ======================================
     RENDER
  ====================================== */
  return (
    <div
      className="
        rounded-3xl
        bg-gradient-to-br from-primary to-[#1f272f]
        text-white
        p-8
        shadow-xl
      "
    >
      <div className="flex flex-col md:flex-row justify-between gap-8">

        {/* ================= LEFT (BALANCE) ================= */}
        <div className="flex-1 space-y-6">
          <p className="text-sm opacity-80">Available Balance</p>

          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {balanceVisible
                ? `${displayUser?.currency ?? "₦"}${Number(
                    displayUser?.balance ?? 0
                  ).toLocaleString()}`
                : "•••••••"}
            </h1>

            <button
              onClick={toggleBalance}
              className="opacity-70 hover:opacity-100 text-lg cursor-pointer"
            >
              👁
            </button>
          </div>

          <Link
            href="/bank-transfer"
            className="
              inline-block
              bg-yellow-400
              text-primary
              px-6 py-2
              rounded-xl
              font-semibold
              hover:scale-95
              transition
              cursor-pointer
            "
          >
            Transfer
          </Link>
        </div>

        {/* ================= RIGHT (ACCOUNT INFO) ================= */}
        <div
          className="
            relative
            backdrop-blur-md
            rounded-2xl
            p-6
            min-w-[260px]
            space-y-4
          "
        >
          {/* COPY BUTTON */}
          <button
            onClick={copyAccount}
            className="
              absolute top-4 right-4
              text-xs
              bg-white/20
              px-3 py-1.5
              rounded-lg
              hover:bg-white/30
              transition
              cursor-pointer
              active:scale-95
            "
          >
            Copy
          </button>

          {/* Account Name */}
          <div>
            <p className="text-xs opacity-70">Account Name</p>
            <p className="font-semibold capitalize">
              {displayUser?.first_name} {displayUser?.last_name}
            </p>
          </div>

          {/* Account Number */}
          <div>
            <p className="text-xs opacity-70">Account Number</p>
            <p className="font-semibold tracking-wider">
              {displayUser?.accountno || "—"}
            </p>
          </div>

          {/* Bank */}
          <div>
            <p className="text-xs opacity-70">Bank</p>
            <p className="font-semibold">Asset Matrix MFB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
