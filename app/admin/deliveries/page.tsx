"use client";

import Link from "next/link";
import { useState } from "react";

type Mode = "local" | "bulk";

export default function DeliveriesDashboard() {
  const [mode, setMode] = useState<Mode>("local");

  const metrics =
    mode === "local"
      ? [
          { label: "Total Deliveries", value: "9,842" },
          { label: "Deliveries Today", value: "164" },
          { label: "In Transit", value: "53" },
          { label: "Delivery Revenue", value: "₦2.6M" },
        ]
      : [
          { label: "Bulk Requests", value: "286" },
          { label: "Active Batches", value: "21" },
          { label: "Companies Served", value: "14" },
          { label: "Bulk Revenue", value: "₦6.9M" },
        ];

  const insights =
    mode === "local"
      ? [
          "95% on-time delivery rate this week",
          "Peak delivery window: 12–3 PM",
          "Top issue: recipient unavailable",
        ]
      : [
          "82% bulk request approval rate",
          "Highest volume from corporate clients",
          "Avg dispatch prep time: 1h 35m",
        ];

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FD5C63]">
          Deliveries Control Tower
        </h1>

        {/* TOGGLE */}
        <div className="flex bg-[#FFF0ED] rounded-xl p-1">
          <ToggleButton
            active={mode === "local"}
            label="Local Deliveries"
            onClick={() => setMode("local")}
          />
          <ToggleButton
            active={mode === "bulk"}
            label="Bulk & Corporate"
            onClick={() => setMode("bulk")}
          />
        </div>
      </div>

      {/* METRICS */}
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
        {mode === "local"
          ? "Local Delivery Operations"
          : "Bulk & Corporate Deliveries"}
      </h2>

      {/* QUICK LINKS */}
      <div className="grid md:grid-cols-4 gap-6">
        {mode === "local" ? (
          <>
            <NavCard
              title="Today’s Deliveries"
              desc="All deliveries scheduled or completed today"
              href="/admin/deliveries/today"
              buttonLabel="View Today"
            />
            <NavCard
              title="Upcoming Deliveries"
              desc="Scheduled deliveries awaiting dispatch"
              href="/admin/deliveries/upcoming"
              buttonLabel="View Upcoming"
            />
            <NavCard
              title="Past Deliveries"
              desc="Completed and failed delivery history"
              href="/admin/deliveries/past"
              buttonLabel="View History"
            />
            <NavCard
              title="Delivery Issues"
              desc="Delays, failed drops, escalations"
              href="/admin/deliveries/issues"
              buttonLabel="View Issues"
            />
          </>
        ) : (
          <>
            <NavCard
              title="Bulk Delivery Requests"
              desc="Review and approve corporate delivery batches"
              href="/admin/deliveries/bulk/requests"
              buttonLabel="Open Requests"
            />
            <NavCard
              title="Active Bulk Deliveries"
              desc="Bulk deliveries currently in progress"
              href="/admin/deliveries/bulk/active"
              buttonLabel="View Active"
            />
            <NavCard
              title="Upcoming Bulk Deliveries"
              desc="Approved batches awaiting dispatch"
              href="/admin/deliveries/bulk/upcoming"
              buttonLabel="View Upcoming"
            />
            <NavCard
              title="Bulk Delivery History"
              desc="Completed and closed bulk deliveries"
              href="/admin/deliveries/bulk/past"
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
