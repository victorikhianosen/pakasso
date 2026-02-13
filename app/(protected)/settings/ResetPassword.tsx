"use client";

export default function ResetPassword() {
  return (
    <div className="max-w-md mx-auto space-y-7 text-center">

      <h2 className="text-xl font-semibold text-primary">
        Reset Password
      </h2>

      <p className="text-sm text-gray-500">
        We’ll send a secure reset link to your registered email address.
      </p>

      <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:scale-[0.98] transition">
        Send Reset Link
      </button>
    </div>
  );
}
