"use client";

import React, { useState } from "react";
import { SupportTicket } from "@/types/support";
import WalletAdjustModal from "./WalletAdjustModal";

export default function TicketModal({
  ticket,
  onClose,
  onSave,
  onResolve,
}: {
  ticket: SupportTicket;
  onClose: () => void;
  onSave: (updated: SupportTicket) => void;
  onResolve: (id: string, action: "resolve" | "close") => void;
}) {
  const [local, setLocal] = useState<SupportTicket>(ticket);
  const [showWallet, setShowWallet] = useState(false);

  function addAdminNote(note: string) {
    const notes = [...(local.adminNotes ?? []), note];
    setLocal({ ...local, adminNotes: notes });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--color-accentBg)] border border-[var(--color-primary)] rounded-2xl p-6 w-full max-w-3xl">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{local.id} — {local.category}</h3>
            <p className="text-sm text-[var(--color-muted)]">{local.summary}</p>
          </div>
          <div className="text-sm text-[var(--color-muted)]">{new Date(local.createdAt).toLocaleString()}</div>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium">Details</h4>
            <p className="text-sm mt-1">{local.details ?? "No further details."}</p>

            {local.attachments?.length ? (
              <div className="mt-3 flex gap-2">
                {local.attachments.map((a) => (
                  <div key={a} className="w-28 h-20 bg-white rounded border flex items-center justify-center text-xs">{a}</div>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h4 className="font-medium">Admin Tools</h4>

            <div className="mt-2">
              <label className="text-xs text-[var(--color-muted)]">Add internal note</label>
              <div className="flex gap-2 mt-2">
                <input id="note" className="flex-1 px-3 py-2 rounded-xl border" placeholder="Write note..." />
                <button className="px-3 py-2 bg-[var(--color-primary)] text-white rounded-xl" onClick={() => {
                  const el = document.getElementById("note") as HTMLInputElement | null;
                  if (!el || !el.value.trim()) return;
                  addAdminNote(el.value.trim());
                  el.value = "";
                }}>Add</button>
              </div>
            </div>

            <div className="mt-3">
              <h5 className="text-sm font-medium">Admin Notes</h5>
              <ul className="mt-2 space-y-1 text-sm text-[var(--color-muted)]">
                {(local.adminNotes ?? []).map((n, i) => <li key={i} className="bg-white/50 p-2 rounded">{n}</li>)}
              </ul>
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={() => setShowWallet(true)} className="px-3 py-2 bg-green-600 text-white rounded-xl">Issue Refund</button>
              <button onClick={() => { onResolve(local.id, "resolve"); }} className="px-3 py-2 bg-blue-600 text-white rounded-xl">Mark Resolved</button>
              <button onClick={() => { onResolve(local.id, "close"); }} className="px-3 py-2 bg-red-600 text-white rounded-xl">Close</button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={() => { onSave(local); onClose(); }} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl">Save</button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-xl">Cancel</button>
        </div>
      </div>

      {showWallet && (
        <WalletAdjustModal onClose={() => setShowWallet(false)} defaultAmount={ticket.compensationRequested ?? 0} onApply={(amount, note) => {
          // here onApply should call server in real app. For demo we close and add note.
          addAdminNote(`Refund issued: ₦${amount} — ${note ?? "no note"}`);
          setShowWallet(false);
        }} />
      )}
    </div>
  );
}
