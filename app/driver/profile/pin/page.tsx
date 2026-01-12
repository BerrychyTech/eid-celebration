"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function CreatePinPage() {
  const router = useRouter();

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = useAuthStore.getState().token;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!/^\d{4}$/.test(pin)) {
      setError("PIN must be exactly 4 digits");
      return;
    }

    if (pin !== confirmPin) {
      setError("PINs do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/pin/set", 
        { pin }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("PIN created successfully 🎉");

      setTimeout(() => {
        router.push("/profile");
      }, 1200);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Failed to create PIN. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-pageBg dark:bg-dark-pageBg px-4 py-8 font-poppins">
        <div className="max-w-md mx-auto bg-cardBg dark:bg-dark-cardBg rounded-3xl p-6 shadow space-y-6">

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Lock size={28} className="text-primary dark:text-dark-primary" />
            </div>

            <h1 className="text-2xl font-semibold text-text dark:text-dark-text mt-3">
              Create Your PIN
            </h1>

            <p className="text-sm text-muted dark:text-dark-muted mt-1">
              This PIN will be used to authorize payments
            </p>
          </div>

          {error && (
            <p className="text-center text-red-500 text-sm">{error}</p>
          )}

          {success && (
            <p className="text-center text-green-500 text-sm">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Enter 4-digit PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-dark-muted focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-cardBg dark:text-dark-text"

              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-dark-muted focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-cardBg dark:text-dark-text"

              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary dark:bg-dark-primary text-white py-3 rounded-xl font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Saving PIN..." : "Create PIN"}
            </button>
            <p className="text-center text-sm text-muted dark:text-dark-muted">
            Already have a PIN?{" "}
            <Link
                href="/profile/pin/change-pin"
                className="text-primary dark:text-dark-primary font-medium hover:underline"
            >
                Change PIN
            </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
