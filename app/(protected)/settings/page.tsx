"use client";

import { useState } from "react";
import { KeyRound, RefreshCcw } from "lucide-react";
import ChangePassword from "./ChangePassword";
import ResetPassword from "./ResetPassword";

export default function SettingsPage() {
  const [tab, setTab] = useState<"change" | "reset">("change");

  return (
    <div>

      {/* ================= Tabs ================= */}
      <div className="flex bg-gray-200 p-1 rounded-2xl w-fit mx-auto mb-10">

        <button
          onClick={() => setTab("change")}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition
            ${
              tab === "change"
                ? "bg-white text-primary shadow"
                : "text-gray-500 hover:text-primary"
            }`}
        >
          <KeyRound size={15} />
          Change Password
        </button>

        <button
          onClick={() => setTab("reset")}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition
            ${
              tab === "reset"
                ? "bg-white text-primary shadow"
                : "text-gray-500 hover:text-primary"
            }`}
        >
          <RefreshCcw size={15} />
          Reset Password
        </button>
      </div>

      {/* ================= Content ================= */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">
        {tab === "change" ? <ChangePassword /> : <ResetPassword />}
      </div>
    </div>
  );
}
