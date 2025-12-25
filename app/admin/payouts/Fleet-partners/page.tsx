"use client";

import { useState } from "react";
import { mockDriverPayouts, mockPayoutHistory } from "@/mock/mockPayouts";
import { DriverPayout, PayoutRecord } from "@/types/payouts";
import { payDriver, holdPayout, payAllPending } from "@/app/actions/payout-actions";
import DriverPayoutTable from "@/components/payouts/driver-payout-table";
import PayoutConfirmationModal from "@/components/payouts/payout-confirmation-modal";
import HistoryPanel from "@/components/payouts/history-panel";

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<DriverPayout[]>(mockDriverPayouts);
  const [history, setHistory] = useState<PayoutRecord[]>(mockPayoutHistory);
  const [active, setActive] = useState<DriverPayout | null>(null);

  function handleView(p: DriverPayout) {
    setActive(p);
  }

  function handleHold(driverId: string) {
    setPayouts((prev) => holdPayout(prev, driverId));
  }

  function handleConfirmPay(method: "bank" | "wallet", note?: string) {
    if (!active) return;
    const result = payDriver(payouts, history, active.driverId, { method, admin: "finance-admin", note });
    setPayouts(result.payouts);
    setHistory(result.history);
    setActive(null);
  }

  function handlePayAll() {
    const result = payAllPending(payouts, history, { method: "bank", admin: "finance-admin" });
    setPayouts(result.payouts);
    setHistory(result.history);
  }

  const pendingCount = payouts.filter((p) => p.status === "pending").length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Periodic Fleet Partner Payouts</h1>

      <div className="flex gap-3 items-center">
        <button onClick={handlePayAll} disabled={pendingCount === 0} className={`px-4 py-2 rounded-xl text-white ${pendingCount === 0 ? "bg-gray-300" : "bg-[var(--color-primary)]"}`}>
          Pay All Pending ({pendingCount})
        </button>

        <div className="text-sm text-[var(--color-muted)]">Pay period: Week 2 — Jan 2025</div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DriverPayoutTable payouts={payouts} onView={handleView} onHold={handleHold} />
        </div>

        <div>
          <HistoryPanel history={history} />
        </div>
      </div>

      {active && (
        <PayoutConfirmationModal payout={active} onClose={() => setActive(null)} onConfirm={handleConfirmPay} />
      )}
    </div>
  );
}
