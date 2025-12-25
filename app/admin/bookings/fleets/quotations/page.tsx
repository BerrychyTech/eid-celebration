"use client";

import { useState } from "react";

type QuotationStatus = "pending" | "approved" | "rejected";

type FleetQuotation = {
  id: string;
  company: string;
  route: string;
  vehicles: number;
  date: string;
  requestedBy: string;
  status: QuotationStatus;
};

const mockQuotations: FleetQuotation[] = [
  {
    id: "QT-1023",
    company: "GreenLine Logistics",
    route: "Ikeja → Victoria Island",
    vehicles: 5,
    date: "2025-12-18",
    requestedBy: "Ade O.",
    status: "pending",
  },
  {
    id: "QT-1024",
    company: "Zenith Events",
    route: "Lekki → Eko Hotel",
    vehicles: 12,
    date: "2025-12-19",
    requestedBy: "Sarah K.",
    status: "approved",
  },
  {
    id: "QT-1025",
    company: "BlueWave Ltd",
    route: "Yaba → Apapa",
    vehicles: 3,
    date: "2025-12-17",
    requestedBy: "Daniel P.",
    status: "rejected",
  },
];

export default function FleetQuotationsPage() {
  const [filter, setFilter] = useState<QuotationStatus | "all">("all");

  const filtered = mockQuotations.filter(
    (q) => filter === "all" || q.status === filter
  );

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FD5C63]">
          Fleet Quotations
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* METRICS */}
      <div className="grid md:grid-cols-4 gap-6">
        <Metric label="Total Requests" value={mockQuotations.length} />
        <Metric
          label="Pending"
          value={mockQuotations.filter((q) => q.status === "pending").length}
        />
        <Metric
          label="Approved"
          value={mockQuotations.filter((q) => q.status === "approved").length}
        />
        <Metric
          label="Rejected"
          value={mockQuotations.filter((q) => q.status === "rejected").length}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF0ED] text-neutral-700">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Route</th>
              <th className="p-4 text-center">Vehicles</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Requested By</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((q) => (
              <tr
                key={q.id}
                className="border-t border-[#FFEDE9] hover:bg-[#FFF9F7]"
              >
                <td className="p-4 font-medium">{q.id}</td>
                <td className="p-4">{q.company}</td>
                <td className="p-4">{q.route}</td>
                <td className="p-4 text-center">{q.vehicles}</td>
                <td className="p-4">{q.date}</td>
                <td className="p-4">{q.requestedBy}</td>
                <td className="p-4">
                  <StatusBadge status={q.status} />
                </td>
                <td className="p-4 text-right">
                  <button className="px-3 py-1 rounded-lg bg-[#FD5C63] text-white text-xs hover:opacity-90">
                    Review
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="p-6 text-center text-neutral-500"
                >
                  No quotations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-[#FFEDE9] shadow">
      <p className="text-sm text-neutral-500">{label}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}

function StatusBadge({ status }: { status: QuotationStatus }) {
  const styles =
    status === "approved"
      ? "bg-green-100 text-green-700"
      : status === "rejected"
      ? "bg-red-100 text-red-700"
      : "bg-orange-100 text-orange-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}
