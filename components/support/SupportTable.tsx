"use client";

import React, { useMemo, useState } from "react";
import { SupportTicket } from "@/types/support";

export default function SupportTable({
  tickets,
  onOpen,
}: {
  tickets: SupportTicket[];
  onOpen: (t: SupportTicket) => void;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tickets.filter((t) => {
      const matchQ =
        q === "" ||
        t.id.toLowerCase().includes(q) ||
        (t.userId ?? "").toLowerCase().includes(q) ||
        (t.contactPhone ?? "").toLowerCase().includes(q) ||
        (t.contactEmail ?? "").toLowerCase().includes(q) ||
        (t.bookingCode ?? "").toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      return matchQ && matchStatus;
    });
  }, [tickets, query, statusFilter]);

  return (
    <div className="bg-[var(--color-accentBg)] border border-[var(--color-primary)]/10 rounded-2xl p-4">
      <div className="flex gap-3 mb-3 items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ticket id, user id, phone, email, booking code or summary..."
          className="flex-1 px-3 py-2 rounded-xl border border-[var(--color-primary)]/10"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-[var(--color-primary)]/10"
        >
          <option value="all">All statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Ticket</th>
            <th>User / Contact</th>
            <th>Category</th>
            <th>Created</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} className="border-b hover:bg-[var(--color-cardBg)]">
              <td className="py-2 font-medium">{t.id}</td>
              <td className="py-2">
                {t.userId ?? <span className="text-[var(--color-muted)]">—</span>}
                <div className="text-xs text-[var(--color-muted)]">{t.contactPhone ?? t.contactEmail ?? ""}</div>
              </td>
              <td className="py-2">{t.category}</td>
              <td className="py-2">{new Date(t.createdAt).toLocaleString()}</td>
              <td className="py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  t.status === "open" ? "bg-yellow-100 text-yellow-800" :
                  t.status === "in_progress" ? "bg-blue-100 text-blue-800" :
                  "bg-green-100 text-green-800"
                }`}>{t.status}</span>
              </td>
              <td className="py-2 text-right">
                <button onClick={() => onOpen(t)} className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-xl">Open</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
