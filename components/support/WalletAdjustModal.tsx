"use client";

import React, { useState } from "react";

export default function WalletAdjustModal({
  defaultAmount = 0,
  onClose,
  onApply,
}: {
  defaultAmount?: number;
  onClose: () => void;
  onApply: (amount: number, note?: string) => void;
}) {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [note, setNote] = useState<string>("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-60">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[var(--color-primary)]">
        <h3 className="text-lg font-semibold">Issue Compensation / Refund</h3>

        <div className="mt-3">
          <label className="text-sm text-[var(--color-muted)]">Amount (₦)</label>
          <input type="number" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border mt-1" />
        </div>

        <div className="mt-3">
          <label className="text-sm text-[var(--color-muted)]">Internal note</label>
          <textarea value={note} onChange={(e)=>setNote(e.target.value)} className="w-full px-3 py-2 rounded-xl border mt-1" />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-xl">Cancel</button>
          <button onClick={() => { onApply(amount, note); onClose(); }} className="px-4 py-2 bg-green-600 text-white rounded-xl">Issue Refund</button>
        </div>
      </div>
    </div>
  );
}
