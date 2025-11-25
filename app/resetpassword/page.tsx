"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/api";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Missing token in URL.");
      return;
    }

    if (!password || password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      await api.post(`/auth/reset-password/${token}`, {
        newPassword: password,
      });

      toast.success("🎉 Password reset successful!");
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to reset password. Token may be invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="max-w-md mx-auto p-6 font-poppins">
        <h1 className="text-2xl font-bold text-center mb-4">
          🔐 Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white dark:bg-dark-card p-6 rounded shadow"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-input text-black dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-input text-black dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className={`w-full py-2 rounded font-semibold transition ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary hover:bg-primary/80 text-white dark:bg-primary"
            }`}
          >
            {loading ? "Submitting..." : "Reset Password"}
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
