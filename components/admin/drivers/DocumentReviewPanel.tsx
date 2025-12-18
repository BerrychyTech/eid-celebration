// components/admin/drivers/DocumentReviewPanel.tsx
"use client";
import React, { useState } from "react";
import type { DriverDocument } from "@/types/driver";

export default function DocumentReviewPanel({ docs, onReview }: { docs: DriverDocument[]; onReview: (docId: string, verdict: "approved" | "rejected", remark?: string) => void; }) {
  const [selected, setSelected] = useState<DriverDocument | null>(null);
  const [remark, setRemark] = useState("");

  return (
    <div className="p-4 rounded-2xl bg-[var(--color-accentBg)] shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">KYC Documents</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {docs.map(d => (
          <div key={d.id} className="p-3 border rounded-lg flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{d.type}</div>
                <div className="text-xs text-[var(--color-muted)]">Uploaded {d.uploadedAt}</div>
              </div>

              <div className="text-right">
                <div className={`px-2 py-1 rounded-full text-xs ${d.status === "pending" ? "bg-yellow-100 text-yellow-800" : d.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{d.status}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <a href={d.url} target="_blank" rel="noreferrer" className="text-[var(--color-link)] text-sm">View</a>
              <button onClick={() => { setSelected(d); setRemark(""); }} className="text-sm px-2 py-1 rounded bg-[var(--color-formBg)]">Review</button>
            </div>
          </div>
        ))}
      </div>

      {/* Review modal-ish area */}
      {selected && (
        <div className="mt-4 p-4 border rounded-lg bg-[var(--color-cardBg)]">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium">{selected.type}</div>
              <div className="text-xs text-[var(--color-muted)]">Uploaded: {selected.uploadedAt}</div>
            </div>
            <button onClick={() => setSelected(null)} className="text-[var(--color-link)] text-sm">Close</button>
          </div>

          <div className="mt-3">
            <p className="text-sm text-[var(--color-muted)]">Admin remark (optional)</p>
            <textarea value={remark} onChange={(e) => setRemark(e.target.value)} className="w-full p-2 rounded mt-2 bg-[var(--color-formBg)]" rows={3} />
          </div>

          <div className="flex gap-2 mt-3">
            <button onClick={() => { onReview(selected.id, "approved", remark); setSelected(null); }} className="px-3 py-2 rounded bg-green-600 text-white">Approve</button>
            <button onClick={() => { onReview(selected.id, "rejected", remark); setSelected(null); }} className="px-3 py-2 rounded bg-red-600 text-white">Reject</button>
          </div>
        </div>
      )}
    </div>
  );
}
