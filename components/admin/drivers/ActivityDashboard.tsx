// components/admin/drivers/ActivityDashboard.tsx
"use client";
import React from "react";

export default function ActivityDashboard({ driverId }: { driverId: string; }) {
  // mock activity
  const trips = [
    { id: "TR-1", date: "2025-12-06", distanceKm: 12.3, earning: 1200, status: "completed" },
    { id: "TR-2", date: "2025-12-04", distanceKm: 6.1, earning: 600, status: "completed" },
  ];

  const complaints = [
    { id: "C-1", date: "2025-11-20", summary: "Late arrival", status: "resolved" },
  ];

  return (
    <div className="p-4 rounded-2xl bg-[var(--color-accentBg)] shadow">
      <h3 className="font-semibold mb-3">Activity</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 border rounded">
          <div className="text-sm text-[var(--color-muted)] mb-2">Recent Trips</div>
          <ul className="space-y-2 text-sm">
            {trips.map(t => (
              <li key={t.id} className="flex justify-between">
                <div>
                  <div className="font-medium">{t.id}</div>
                  <div className="text-xs text-[var(--color-muted)]">{t.date} • {t.distanceKm} km</div>
                </div>
                <div className="text-right">₦{t.earning}</div>
              </li>
            ))}
            {trips.length === 0 && <div className="text-[var(--color-muted)]">No trips</div>}
          </ul>
        </div>

        <div className="p-3 border rounded">
          <div className="text-sm text-[var(--color-muted)] mb-2">Complaints</div>
          <ul className="space-y-2 text-sm">
            {complaints.map(c => (
              <li key={c.id}>
                <div className="font-medium">{c.summary}</div>
                <div className="text-xs text-[var(--color-muted)]">{c.date} • {c.status}</div>
              </li>
            ))}
            {complaints.length === 0 && <div className="text-[var(--color-muted)]">No complaints</div>}
          </ul>
        </div>
      </div>
    </div>
  );
}
