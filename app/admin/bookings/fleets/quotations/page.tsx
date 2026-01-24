"use client";

import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import FleetPricingModal from "@/components/FleetPricingModal";
/* ================= TYPES ================= */

type FleetRequestStatus =
  | "new"
  | "pricing"
  | "awaiting_payment"
  | "confirmed"
  | "completed"
  | "cancelled";

type FleetRequest = {
  id: number;
  requestId: string;

  pickupTown: string;
  destinationTown: string;

  eventDate: string;
  eventTime: string;

  vehicleType: string;
  quantity: number;

  status: FleetRequestStatus;
  userId?: number;
  createdAt: string;
};

/* ================= PAGE ================= */

export default function EventFleetRequestsPage() {
  const [requests, setRequests] = useState<FleetRequest[]>([]);
  const [filter, setFilter] = useState<FleetRequestStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);

  /* -------- FETCH -------- */

  const fetchRequests = async () => {
  try {
    setLoading(true);
    setError(null);

    const token = useAuthStore.getState().token;
    if (!token) throw new Error("No auth token");

    const res = await api.get(
      "/admin/bookings/event-fleet-requests",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setRequests(res.data?.data ?? []);
  } catch (err) {
    console.error("Failed to fetch fleet requests", err);
    setError("Failed to load fleet requests");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchRequests();
  }, []);

  /* -------- DERIVED DATA -------- */

  const filtered =
    filter === "all"
      ? requests
      : requests.filter((r) => r.status === filter);

  const metrics = {
    total: requests.length,
    new: requests.filter((r) => r.status === "new").length,
    pricing: requests.filter((r) => r.status === "pricing").length,
    cancelled: requests.filter((r) => r.status === "cancelled").length,
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FD5C63]">
          Event Fleet Requests
        </h1>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as FleetRequestStatus | "all")
          }
          className="px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
        >
          <option value="all">All Requests</option>
          <option value="new">New</option>
          <option value="pricing">Pricing</option>
          <option value="awaiting_payment">Awaiting Payment</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* METRICS */}
      <div className="grid md:grid-cols-4 gap-6">
        <Metric label="Total Requests" value={metrics.total} />
        <Metric label="New" value={metrics.new} />
        <Metric label="Pricing" value={metrics.pricing} />
        <Metric label="Cancelled" value={metrics.cancelled} />
      </div>

      {/* STATES */}
      {loading && (
        <div className="p-6 text-center text-neutral-500">
          Loading fleet requests…
        </div>
      )}

      {error && (
        <div className="p-6 text-center text-red-600">{error}</div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow overflow-x-auto">
          <table className="min-w-[1100px] w-full text-sm">
            <thead className="bg-[#FFF0ED] text-neutral-700">
              <tr>
                <th className="p-4 text-left">Request ID</th>
                <th className="p-4 text-left">Route</th>
                <th className="p-4 text-center">Vehicles</th>
                <th className="p-4 text-left">Event Date</th>
                <th className="p-4 text-left">Vehicle Type</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-[#FFEDE9] hover:bg-[#FFF9F7]"
                >
                  <td className="p-4 font-medium">{r.requestId}</td>
                  <td className="p-4">
                    {r.pickupTown} → {r.destinationTown}
                  </td>
                  <td className="p-4 text-center">{r.quantity}</td>
                  <td className="p-4">
                    {new Date(r.eventDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 capitalize">{r.vehicleType}</td>
                  <td className="p-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="p-4 text-right">
                  <button
                    onClick={() => {
                      setActiveRequestId(r.requestId);
                      setShowPricingModal(true);
                    }}
                    disabled={r.status !== "new"}
                    className={`px-3 py-1 rounded-lg text-xs text-white ${
                      r.status === "new"
                        ? "bg-[#FD5C63] hover:opacity-90"
                        : "bg-neutral-300 cursor-not-allowed"
                    }`}
                  >
                    Review
                  </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-6 text-center text-neutral-500"
                  >
                    No fleet requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {showPricingModal && activeRequestId && (
            <FleetPricingModal
              requestId={activeRequestId}
              onClose={() => {
                setShowPricingModal(false);
                setActiveRequestId(null);
              }}
              onSuccess={() => {
                fetchRequests(); // refresh table after pricing
              }}
            />
          )}

        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-[#FFEDE9] shadow">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: FleetRequestStatus }) {
  const styles =
    status === "confirmed" || status === "completed"
      ? "bg-green-100 text-green-700"
      : status === "cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-orange-100 text-orange-700";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styles}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
