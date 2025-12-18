"use client";

import React from "react";
import { Complaint } from "@/types/support";

export default function ComplaintPanel({ complaints, onInspect }: { complaints: Complaint[]; onInspect: (c: Complaint) => void; }) {
  return (
    <div className="bg-[var(--color-accentBg)] border border-[var(--color-primary)]/10 rounded-2xl p-4">
      <h3 className="font-semibold mb-3">Complaints</h3>

      <ul className="space-y-3">
        {complaints.map((c) => (
          <li key={c.id} className="p-3 bg-white rounded-xl border hover:shadow-sm">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{c.summary}</div>
                <div className="text-xs text-[var(--color-muted)]">{c.against} · {c.createdAt}</div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-sm">{c.status}</div>
                <button onClick={() => onInspect(c)} className="mt-2 px-3 py-1 bg-[var(--color-primary)] text-white rounded-xl text-sm">Inspect</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
