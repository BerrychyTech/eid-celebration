"use client";

import { useState } from "react";
import api from "@/lib/api";
import { X, Lock } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EnterPinModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleVerify = async () => {
    if (!/^\d{4}$/.test(pin)) {
      setError("Enter a valid 4-digit PIN");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/users/pin/verify", { pin });

      onSuccess();
      setPin("");
      onClose();
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Incorrect PIN"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-cardBg dark:bg-dark-cardBg w-full max-w-sm rounded-2xl p-6 space-y-4">

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Lock size={20} />
            <h2 className="font-semibold">Enter PIN</h2>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <input
          type="password"
          maxLength={4}
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full text-center text-xl tracking-widest px-4 py-3 rounded-xl border outline-none"
          placeholder="••••"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-xl font-medium disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Confirm Payment"}
        </button>
      </div>
    </div>
  );
}
