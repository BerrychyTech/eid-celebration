"use client";

import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";

export default function WalletCard({ balance = 1200 }: { balance?: number }) {
  return (
    <div className="bg-cardBg dark:bg-dark-cardBg p-4 rounded-lg shadow font-poppins">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted dark:text-dark-muted">Wallet balance</div>
          <div className="text-xl font-semibold">₦{balance.toLocaleString()}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Link href="/wallet/topup" className="inline-flex items-center gap-2 bg-primary text-white px-3 py-1 rounded hover:opacity-90 transition">
            <FaPlusCircle /> Top up
          </Link>
          <Link href="/wallet" className="text-sm text-muted dark:text-dark-muted hover:underline">Transactions</Link>
        </div>
      </div>
    </div>
  );
}
