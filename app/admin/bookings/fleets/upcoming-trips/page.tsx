"use client";

import { useState } from "react";

/* ================= TYPES ================= */

type TripStatus = "scheduled" | "cancelled";

type UpcomingFleetTrip = {
  id: string;
  company: string;
  route: string;
  vehicles: number;
  startDate: string;
  startTime: string;
  status: TripStatus;
};

type Driver = {
  id: string;
  name: string;
};

/* ================= MOCK DATA ================= */

const mockDrivers: Driver[] = [
  { id: "DRV-1", name: "Ahmed Musa" },
  { id: "DRV-2", name: "Tunde Balogun" },
  { id: "DRV-3", name: "Samuel Okoye" },
  { id: "DRV-4", name: "Ibrahim Lawal" },
];

const mockUpcomingTrips: UpcomingFleetTrip[] = [
  {
    id: "UFT-4001",
    company: "Zenith Events",
    route: "Lekki → Eko Hotel",
    vehicles: 12,
    startDate: "Tomorrow",
    startTime: "07:30 AM",
    status: "scheduled",
  },
  {
    id: "UFT-4002",
    company: "GreenLine Logistics",
    route: "Ikeja → Apapa",
    vehicles: 6,
    startDate: "Tomorrow",
    startTime: "09:00 AM",
    status: "scheduled",
  },
  {
    id: "UFT-4003",
    company: "BlueWave Ltd",
    route: "Yaba → VI",
    vehicles: 8,
    startDate: "25 Sept 2025",
    startTime: "06:45 AM",
    status: "scheduled",
  },
  {
    id: "UFT-4004",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 5,
    startDate: "28 Sept 2025",
    startTime: "08:00 AM",
    status: "cancelled",
  },
];

/* ================= PAGE ================= */

export default function UpcomingFleetTripsPage() {
  const [filter, setFilter] = useState<TripStatus | "all">("all");
  const [open, setOpen] = useState(false);
  const [activeTrip, setActiveTrip] = useState<UpcomingFleetTrip | null>(null);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [leadDriver, setLeadDriver] = useState<string | null>(null);

  // Track lead driver per trip
  const [tripLeadDrivers, setTripLeadDrivers] = useState<Record<string, string>>({});

  const trips =
    filter === "all"
      ? mockUpcomingTrips
      : mockUpcomingTrips.filter((t) => t.status === filter);

  const handleAssignDrivers = () => {
    if (activeTrip && leadDriver) {
      setTripLeadDrivers((prev) => ({
        ...prev,
        [activeTrip.id]: leadDriver,
      }));
      setOpen(false);
    }
  };

  const getLeadDriverName = (tripId: string) => {
    const driverId = tripLeadDrivers[tripId];
    const driver = mockDrivers.find((d) => d.id === driverId);
    return driver ? driver.name : "";
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FD5C63]">
          Upcoming Fleet Trips
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
        >
          <option value="all">All Trips</option>
          <option value="scheduled">Scheduled</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* METRICS */}
      <div className="grid md:grid-cols-3 gap-6">
        <Metric label="Total Upcoming Trips" value={mockUpcomingTrips.length} />
        <Metric
          label="Scheduled"
          value={mockUpcomingTrips.filter((t) => t.status === "scheduled").length}
        />
        <Metric
          label="Cancelled"
          value={mockUpcomingTrips.filter((t) => t.status === "cancelled").length}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full text-sm">
            <thead className="bg-[#FFF0ED] text-neutral-700">
              <tr>
                <th className="p-4 text-left">Trip ID</th>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Route</th>
                <th className="p-4 text-center">Vehicles</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Start Time</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Lead Driver</th>
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
                  <td className="p-4">{t.startDate}</td>
                  <td className="p-4">{t.startTime}</td>
                  <td className="p-4">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="p-4">{getLeadDriverName(t.id)}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setActiveTrip(t);
                        setSelectedDrivers([]);
                        setLeadDriver(tripLeadDrivers[t.id] || null);
                        setOpen(true);
                      }}
                      className="px-3 py-1 rounded-lg bg-[#FD5C63] text-white text-xs hover:opacity-90"
                    >
                      Prepare
                    </button>
                  </td>
                </tr>
              ))}

              {trips.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-neutral-500">
                    No upcoming fleet trips.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {open && activeTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#FD5C63]">
                Prepare Trip – {activeTrip.id}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-neutral-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* DRIVER LIST */}
            <div className="space-y-3">
              {mockDrivers.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between p-3 border rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedDrivers.includes(d.id)}
                      onChange={() =>
                        setSelectedDrivers((prev) =>
                          prev.includes(d.id)
                            ? prev.filter((id) => id !== d.id)
                            : [...prev, d.id]
                        )
                      }
                    />
                    <span className="text-sm">{d.name}</span>
                  </div>

                  <input
                    type="radio"
                    name="leadDriver"
                    disabled={!selectedDrivers.includes(d.id)}
                    checked={leadDriver === d.id}
                    onChange={() => setLeadDriver(d.id)}
                  />
                </div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm rounded-xl border"
              >
                Cancel
              </button>

              <button
                disabled={!leadDriver}
                onClick={handleAssignDrivers}
                className="px-4 py-2 text-sm rounded-xl bg-[#FD5C63] text-white disabled:opacity-50"
              >
                Assign Drivers
              </button>
            </div>
          </div>
        </div>
      )}
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
    status === "cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-orange-100 text-orange-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}
