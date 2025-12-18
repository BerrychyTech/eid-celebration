"use client";
import React from "react";
import { PayoutRecord } from "@/types/payouts";

export default function HistoryPanel({ history }: { history: PayoutRecord[] }) {
  return (
    <div className="bg-white border border-[var(--color-primary)]/10 rounded-2xl p-4">
      <h3 className="font-semibold mb-3">Recent Payouts</h3>
      <ul className="space-y-2 text-sm">
        {history.map((r) => (
          <li key={r.id} className="flex justify-between bg-gray-50 p-2 rounded-xl">
            <div>
              <div className="font-medium">{r.driverName}</div>
              <div className="text-xs text-[var(--color-muted)]">{new Date(r.date).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">₦{r.amount.toLocaleString()}</div>
              <div className="text-xs text-[var(--color-muted)]">{r.method}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
