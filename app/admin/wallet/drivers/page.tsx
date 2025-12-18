"use client";

import { useState } from "react";
import { mockDrivers,  } from "@/mock/fleetDrivers";
import { mockWithdrawals, Withdrawal } from "@/mock/mockWithdrawals";

export default function DriverWalletManagement() {
  const [drivers, setDrivers] = useState(mockDrivers);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(mockWithdrawals);

  const pendingWithdrawals = withdrawals.filter(w => w.status === "pending");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Driver Wallet Management</h1>

      {/* DRIVER WALLETS */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-700 mb-2">Driver Wallets</h2>
        <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 text-left">Driver</th>
              <th className="py-2 px-4 text-left">Wallet Balance (₦)</th>
              <th className="py-2 px-4 text-left">Bank Details</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(driver => (
              <tr key={driver.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{driver.name}</td>
                <td className="py-2 px-4">₦{driver.walletBalance.toLocaleString()}</td>
                <td className="py-2 px-4">{driver.bankName} - {driver.accountNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* WITHDRAWAL HISTORY */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-neutral-700 mb-2">Withdrawal History</h2>
        <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 text-left">Driver</th>
              <th className="py-2 px-4 text-left">Amount (₦)</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map(w => {
              const driver = drivers.find(d => d.id === w.driverId);
              if (!driver) return null;
              return (
                <tr key={w.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{driver.name}</td>
                  <td className="py-2 px-4">₦{w.amount.toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        w.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        w.status === "completed" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}
                    >
                      {w.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">{new Date(w.date).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PENDING PAYOUTS */}
      {pendingWithdrawals.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-neutral-700 mb-2">Pending Payouts</h2>
          <ul className="space-y-2">
            {pendingWithdrawals.map(w => {
              const driver = drivers.find(d => d.id === w.driverId);
              if (!driver) return null;
              return (
                <li key={w.id} className="flex justify-between bg-yellow-50 p-3 rounded-xl">
                  <span>{driver.name}</span>
                  <span>₦{w.amount.toLocaleString()}</span>
                  <span>{driver.bankName} - {driver.accountNumber}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
