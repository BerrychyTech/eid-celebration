"use client";
import React from "react";
import { DriverPayout } from "@/types/payouts";

export default function DriverPayoutTable({
  payouts,
  onView,
  onHold,
}: {
  payouts: DriverPayout[];
  onView: (p: DriverPayout) => void;
  onHold: (driverId: string) => void;
}) {
  return (
    <div className="bg-[var(--color-accentBg)] border border-[var(--color-primary)]/20 rounded-2xl p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-3">Driver</th>
            <th>Trips</th>
            <th>Amount Due</th>
            <th>Wallet</th>
            <th>Period</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {payouts.map((p) => (
            <tr key={p.driverId} className="border-b hover:bg-white/50">
              <td className="py-3 font-medium">{p.driverName}</td>
              <td>{p.trips}</td>
              <td>₦{p.amountDue.toLocaleString()}</td>
              <td>₦{p.walletBalance.toLocaleString()}</td>
              <td>{p.period}</td>
              <td>
                <span className={`px-3 py-1 rounded-full text-xs ${p.status === "pending" ? "bg-yellow-100 text-yellow-700" : p.status === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {p.status}
                </span>
              </td>
              <td className="text-right">
                <button onClick={() => onView(p)} className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-xl mr-2">Pay</button>
                <button onClick={() => onHold(p.driverId)} className="px-3 py-1 border rounded-xl">Hold</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
