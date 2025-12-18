"use client";

import React from "react";
import { SafetyFlag } from "@/types/support";

export default function SafetyPanel({
  flags,
  onBlockDriver,
  onContactEmergency,
}: {
  flags: SafetyFlag[];
  onBlockDriver: (driverId: string) => void;
  onContactEmergency: (subjectId: string, subjectType: "driver" | "user") => void;
}) {
  return (
    <div className="bg-[var(--color-accentBg)] border border-[var(--color-primary)]/10 rounded-2xl p-4">
      <h3 className="font-semibold mb-3">Safety & Flags</h3>

      <ul className="space-y-3 text-sm">
        {flags.map((f) => (
          <li key={f.id} className="p-3 bg-white rounded-xl border flex justify-between items-center">
            <div>
              <div className="font-medium">{f.subjectType.toUpperCase()} · {f.subjectId}</div>
              <div className="text-xs text-[var(--color-muted)]">{f.reason} · {f.occurrences} reports</div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-xs text-[var(--color-muted)]">Last: {new Date(f.lastReported).toLocaleString()}</div>
              <div className="flex gap-2">
                <button onClick={() => onContactEmergency(f.subjectId, f.subjectType)} className="px-3 py-1 bg-yellow-500 text-white rounded-xl text-sm">Contact</button>
                {f.subjectType === "driver" && <button onClick={() => onBlockDriver(f.subjectId)} className="px-3 py-1 bg-red-600 text-white rounded-xl text-sm">Block</button>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
