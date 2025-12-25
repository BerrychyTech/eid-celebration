"use client";

import { useState } from "react";

type TripStatus = "completed" | "cancelled" | "failed";

type PastFleetTrip = {
  id: string;
  company: string;
  route: string;
  vehicles: number;
  drivers: string[];        // 👈 NEW
  tripDate: string;
  startTime: string;
  status: TripStatus;
};

const mockPastTrips: PastFleetTrip[] = [
  {
    id: "PFT-5001",
    company: "Zenith Events",
    route: "Lekki → Eko Hotel",
    vehicles: 10,
    drivers: [
      "Ibrahim Musa (Lead)",
      "Samuel Ade",
      "Tunde Balogun",
      "Sadiq Lawal",
    ],
    tripDate: "18 Sept 2025",
    startTime: "07:00 AM",
    status: "completed",
  },
  {
    id: "PFT-5002",
    company: "GreenLine Logistics",
    route: "Ikeja → Apapa",
    vehicles: 6,
    drivers: [
      "Ibrahim Musa (Lead)",
      "Samuel Ade",
      "Tunde Balogun",
      "Sadiq Lawal",
    ],    tripDate: "18 Sept 2025",
    startTime: "08:30 AM",
    status: "completed",
  },
  {
    id: "PFT-5003",
    company: "BlueWave Ltd",
    route: "Yaba → VI",
    vehicles: 8,
    drivers: [
      "Ibrahim Musa (Lead)",
      "Samuel Ade",
      "Tunde Balogun",
      "Sadiq Lawal",
    ],    tripDate: "17 Sept 2025",
    startTime: "06:45 AM",
    status: "cancelled",
  },
];

export default function PastFleetTripsPage() {
  const [filter, setFilter] = useState<TripStatus | "all">("all");
  const [activeTrip, setActiveTrip] = useState<PastFleetTrip | null>(null);

  const trips =
    filter === "all"
      ? mockPastTrips
      : mockPastTrips.filter((t) => t.status === filter);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FD5C63]">
          Past Fleet Trips
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
        >
          <option value="all">All Trips</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* METRICS */}
      <div className="grid md:grid-cols-4 gap-6">
        <Metric label="Total Trips" value={mockPastTrips.length} />
        <Metric
          label="Completed"
          value={mockPastTrips.filter((t) => t.status === "completed").length}
        />
        <Metric
          label="Cancelled"
          value={mockPastTrips.filter((t) => t.status === "cancelled").length}
        />
        <Metric
          label="Failed"
          value={mockPastTrips.filter((t) => t.status === "failed").length}
        />
      </div>

      {/* TABLE (HORIZONTAL SCROLL) */}
      <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-[#FFF0ED] text-neutral-700">
            <tr>
              <th className="p-4 text-left">Trip ID</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Route</th>
              <th className="p-4 text-center">Vehicles</th>
              <th className="p-4 text-left">Lead Driver</th>
              <th className="p-4 text-left">Trip Date</th>
              <th className="p-4 text-left">Start Time</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((t) => (
              <tr
                key={t.id}
                className="border-t border-[#FFEDE9] hover:bg-[#FFF9F7]"
              >
                <td className="p-4 font-medium">{t.id}</td>
                <td className="p-4">{t.company}</td>
                <td className="p-4">{t.route}</td>
                <td className="p-4 text-center">{t.vehicles}</td>
                <td className="p-4">
                {t.drivers[0]}
                </td>
                <td className="p-4">{t.tripDate}</td>
                <td className="p-4">{t.startTime}</td>
                <td className="p-4">
                  <StatusBadge status={t.status} />
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setActiveTrip(t)}
                    className="px-4 py-2 rounded-lg bg-[#FD5C63] text-white text-xs hover:opacity-90"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {trips.length === 0 && (
              <tr>
                <td colSpan={9} className="p-6 text-center text-neutral-500">
                  No past fleet trips found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      <TripDetailsModal
        trip={activeTrip}
        onClose={() => setActiveTrip(null)}
      />
    </div>
  );
}

/* ================= MODAL ================= */

function TripDetailsModal({
  trip,
  onClose,
}: {
  trip: PastFleetTrip | null;
  onClose: () => void;
}) {
  if (!trip) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[460px] space-y-5">
        <h3 className="text-lg font-semibold text-[#FD5C63]">
          Trip Details
        </h3>

        <Detail label="Trip ID" value={trip.id} />
        <Detail label="Company" value={trip.company} />
        <Detail label="Route" value={trip.route} />
        <Detail label="Vehicles" value={trip.vehicles.toString()} />
        <Detail label="Trip Date" value={trip.tripDate} />
        <Detail label="Start Time" value={trip.startTime} />
        <Detail label="Status" value={trip.status} />

        {/* DRIVERS LIST */}
        <div>
          <p className="text-sm text-neutral-500 mb-2">Assigned Drivers</p>
          <ul className="space-y-2">
            {trip.drivers.map((driver, index) => (
              <li
                key={index}
                className="px-3 py-2 rounded-lg bg-[#FFF0ED] text-sm"
              >
                {driver}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


/* ================= UI ================= */

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-[#FFEDE9] shadow">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: TripStatus }) {
  const styles =
    status === "completed"
      ? "bg-green-100 text-green-700"
      : status === "cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-neutral-200 text-neutral-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
