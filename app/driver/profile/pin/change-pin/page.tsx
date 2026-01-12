"use client";

import { useState } from "react";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function ChangePinPage() {
  const router = useRouter();

  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = useAuthStore.getState().token;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!/^\d{4}$/.test(newPin)) {
      setError("New PIN must be exactly 4 digits");
      return;
    }

    if (newPin !== confirmPin) {
      setError("New PINs do not match");
      return;
    }

    try {
      setLoading(true);

      await api.put("/pin/update", {
        oldPin,
        newPin,
      },
      {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
    );

      setSuccess("PIN updated successfully 🔒");

      setTimeout(() => {
        router.push("/profile");
      }, 1200);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        "Failed to change PIN. Try again."
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

          <div className="text-center">
            <div className="inline-flex p-4 bg-primary/10 rounded-full">
              <Lock className="text-primary dark:text-dark-primary" size={28} />
            </div>

            <h1 className="text-2xl font-semibold mt-3">
              Change PIN
            </h1>

            <p className="text-sm text-muted dark:text-dark-muted">
              Secure your account by updating your PIN
            </p>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Current PIN"
              maxLength={4}
              inputMode="numeric"
              value={oldPin}
              onChange={(e) => setOldPin(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-dark-muted focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-cardBg dark:text-dark-text"
            />

            <input
              type="password"
              placeholder="New PIN"
              maxLength={4}
              inputMode="numeric"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-dark-muted focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-cardBg dark:text-dark-text"
            />

            <input
              type="password"
              placeholder="Confirm New PIN"
              maxLength={4}
              inputMode="numeric"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-dark-muted focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-cardBg dark:text-dark-text"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-xl font-medium disabled:opacity-60"
            >
              {loading ? "Updating..." : "Change PIN"}
            </button>
            <p className="text-center text-sm text-muted dark:text-dark-muted">
            Remembered your PIN?{" "}
            <Link
                href="/profile"
                className="text-primary dark:text-dark-primary font-medium hover:underline"
            >
                Go back to profile
            </Link>
            </p>

          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
