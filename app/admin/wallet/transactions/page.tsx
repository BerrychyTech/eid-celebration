"use client";

import { useState } from "react";
import { mockTransactions, Transaction } from "@/mock/mockTransactions";
import { mockDrivers } from "@/mock/fleetDrivers";
import { mockUsers } from "@/mock/mockUsers";

export default function TransactionLogs() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterSearch, setFilterSearch] = useState<string>("");

const filteredTransactions = transactions.filter(t => {
  const matchesCategory = filterCategory === "all" || t.category === filterCategory;

  const matchesSearch =
    t.userName?.toLowerCase().includes(filterSearch.toLowerCase()) ||
    t.driverName?.toLowerCase().includes(filterSearch.toLowerCase());

  return matchesCategory && matchesSearch;
});


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Transaction Logs</h1>

      {/* FILTERS */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search by user or driver..."
          value={filterSearch}
          onChange={e => setFilterSearch(e.target.value)}
          className="px-4 py-2 border rounded-xl w-full max-w-sm"
        />
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="px-4 py-2 border rounded-xl"
        >
          <option value="all">All Categories</option>
          <option value="ride">Ride</option>
          <option value="delivery">Delivery</option>
          <option value="wallet">Wallet Deposit</option>
          <option value="marketplace">Marketplace Payment</option>
        </select>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 text-left">Transaction ID</th>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Driver</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Amount (₦)</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{t.id}</td>
                <td className="py-2 px-4">{t.userName}</td>
                <td className="py-2 px-4">{t.driverName || "-"}</td>
                <td className="py-2 px-4">{t.category}</td>
                <td className="py-2 px-4">₦{t.amount.toLocaleString()}</td>
                <td className="py-2 px-4">{new Date(t.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
