"use client";
import React from "react";
import { DriverPayout } from "@/types/payouts";

export default function PayoutConfirmationModal({
  payout,
  onClose,
  onConfirm,
}: {
  payout: DriverPayout;
  onClose: () => void;
  onConfirm: (method: "bank" | "wallet", note?: string) => void;
}) {
  const fees = Math.round(payout.amountDue * 0.005); // mock tx fee 0.5%
  const final = payout.amountDue - fees;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--color-accentBg)] border border-[var(--color-primary)] rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{payout.driverName} — Pay Now</h3>
            <p className="text-sm text-[var(--color-muted)]">Period: {payout.period}</p>
          </div>
          <button onClick={onClose} className="text-[var(--color-link)]">Close</button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div><strong>Gross</strong></div><div>₦{payout.grossEarnings.toLocaleString()}</div>
          <div><strong>Commission</strong></div><div>₦{payout.commission.toLocaleString()}</div>
          <div><strong>Net Due</strong></div><div className="font-semibold">₦{payout.amountDue.toLocaleString()}</div>
          <div><strong>Wallet Balance</strong></div><div>₦{payout.walletBalance.toLocaleString()}</div>
        </div>

        <div className="p-3 bg-[var(--color-cardBg)] rounded-lg mb-4">
          <p className="text-sm">Transaction fee (mock): ₦{fees.toLocaleString()}</p>
          <p className="text-sm font-semibold">Final payable: ₦{final.toLocaleString()}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onConfirm("bank")}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl"
          >
            Confirm Bank Transfer
          </button>

          <button
            onClick={() => onConfirm("wallet")}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl"
          >
            Pay to Wallet
          </button>

          <button
            onClick={() => onConfirm("bank", "Paid manually via bank (note)")}
            className="px-4 py-2 bg-gray-200 rounded-xl"
          >
            Confirm + Add Note
          </button>
        </div>
      </div>
    </div>
  );
}
