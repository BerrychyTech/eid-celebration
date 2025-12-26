"use client";

import Link from "next/link";
import { useState } from "react";

type Mode = "rides" | "fleet";

export default function BookingsDashboard() {
  const [mode, setMode] = useState<Mode>("rides");

  const metrics =
    mode === "rides"
      ? [
          { label: "Total Rides", value: "12,480" },
          { label: "Rides Today", value: "218" },
          { label: "Ongoing Rides", value: "47" },
          { label: "Ride Revenue", value: "₦3.9M" },
        ]
      : [
          { label: "Fleet Requests", value: "412" },
          { label: "Trips Today", value: "36" },
          { label: "Active Fleets", value: "18" },
          { label: "Fleet Revenue", value: "₦8.2M" },
        ];

  const insights =
    mode === "rides"
      ? [
          "92% ride completion rate this week",
          "Peak booking hours: 7–9 AM, 4–6 PM",
          "Top issue: last-minute cancellations",
        ]
      : [
          "78% quotation approval rate",
          "Fleet utilization highest on weekdays",
          "Avg approval time: 2h 14m",
        ];

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FD5C63]">
          Bookings Control Tower
        </h1>

        {/* TOGGLE */}
        <div className="flex bg-[#FFF0ED] rounded-xl p-1">
          <ToggleButton
            active={mode === "rides"}
            label="Rides"
            onClick={() => setMode("rides")}
          />
          <ToggleButton
            active={mode === "fleet"}
            label="Fleet Requests"
            onClick={() => setMode("fleet")}
          />
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <MetricCard key={m.label} label={m.label} value={m.value} />
        ))}
      </div>

      {/* SNAPSHOT INSIGHTS */}
      <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow p-6">
        <h3 className="font-semibold text-neutral-800 mb-4">
          Snapshot Insights
        </h3>

        <ul className="space-y-2 text-sm text-neutral-600">
          {insights.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

      {/* MODE TITLE */}
      <h2 className="text-lg font-semibold text-neutral-700">
        {mode === "rides" ? "Ride Bookings" : "Fleet Bookings & Quotations"}
      </h2>

      {/* QUICK LINKS */}
      <div className="grid md:grid-cols-4 gap-6">
        {mode === "rides" ? (
          <>
            <NavCard
              title="Today’s Rides"
              desc="All rides scheduled or completed today"
              href="/admin/bookings/rides/today"
              buttonLabel="View Today"
            />
            <NavCard
              title="Upcoming Rides"
              desc="Scheduled rides yet to be completed"
              href="/admin/bookings/rides/upcoming"
              buttonLabel="View Upcoming"
            />
            <NavCard
              title="Past Rides"
              desc="Completed and cancelled ride history"
              href="/admin/bookings/rides/past"
              buttonLabel="View History"
            />
            <NavCard
              title="Ride Issues"
              desc="Disputes, cancellations, escalations"
              href="/admin/bookings/rides/issues"
              buttonLabel="View Issues"
            />
          </>
        ) : (
          <>
            <NavCard
              title="Fleet Quotations"
              desc="Review requests and assign fleet pricing"
              href="/admin/bookings/fleets/quotations"
              buttonLabel="Open Requests"
            />
            <NavCard
              title="Today’s Fleet Trips"
              desc="Fleet rides scheduled or running today"
              href="/admin/bookings/fleets/today"
              buttonLabel="View Today"
            />
            <NavCard
              title="Upcoming Fleet Trips"
              desc="Approved fleet trips awaiting execution"
              href="/admin/bookings/fleets/upcoming"
              buttonLabel="View Upcoming"
            />
            <NavCard
              title="Past Fleet Trips"
              desc="Completed and closed fleet bookings"
              href="/admin/bookings/fleets/past"
              buttonLabel="View History"
            />
          </>
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function ToggleButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
        active
          ? "bg-[#FD5C63] text-white"
          : "text-neutral-600 hover:bg-[#FFEDE9]"
      }`}
    >
      {label}
    </button>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-[#FFEDE9] shadow">
      <p className="text-sm text-neutral-500">{label}</p>
      <h3 className="text-2xl font-bold mt-2 text-neutral-800">{value}</h3>
    </div>
  );
}

function NavCard({
  title,
  desc,
  href,
  buttonLabel,
}: {
  title: string;
  desc: string;
  href: string;
  buttonLabel: string;
}) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-[#FFEDE9] shadow flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-neutral-800">{title}</h3>
        <p className="text-sm text-neutral-500 mt-2">{desc}</p>
      </div>

      <Link
        href={href}
        className="mt-4 inline-block px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm text-center hover:opacity-90"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}
