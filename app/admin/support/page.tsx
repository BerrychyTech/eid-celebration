"use client";

import React, { useState } from "react";
import SupportTable from "@/components/support/SupportTable";
import TicketModal from "@/components/support/TicketModal";
import ComplaintPanel from "@/components/support/ComplaintPanel";
import SafetyPanel from "@/components/support/SafetyPanel";

import { mockTickets, mockComplaints, mockSafetyFlags } from "@/mock/mockSupport";
import { SupportTicket, Complaint, SafetyFlag } from "@/types/support";

export default function SupportDashboardPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [complaints] = useState<Complaint[]>(mockComplaints);
  const [flags, setFlags] = useState<SafetyFlag[]>(mockSafetyFlags);

  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(null);
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(null);

  function saveTicket(updated: SupportTicket) {
    setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  function resolveTicket(id: string, action: "resolve" | "close") {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: action === "resolve" ? "resolved" : "closed", updatedAt: new Date().toISOString() } : t
      )
    );
    setActiveTicket(null);
  }

  function inspectComplaint(c: Complaint) {
    setActiveComplaint(c);
    // In a real app, you would open a modal — for now we mark it selected
  }

  function blockDriver(driverId: string) {
    // mock action: turn on a flag 'active=false' and add a note to complaints
    setFlags((prev) => prev.map((f) => (f.subjectId === driverId ? { ...f, active: false } : f)));
    alert(`Driver ${driverId} blocked from receiving trips (mock).`);
  }

  function contactEmergency(subjectId: string, subjectType: "driver" | "user") {
    // mock behaviour
    alert(`Contact emergency responders or next-of-kin for ${subjectType} ${subjectId} (mock).`);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Support Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SupportTable tickets={tickets} onOpen={(t) => setActiveTicket(t)} />
        </div>

        <div className="space-y-4">
          <ComplaintPanel complaints={complaints} onInspect={inspectComplaint} />
          <SafetyPanel flags={flags} onBlockDriver={blockDriver} onContactEmergency={contactEmergency} />
        </div>
      </div>

      {activeTicket && (
        <TicketModal ticket={activeTicket} onClose={() => setActiveTicket(null)} onSave={saveTicket} onResolve={resolveTicket} />
      )}

      {activeComplaint && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl border border-[var(--color-primary)]">
            <h3 className="text-lg font-semibold">Complaint — {activeComplaint.id}</h3>
            <p className="text-sm text-[var(--color-muted)]">Against: {activeComplaint.against} · {activeComplaint.againstId}</p>
            <p className="mt-3">{activeComplaint.details}</p>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setActiveComplaint(null)} className="px-4 py-2 bg-gray-200 rounded-xl">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
