"use client";

import { useState, useEffect } from "react";
import { mockTransactions, Transaction } from "@/mock/mockTransactions";
import { getPayoutAnalytics } from "@/app/actions/payouts/actions";

type Settlement = {
  id: string;
  driverName: string;
  driverId: string;
  amount: number;
  type: "payout";
  reference: string;
  settledAt: string;
};

type TableView = "drivers" | "fleet";

export default function SettlementHistoryPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [view, setView] = useState<TableView>("drivers");

  const [driverSettlements, setDriverSettlements] = useState<Settlement[]>([]);
  const [fleetSettlements, setFleetSettlements] = useState<Settlement[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPayoutAnalytics();
      setAnalytics(data);

      const drivers: Settlement[] = mockTransactions
        .filter((t): t is Transaction => t.type === "payout" && !t.driverId.startsWith("FLEET"))
        .map((t) => ({
          id: t.id,
          driverName: t.driverName,
          driverId: t.driverId,
          amount: t.amount,
          type: "payout",
          reference: `SET-${t.id}`,
          settledAt: new Date(t.createdAt).toLocaleString(),
        }));
      setDriverSettlements(drivers);

      const fleets: Settlement[] = mockTransactions
        .filter((t): t is Transaction => t.type === "payout" && t.driverId.startsWith("FLEET"))
        .map((t) => ({
          id: t.id,
          driverName: t.driverName,
          driverId: t.driverId,
          amount: t.amount,
          type: "payout",
          reference: `SET-${t.id}`,
          settledAt: new Date(t.createdAt).toLocaleString(),
        }));
      setFleetSettlements(fleets);
    }

    fetchData();
  }, []);

  const settlementsToShow = view === "drivers" ? driverSettlements : fleetSettlements;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Settlement History</h1>

      <div className="flex gap-3">
        <button
          className={`px-4 py-2 rounded-lg ${view === "drivers" ? "bg-[#FD5C63] text-white" : "bg-gray-200"}`}
          onClick={() => setView("drivers")}
        >
          Driver Payouts
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${view === "fleet" ? "bg-[#FD5C63] text-white" : "bg-gray-200"}`}
          onClick={() => setView("fleet")}
        >
          Fleet Partner Payouts
        </button>
      </div>

      {/* table */}
      <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow overflow-x-auto">
        <table className="min-w-[1200px] w-full text-sm">
          <thead className="bg-[#FFF0ED]">
            <tr>
              <th className="p-4 text-left">Settlement ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Reference</th>
              <th className="p-4 text-left">Settled At</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {settlementsToShow.map((s) => (
              <tr key={s.id} className="border-t hover:bg-[#FFF9F7]">
                <td className="p-4 font-medium">{s.id}</td>
                <td className="p-4">{s.driverName}</td>
                <td className="p-4">{s.driverId}</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    {s.type}
                  </span>
                </td>
                <td className="p-4 font-semibold text-[#FD5C63]">
                  ₦{s.amount.toLocaleString()}
                </td>
                <td className="p-4 text-xs">{s.reference}</td>
                <td className="p-4">{s.settledAt}</td>
                <td className="p-4 text-center">
                  <button className="px-3 py-1.5 rounded-lg bg-[#FD5C63] text-white text-xs">View</button>
                </td>
              </tr>
            ))}
            {settlementsToShow.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-400">
                  No settlements found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
