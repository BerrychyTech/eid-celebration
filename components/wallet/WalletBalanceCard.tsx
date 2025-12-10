// components/wallet/WalletBalanceCard.tsx
"use client";

import { Copy } from "lucide-react";

export default function WalletBalanceCard({ balance }: { balance: number }) {
  return (
    <div className="bg-primary text-white rounded-2xl p-6 shadow-md">
      <p className="text-sm opacity-90">Wallet Balance</p>

      <h1 className="text-4xl font-semibold mt-1">
        ₦{balance.toLocaleString()}
      </h1>

      <button
        className="mt-5 flex items-center gap-2 bg-accentBg text-text px-4 py-2 rounded-xl font-medium"
        onClick={() => navigator.clipboard.writeText("WALLET DETAILS")}
      >
        <Copy size={16} /> Copy Wallet Funding Details
      </button>
    </div>
  );
}
