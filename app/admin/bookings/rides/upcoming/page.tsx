"use client";

import { useState } from "react";

/* ---------------- TYPES ---------------- */

type RideStatus = "scheduled";

type Ride = {
  id: string;
  passenger: string;
  pickupLocation: string;
  pickupTime: string;
  date: string;
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

/* ---------------- FUTURE DAYS ---------------- */

const FUTURE_DAYS = [
  "2025-12-20",
  "2025-12-21",
  "2025-12-22",
];

const PASSENGERS = [
  "Amina Bello",
  "Sadiq Lawal",
  "Maryam Yusuf",
  "Ibrahim Musa",
  "Daniel Okeke",
  "Zainab Ahmed",
];

/* ---------------- MOCK DATA ---------------- */

function generateUpcomingRides(): Ride[] {
  let rides: Ride[] = [];
  let counter = 1;

  FUTURE_DAYS.forEach((day) => {
    TIME_BUCKETS.forEach((bucket, i) => {
      PASSENGERS.forEach((p) => {
        const hour = bucket.from + 1;
        const time =
          hour === 12
            ? "12:30 PM"
            : hour > 12
            ? `${hour - 12}:30 PM`
            : `${hour}:30 AM`;

        rides.push({
          id: `UR-${counter++}`,
          passenger: p,
          pickupLocation: "Central District",
          pickupTime: time,
          date: day,
          status: "scheduled",
        });
      });
    });
  });

  return rides;
}

const upcomingRides = generateUpcomingRides();

/* ---------------- PAGE ---------------- */

export default function UpcomingRidesPage() {
  const [viewOpen, setViewOpen] = useState(false);
  const [activeRide, setActiveRide] = useState<Ride | null>(null);

  const [assignOpen, setAssignOpen] = useState(false);
  const [activeBucket, setActiveBucket] = useState<string | null>(null);

  const [assignedDrivers, setAssignedDrivers] = useState<AssignedDriversMap>(
    TIME_BUCKETS.reduce((acc, bucket) => {
      acc[bucket.label] = null;
      return acc;
    }, {} as AssignedDriversMap)
  );

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
    <div className="p-6 space-y-12">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Upcoming Rides</h1>

      {FUTURE_DAYS.map((day) => (
        <div key={day} className="space-y-8">
          <h2 className="text-lg font-semibold text-gray-700">
            {formatDate(day)}
          </h2>

          {TIME_BUCKETS.map((bucket) => {
            const rides = upcomingRides.filter((r) => {
              const hour = getHour(r.pickupTime);
              return r.date === day && hour >= bucket.from && hour <= bucket.to;
            });

            if (!rides.length) return null;

            const driver = assignedDrivers[bucket.label];

            return (
              <div key={bucket.label} className="space-y-3">
                {/* Bucket Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{bucket.label}</h3>
                    <StatusBadge />
                  </div>

                  <button
                    onClick={() => openAssign(bucket.label)}
                    className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm"
                  >
                    {driver ? "Reassign Driver" : "Assign Driver"}
                  </button>
                </div>

                {/* Rides Table */}
                <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[#FFF0ED]">
                      <tr>
                        <th className="p-4 text-left">Ride ID</th>
                        <th className="p-4 text-left">Passenger</th>
                        <th className="p-4 text-left">Pickup Location</th>
                        <th className="p-4 text-left">Pickup Time</th>
                        <th className="p-4 text-left">Driver</th>
                        <th className="p-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rides.map((r) => (
                        <tr key={r.id} className="border-t border-[#FFEDE9]">
                          <td className="p-4 font-medium">{r.id}</td>
                          <td className="p-4">{r.passenger}</td>
                          <td className="p-4">{r.pickupLocation}</td>
                          <td className="p-4">{r.pickupTime}</td>
                          <td className="p-4">{driver || "Unassigned"}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => {
                                setActiveRide(r);
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
        </div>
      ))}

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
        <h3 className="font-semibold text-lg text-[#FD5C63]">Assign Driver</h3>

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
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border text-sm"
          >
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
          Upcoming Ride Details
        </h3>

        <Detail label="Ride ID" value={ride.id} />
        <Detail label="Passenger" value={ride.passenger} />
        <Detail label="Pickup Location" value={ride.pickupLocation} />
        <Detail label="Pickup Time" value={ride.pickupTime} />
        <Detail label="Driver" value={driver || "Unassigned"} />
        <Detail label="Status" value={ride.status} />
        <Detail label="Date" value={formatDate(ride.date)} />

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function StatusBadge() {
  return (
    <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
      scheduled
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

function formatDate(date: string) {
  return new Date(date).toDateString();
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
