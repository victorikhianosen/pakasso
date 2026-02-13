"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="max-w-md mx-auto space-y-7">

      <div className="text-center space-y-1">
        <h2 className="text-xl font-semibold text-primary">
          Change Password
        </h2>
        <p className="text-sm text-gray-500">
          Enter your current password and set a new one
        </p>
      </div>

      {/* Current */}
      <PasswordInput
        label="Current Password"
        show={showCurrent}
        toggle={() => setShowCurrent(!showCurrent)}
      />

      {/* New */}
      <PasswordInput
        label="New Password"
        show={showNew}
        toggle={() => setShowNew(!showNew)}
      />

      {/* Confirm */}
      <PasswordInput
        label="Confirm Password"
        show={showConfirm}
        toggle={() => setShowConfirm(!showConfirm)}
      />

      <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:scale-[0.98] transition">
        Update Password
      </button>
    </div>
  );
}


/* small local helper inside same file (NOT separate component file) */
function PasswordInput({
  label,
  show,
  toggle,
}: {
  label: string;
  show: boolean;
  toggle: () => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 mb-2 block">
        {label}
      </label>

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />

        <input
          type={show ? "text" : "password"}
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition"
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
