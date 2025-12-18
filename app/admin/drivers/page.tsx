// app/admin/drivers/page.tsx
"use client";
import React, { useMemo, useState } from "react";
import type { DriverProfile } from "@/types/driver";

// mock drivers
const MOCK: DriverProfile[] = [
  { id: "DRV001", fullName: "Ibrahim Musa", phone: "+234800000001", status: "pending", city: "Abuja", rating: 4.6, trips: 128, earnings: 540000, onboardingStep: 1, createdAt: "2025-01-10", lastActive: "2025-12-01" },
  { id: "DRV002", fullName: "Grace Anthony", phone: "+234800000002", status: "active", city: "Lagos", rating: 4.9, trips: 224, earnings: 920000, onboardingStep: 5, createdAt: "2024-07-02", lastActive: "2025-12-09" },
  { id: "DRV003", fullName: "John Samuel", phone: "+234800000003", status: "suspended", city: "Kano", rating: 3.8, trips: 60, earnings: 210000, onboardingStep: 4, createdAt: "2023-11-11", lastActive: "2025-10-20" },
];

export default function DriversListPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const drivers = useMemo(() => {
    return MOCK.filter(d => {
      const matchQuery = query === "" || [d.fullName, d.phone, d.id, d.city].some(v => v?.toLowerCase().includes(query.toLowerCase()));
      const statusOk = statusFilter === "all" || d.status === (statusFilter as any);
      return matchQuery && statusOk;
    });
  }, [query, statusFilter]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Drivers</h1>

      <div className="flex gap-3 items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, id, phone, city..."
          className="px-4 py-2 rounded-xl border w-96 bg-[var(--color-formBg)]"
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-[var(--color-formBg)]">
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <div className="bg-[var(--color-accentBg)] rounded-2xl overflow-hidden shadow">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-cardBg)]">
            <tr>
              <th className="p-3 text-left">Driver</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Trips</th>
              <th className="p-3 text-left">Earnings</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map(d => (
              <tr key={d.id} className="border-b hover:bg-[var(--color-accentBg)]">
                <td className="p-3 font-medium">{d.fullName} <div className="text-xs text-[var(--color-muted)]">{d.id}</div></td>
                <td className="p-3">{d.phone}</td>
                <td className="p-3">{d.city}</td>
                <td className="p-3">{d.rating.toFixed(1)}</td>
                <td className="p-3">{d.trips}</td>
                <td className="p-3">₦{d.earnings.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${d.status === "active" ? "bg-green-100 text-green-800" : d.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{d.status}</span>
                </td>
                <td className="p-3">
                  <a href={`/admin/drivers/${d.id}`} className="text-[var(--color-link)]">View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {drivers.length === 0 && <p className="p-6 text-center text-[var(--color-muted)]">No drivers found</p>}
      </div>
    </div>
  );
}
