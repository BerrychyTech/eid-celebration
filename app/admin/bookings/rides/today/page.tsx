"use client";

import { useState } from "react";

/* ---------------- TYPES ---------------- */

type RideStatus = "scheduled" | "completed" | "delayed";

type Ride = {
  id: string;
  passenger: string;
  pickupLocation: string;
  pickupTime: string;
  status: RideStatus;
};

type AssignedDriversMap = {
  [bucketLabel: string]: string | null;
};

/* ---------------- TIME BUCKETS ---------------- */

const TIME_BUCKETS = [
  { label: "Early Dispatch (12:00 AM – 5:59 AM)", from: 0, to: 5 },
  { label: "Morning Rush (6:00 AM – 8:59 AM)", from: 6, to: 8 },
  { label: "Mid-Morning Rollout (9:00 AM – 11:59 AM)", from: 9, to: 11 },
  { label: "Afternoon Dispatch (12:00 PM – 3:59 PM)", from: 12, to: 15 },
  { label: "Evening Wind-Down (4:00 PM – 7:59 PM)", from: 16, to: 19 },
];

/* ---------------- MOCK RIDES ---------------- */

const todaysRides: Ride[] = [
  {
    id: "R001",
    passenger: "Amina Bello",
    pickupLocation: "Wuse Zone 4",
    pickupTime: "6:15 AM",
    status: "scheduled",
  },
  {
    id: "R002",
    passenger: "Sadiq Lawal",
    pickupLocation: "Gwarimpa Estate",
    pickupTime: "7:25 AM",
    status: "scheduled",
  },
  {
    id: "R003",
    passenger: "Maryam Yusuf",
    pickupLocation: "Maitama",
    pickupTime: "9:10 AM",
    status: "completed",
  },
  {
    id: "R004",
    passenger: "Ibrahim Musa",
    pickupLocation: "Asokoro",
    pickupTime: "12:40 PM",
    status: "delayed",
  },
  {
    id: "R005",
    passenger: "Daniel Okeke",
    pickupLocation: "Garki Area 11",
    pickupTime: "4:20 PM",
    status: "scheduled",
  },
];

/* ---------------- PAGE ---------------- */

export default function TodaysRidesPage() {
  const [assignOpen, setAssignOpen] = useState(false);
  const [activeBucket, setActiveBucket] = useState<string | null>(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [activeRide, setActiveRide] = useState<Ride | null>(null);

  const [assignedDrivers, setAssignedDrivers] =
    useState<AssignedDriversMap>({
      "Early Dispatch (12:00 AM – 5:59 AM)": null,
      "Morning Rush (6:00 AM – 8:59 AM)": "Ibrahim Musa",
      "Mid-Morning Rollout (9:00 AM – 11:59 AM)": null,
      "Afternoon Dispatch (12:00 PM – 3:59 PM)": "Sadiq Lawal",
      "Evening Wind-Down (4:00 PM – 7:59 PM)": null,
    });

  function openAssign(bucketLabel: string) {
    setActiveBucket(bucketLabel);
    setAssignOpen(true);
  }

  function assignDriver(driver: string) {
    if (!activeBucket) return;

    setAssignedDrivers((prev) => ({
      ...prev,
      [activeBucket]: driver,
    }));

    setAssignOpen(false);
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-[#FD5C63]">
        Today’s Rides Dispatch Board
      </h1>

      {TIME_BUCKETS.map((bucket) => {
        let rides = todaysRides.filter((r) => {
          const hour = getHour(r.pickupTime);
          return hour >= bucket.from && hour <= bucket.to;
        });

        if (!rides.length) return null;

        /* FORCE 6 ROWS */
        if (rides.length < 6) {
          const base = rides[0];
          while (rides.length < 6) {
            rides.push({
              ...base,
              id: `${base.id}-${rides.length + 1}`,
            });
          }
        }

        const status = rides[0].status;
        const driver = assignedDrivers[bucket.label];

        return (
          <div key={bucket.label} className="space-y-4">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg">{bucket.label}</h2>
                <StatusBadge status={status} />
              </div>

              {(status === "scheduled" || status === "delayed") && (
                <button
                  onClick={() => openAssign(bucket.label)}
                  className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm"
                >
                  {driver ? "Reassign Driver" : "Assign Driver"}
                </button>
              )}
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#FFF0ED]">
                  <tr>
                    <th className="p-4 text-left">Ride ID</th>
                    <th className="p-4 text-left">Passenger</th>
                    <th className="p-4 text-left">Pickup Location</th>
                    <th className="p-4 text-left">Pickup Time</th>
                    <th className="p-4 text-left">Driver</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rides.map((r) => (
                    <tr key={r.id} className="border-t border-[#FFEDE9]">
                      <td className="p-4 font-medium">{r.id}</td>
                      <td className="p-4">{r.passenger}</td>
                      <td className="p-4">{r.pickupLocation}</td>
                      <td className="p-4">{r.pickupTime}</td>
                      <td className="p-4">{driver || "—"}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => {
                            setActiveRide(r);
                            setActiveBucket(bucket.label);
                            setViewOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#FD5C63] text-white text-xs"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <AssignDriverModal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        onAssign={assignDriver}
      />

      <ViewRideModal
        open={viewOpen}
        ride={activeRide}
        driver={activeBucket ? assignedDrivers[activeBucket] : null}
        onClose={() => setViewOpen(false)}
      />
    </div>
  );
}

/* ---------------- MODALS ---------------- */

function AssignDriverModal({
  open,
  onClose,
  onAssign,
}: {
  open: boolean;
  onClose: () => void;
  onAssign: (driver: string) => void;
}) {
  const [driver, setDriver] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[360px]">
        <h3 className="font-semibold text-lg text-[#FD5C63]">
          Assign Driver
        </h3>

        <select
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          className="w-full mt-4 px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
        >
          <option value="">Select driver</option>
          <option value="Ibrahim Musa">Ibrahim Musa</option>
          <option value="Sadiq Lawal">Sadiq Lawal</option>
          <option value="Tunde Balogun">Tunde Balogun</option>
        </select>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border text-sm">
            Cancel
          </button>
          <button
            onClick={() => driver && onAssign(driver)}
            className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm"
            disabled={!driver}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function ViewRideModal({
  open,
  ride,
  driver,
  onClose,
}: {
  open: boolean;
  ride: Ride | null;
  driver: string | null;
  onClose: () => void;
}) {
  if (!open || !ride) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[360px] space-y-4">
        <h3 className="font-semibold text-lg text-[#FD5C63]">
          Ride Details
        </h3>

        <Detail label="Ride ID" value={ride.id} />
        <Detail label="Passenger" value={ride.passenger} />
        <Detail label="Pickup Location" value={ride.pickupLocation} />
        <Detail label="Pickup Time" value={ride.pickupTime} />
        <Detail label="Status" value={ride.status} />
        <Detail label="Driver" value={driver || "Unassigned"} />

        <div className="flex justify-end pt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function StatusBadge({ status }: { status: RideStatus }) {
  const styles =
    status === "completed"
      ? "bg-green-100 text-green-700"
      : status === "delayed"
      ? "bg-red-100 text-red-700"
      : "bg-orange-100 text-orange-700";

  return (
    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs ${styles}`}>
      {status}
    </span>
  );
}

function getHour(time: string) {
  const [raw, meridian] = time.split(" ");
  let hour = parseInt(raw.split(":")[0], 10);
  if (meridian === "PM" && hour !== 12) hour += 12;
  if (meridian === "AM" && hour === 12) hour = 0;
  return hour;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
