"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { changePassword } from "@/app/actions/settings/security/change-password.action";
import Loader from "@/components/Loader";

export default function ChangePassword() {
  // ✅ values
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ show/hide
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ errors
  const [errors, setErrors] = useState<{
    current?: string;
    new?: string;
    confirm?: string;
  }>({});

  /* ----------------------------------
     VALIDATION
  ---------------------------------- */
  function validate() {
    const newErrors: typeof errors = {};

    if (!currentPassword.trim()) {
      newErrors.current = "Current password is required";
    } else if (currentPassword.length < 8) {
      newErrors.current = "Must be at least 8 characters";
    }

    if (!newPassword.trim()) {
      newErrors.new = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.new = "Must be at least 8 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirm = "Confirm password is required";
    } else if (confirmPassword.length < 8) {
      newErrors.confirm = "Must be at least 8 characters";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  /* ----------------------------------
     SUBMIT
  ---------------------------------- */
  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    const payload = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    }

    const res = await changePassword(payload) 
    
    console.log("Change Password Response:", res);
    setLoading(false);

  
  }

  return (
 <>
 <Loader show={loading} />

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
        value={currentPassword}
        onChange={setCurrentPassword}
        error={errors.current}
      />

      {/* New */}
      <PasswordInput
        label="New Password"
        show={showNew}
        toggle={() => setShowNew(!showNew)}
        value={newPassword}
        onChange={setNewPassword}
        error={errors.new}
      />

      {/* Confirm */}
      <PasswordInput
        label="Confirm Password"
        show={showConfirm}
        toggle={() => setShowConfirm(!showConfirm)}
        value={confirmPassword}
        onChange={setConfirmPassword}
        error={errors.confirm}
      />

      <button
        onClick={handleChangePassword}
        className="w-full cursor-pointer bg-primary text-white py-3 rounded-xl font-semibold hover:scale-[0.98] transition"
      >
        Update Password
      </button>
    </div>
 </>
  );
}

/* helper component */
function PasswordInput({
  label,
  show,
  toggle,
  value,
  onChange,
  error,
}: {
  label: string;
  show: boolean;
  toggle: () => void;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 mb-2 block">
        {label}
      </label>

      <div className="relative">
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={16}
        />

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 outline-none text-sm transition
            ${error ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-primary focus:ring-primary/20"}
          `}
        />

        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* ✅ error message */}
      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
