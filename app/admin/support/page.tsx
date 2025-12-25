"use client";

import { useState } from "react";

/* ---------------- TYPES ---------------- */

type ServiceType = "ride" | "delivery" | "fleet";
type TicketStatus = "new" | "in_progress" | "escalated" | "resolved";
type Priority = "low" | "medium" | "high" | "critical";
type UserType = "passenger" | "driver";

type Ticket = {
  id: string;
  userName: string;
  userType: UserType;
  serviceType: ServiceType;
  issueType: string;
  summary: string;
  priority: Priority;
  status: TicketStatus;
  timestamp: string;
  unread?: boolean;
};

/* ---------------- MOCK DATA ---------------- */

const TICKETS: Ticket[] = [
  {
    id: "T-001",
    userName: "Aisha M.",
    userType: "passenger",
    serviceType: "ride",
    issueType: "Ride Issue",
    summary: "Driver did not arrive at pickup",
    priority: "high",
    status: "in_progress",
    timestamp: "2h ago",
    unread: true,
  },
  {
    id: "T-002",
    userName: "Daniel O.",
    userType: "driver",
    serviceType: "delivery",
    issueType: "Payment",
    summary: "Wallet balance incorrect",
    priority: "critical",
    status: "escalated",
    timestamp: "45m ago",
    unread: true,
  },
  {
    id: "T-003",
    userName: "Zainab A.",
    userType: "passenger",
    serviceType: "fleet",
    issueType: "Booking",
    summary: "Need to modify fleet schedule",
    priority: "medium",
    status: "new",
    timestamp: "5h ago",
  },
];

/* ---------------- PAGE ---------------- */

export default function SupportTicketsPage() {
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(TICKETS[0]);
  const [search, setSearch] = useState("");

  const filteredTickets = TICKETS.filter((t) =>
    `${t.userName} ${t.id} ${t.summary}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FD5C63]">
          Support Tickets
        </h1>

        <div className="flex gap-3">
          <StatChip label="New" value={12} />
          <StatChip label="In Progress" value={7} />
          <StatChip label="Escalated" value={2} />
          <StatChip label="Resolved" value={89} />
        </div>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search user, phone, ticket ID, ride ID, delivery ID"
        className="w-full max-w-xl px-4 py-2 rounded-xl border text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* MAIN LAYOUT */}
      <div className="flex gap-6 h-[calc(100vh-220px)]">
        {/* LEFT PANEL */}
        <div className="w-[38%] bg-white rounded-2xl border overflow-y-auto">
          {filteredTickets.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTicket(t)}
              className={`w-full p-4 text-left border-b hover:bg-gray-50 ${
                t.unread || t.priority === "critical"
                  ? "font-semibold"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <ServiceBadge type={t.serviceType} />
                  <UserBadge type={t.userType} />
                </div>
                <PriorityBadge level={t.priority} />
              </div>

              <p className="text-sm">{t.issueType}</p>
              <p className="text-sm text-gray-600 truncate">
                {t.summary}
              </p>

              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <StatusBadge status={t.status} />
                <span>{t.timestamp}</span>
              </div>
            </button>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-white rounded-2xl border p-6 overflow-y-auto">
          {activeTicket ? (
            <TicketDetails ticket={activeTicket} />
          ) : (
            <p>Select a ticket</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- DETAILS ---------------- */

function TicketDetails({ ticket }: { ticket: Ticket }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{ticket.summary}</h2>

      <p className="text-sm text-gray-500">
        {ticket.userName} • {ticket.userType}
      </p>

      {ticket.serviceType === "ride" && <RideContext />}
      {ticket.serviceType === "delivery" && <DeliveryContext />}
      {ticket.serviceType === "fleet" && <FleetContext />}
    </div>
  );
}

/* ---------------- CONTEXT SECTIONS ---------------- */

function RideContext() {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Ride Context</h3>
      <ActionBtn label="Refund Passenger" />
      <ActionBtn label="Reassign Driver" />
      <ActionBtn label="Escalate Safety" />
    </div>
  );
}

function DeliveryContext() {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Delivery Context</h3>
      <ActionBtn label="Reassign Courier" />
      <ActionBtn label="Mark Lost/Damaged" />
    </div>
  );
}

function FleetContext() {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Fleet Context</h3>
      <ActionBtn label="Modify Booking" />
      <ActionBtn label="Escalate to Ops" />
    </div>
  );
}

/* ---------------- UI ATOMS ---------------- */

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-3 py-1 rounded-full bg-[#FFF0ED] text-sm">
      {label} ({value})
    </div>
  );
}

function ServiceBadge({ type }: { type: ServiceType }) {
  const map = {
    ride: "🚕 Ride",
    delivery: "🚚 Delivery",
    fleet: "🚐 Fleet",
  };
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">
      {map[type]}
    </span>
  );
}

function UserBadge({ type }: { type: UserType }) {
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100">
      {type}
    </span>
  );
}

function PriorityBadge({ level }: { level: Priority }) {
  const colors = {
    low: "bg-gray-100",
    medium: "bg-orange-100",
    high: "bg-red-100",
    critical: "bg-red-200",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colors[level]}`}>
      {level}
    </span>
  );
}

function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span className="capitalize">{status.replace("_", " ")}</span>
  );
}

function ActionBtn({ label }: { label: string }) {
  return (
    <button className="px-3 py-1.5 rounded-lg bg-[#FD5C63] text-white text-sm">
      {label}
    </button>
  );
}
