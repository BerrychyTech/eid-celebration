"use client";

import { useState } from "react";

/* ================= TYPES ================= */

type TripStatus = "scheduled" | "ongoing" | "completed" | "delayed";

type FleetTrip = {
  id: string;
  company: string;
  route: string;
  vehicles: number;
  driverLead: string;
  startTime: string;
  status: TripStatus;
};

type Driver = {
  id: string;
  name: string;
};

/* ================= MOCK DATA ================= */

const mockTodayTrips: FleetTrip[] = [
  {
    id: "FT-3001",
    company: "Zenith Events",
    route: "Lekki → Eko Hotel",
    vehicles: 10,
    driverLead: "Ibrahim Musa",
    startTime: "08:30 AM",
    status: "delayed",
  },
  {
    id: "FT-3002",
    company: "GreenLine Logistics",
    route: "Ikeja → VI",
    vehicles: 4,
    driverLead: "Samuel Ade",
    startTime: "08:30 AM",
    status: "delayed",
  },
  {
    id: "FT-3003",
    company: "BlueWave Ltd",
    route: "Yaba → Apapa",
    vehicles: 6,
    driverLead: "Tunde Balogun",
    startTime: "07:00 AM",
    status: "completed",
  },
  {
    id: "FT-3004",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "07:00 AM",
    status: "completed",
  },
  {
   id: "FT-3008",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "07:00 AM",
    status: "completed",
  },
  {
      id: "FT-3005",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "07:00 AM",
    status: "completed",
  },
  {
      id: "FT-3009",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "09:15 AM",
    status: "ongoing",
  },
  {    
    id: "FT-30010",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "09:15 AM",
    status: "ongoing",
  },
  {
      id: "FT-30012",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "09:15 AM",
    status: "ongoing",
  },
  {
      id: "FT-30013",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "09:15 AM",
    status: "ongoing",
  },
    {
      id: "FT-30015",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "12:15 AM",
    status: "scheduled",
  },
    {
      id: "FT-30020",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "12:15 AM",
    status: "scheduled",
  },
    {
      id: "FT-30021",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "12:15 AM",
    status: "scheduled",
  },
    {
      id: "FT-30025",
    company: "Metro Works",
    route: "Ojota → Ikorodu",
    vehicles: 3,
    driverLead: "Sadiq Lawal",
    startTime: "12:15 AM",
    status: "scheduled",
  },
];

const mockDrivers: Driver[] = [
  { id: "DRV-1", name: "Ibrahim Musa" },
  { id: "DRV-2", name: "Samuel Ade" },
  { id: "DRV-3", name: "Tunde Balogun" },
  { id: "DRV-4", name: "Sadiq Lawal" },
];

/* ================= PAGE ================= */

export default function TodaysFleetTripsPage() {
  const [filter, setFilter] = useState<TripStatus | "all">("all");
  const [prepareOpen, setPrepareOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [activeTrip, setActiveTrip] = useState<FleetTrip | null>(null);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [leadDriver, setLeadDriver] = useState<string | null>(null);

  // Track lead driver per trip
  const [tripLeadDrivers, setTripLeadDrivers] = useState<Record<string, string>>({});
  // Track selected drivers per trip
  const [tripAssignedDrivers, setTripAssignedDrivers] = useState<Record<string, string[]>>({});

  const trips =
    filter === "all"
      ? mockTodayTrips
      : mockTodayTrips.filter((t) => t.status === filter);

  const handleAssignDrivers = () => {
    if (activeTrip && leadDriver) {
      setTripLeadDrivers((prev) => ({
        ...prev,
        [activeTrip.id]: leadDriver,
      }));
      setTripAssignedDrivers((prev) => ({
        ...prev,
        [activeTrip.id]: selectedDrivers,
      }));
      setPrepareOpen(false);
    }
  };

  const getLeadDriverName = (tripId: string) => tripLeadDrivers[tripId] || "";
  const getAssignedDrivers = (tripId: string) => tripAssignedDrivers[tripId] || [];

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FD5C63]">Today’s Fleet Trips</h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
        >
          <option value="all">All Trips</option>
          <option value="scheduled">Scheduled</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="delayed">Delayed</option>
        </select>
      </div>

      {/* METRICS */}
      <div className="grid md:grid-cols-4 gap-6">
        <Metric label="Total Trips" value={mockTodayTrips.length} />
        <Metric label="Ongoing" value={mockTodayTrips.filter((t) => t.status === "ongoing").length} />
        <Metric label="Completed" value={mockTodayTrips.filter((t) => t.status === "completed").length} />
        <Metric label="Delayed" value={mockTodayTrips.filter((t) => t.status === "delayed").length} />
      </div>

      {/* TRIPS TABLE */}
      <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="bg-[#FFF0ED] text-neutral-700">
            <tr>
              <th className="p-4 text-left">Trip ID</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Route</th>
              <th className="p-4 text-center">Vehicles</th>
              <th className="p-4 text-left">Lead Driver</th>
              <th className="p-4 text-left">Start Time</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((t) => (
              <tr key={t.id} className="border-t border-[#FFEDE9] hover:bg-[#FFF9F7]">
                <td className="p-4 font-medium">{t.id}</td>
                <td className="p-4">{t.company}</td>
                <td className="p-4">{t.route}</td>
                <td className="p-4 text-center">{t.vehicles}</td>
                <td className="p-4">{getLeadDriverName(t.id)}</td>
                <td className="p-4">{t.startTime}</td>
                <td className="p-4"><StatusBadge status={t.status} /></td>
                <td className="p-4 text-right flex gap-2 justify-end">
                  <button
                    onClick={() => {
                      setActiveTrip(t);
                      setSelectedDrivers(getAssignedDrivers(t.id));
                      setLeadDriver(getLeadDriverName(t.id) || null);
                      setPrepareOpen(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-[#FD5C63] text-white text-xs hover:opacity-90"
                  >
                    Prepare
                  </button>

                  <button
                    onClick={() => {
                      setActiveTrip(t);
                      setViewOpen(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs hover:opacity-90"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {trips.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-neutral-500">
                  No fleet trips for today.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PREPARE MODAL */}
      {prepareOpen && activeTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#FD5C63]">Prepare Trip – {activeTrip.id}</h2>
              <button onClick={() => setPrepareOpen(false)} className="text-sm text-neutral-500 hover:text-black">✕</button>
            </div>

            <div className="space-y-3">
              {mockDrivers.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-3 border rounded-xl">
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

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setPrepareOpen(false)} className="px-4 py-2 text-sm rounded-xl border">Cancel</button>
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

      {/* VIEW MODAL */}
      {viewOpen && activeTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#FD5C63]">Trip Details – {activeTrip.id}</h2>
              <button onClick={() => setViewOpen(false)} className="text-sm text-neutral-500 hover:text-black">✕</button>
            </div>

            <div className="space-y-3 text-sm">
              <p><strong>Company:</strong> {activeTrip.company}</p>
              <p><strong>Route:</strong> {activeTrip.route}</p>
              <p><strong>Vehicles:</strong> {activeTrip.vehicles}</p>
              <p><strong>Start Time:</strong> {activeTrip.startTime}</p>
              <p><strong>Status:</strong> <StatusBadge status={activeTrip.status} /></p>
              <p><strong>Assigned Drivers:</strong></p>
              <ul className="ml-4 list-disc">
                {getAssignedDrivers(activeTrip.id).map((driverId) => {
                  const driver = mockDrivers.find((d) => d.id === driverId);
                  const isLead = leadDriver === driverId || tripLeadDrivers[activeTrip.id] === driverId;
                  return (
                    <li key={driverId} className={isLead ? "font-bold text-[#FD5C63]" : ""}>
                      {driver?.name} {isLead ? "(Lead)" : ""}
                    </li>
                  );
                })}
                {getAssignedDrivers(activeTrip.id).length === 0 && <li>No drivers assigned</li>}
              </ul>
            </div>

            <div className="flex justify-end pt-4">
              <button onClick={() => setViewOpen(false)} className="px-4 py-2 text-sm rounded-xl border">Close</button>
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
    status === "completed"
      ? "bg-green-100 text-green-700"
      : status === "ongoing"
      ? "bg-blue-100 text-blue-700"
      : status === "delayed"
      ? "bg-red-100 text-red-700"
      : "bg-orange-100 text-orange-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}
