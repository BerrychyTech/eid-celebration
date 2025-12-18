// components/admin/drivers/EarningsMetricsCard.tsx
"use client";
import React from "react";

export default function EarningsMetricsCard({ earnings }: { earnings: number; }) {
  // mocked breakdown
  const weekly = Math.round(earnings * 0.05);
  const monthly = Math.round(earnings * 0.25);

  return (
    <div className="p-4 rounded-2xl bg-[var(--color-cardBg)] shadow">
      <h3 className="font-semibold mb-2">Earnings</h3>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="p-3 bg-[var(--color-accentBg)] rounded">
          <div className="text-[var(--color-muted)]">Total</div>
          <div className="font-semibold">₦{earnings.toLocaleString()}</div>
        </div>
        <div className="p-3 bg-[var(--color-accentBg)] rounded">
          <div className="text-[var(--color-muted)]">Monthly</div>
          <div className="font-semibold">₦{monthly.toLocaleString()}</div>
        </div>
        <div className="p-3 bg-[var(--color-accentBg)] rounded">
          <div className="text-[var(--color-muted)]">Weekly</div>
          <div className="font-semibold">₦{weekly.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
