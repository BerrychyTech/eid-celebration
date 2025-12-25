"use client";

import { useState } from "react";

/* ---------------- TYPES ---------------- */

type RideStatus = "completed";

type Ride = {
  id: string;
  passenger: string;
  pickupLocation: string;
  pickupTime: string;
  status: RideStatus;
  date: string;
  driver: string;
};

/* ---------------- TIME BUCKETS ---------------- */

const TIME_BUCKETS = [
  { label: "Early Dispatch (12:00 AM – 5:59 AM)", from: 0, to: 5 },
  { label: "Morning Rush (6:00 AM – 8:59 AM)", from: 6, to: 8 },
  { label: "Mid-Morning Rollout (9:00 AM – 11:59 AM)", from: 9, to: 11 },
  { label: "Afternoon Dispatch (12:00 PM – 3:59 PM)", from: 12, to: 15 },
  { label: "Evening Wind-Down (4:00 PM – 7:59 PM)", from: 16, to: 19 },
];

/* ---------------- MOCK DATA ---------------- */

const DAYS = [
  "2025-12-16",
  "2025-12-17",
  "2025-12-18",
];

const PASSENGERS = [
  "Amina Bello",
  "Sadiq Lawal",
  "Maryam Yusuf",
  "Ibrahim Musa",
  "Daniel Okeke",
  "Zainab Ahmed",
];

function generateRides(): Ride[] {
  let rides: Ride[] = [];
  let counter = 1;

  DAYS.forEach((day) => {
    TIME_BUCKETS.forEach((bucket, i) => {
      PASSENGERS.forEach((p, idx) => {
        const hour = bucket.from + 1;
        const time =
          hour === 12
            ? "12:30 PM"
            : hour > 12
            ? `${hour - 12}:30 PM`
            : `${hour}:30 AM`;

        rides.push({
          id: `PR-${counter++}`,
          passenger: p,
          pickupLocation: "Central District",
          pickupTime: time,
          status: "completed",
          date: day,
          driver: ["Ibrahim Musa", "Sadiq Lawal", "Tunde Balogun"][i % 3],
        });
      });
    });
  });

  return rides;
}

const pastRides = generateRides();

/* ---------------- PAGE ---------------- */

export default function PastRidesPage() {
  const [viewOpen, setViewOpen] = useState(false);
  const [activeRide, setActiveRide] = useState<Ride | null>(null);

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-2xl font-bold text-[#FD5C63]">
        Past Rides History
      </h1>

      {DAYS.map((day) => (
        <div key={day} className="space-y-8">
          <h2 className="text-lg font-semibold text-gray-700">
            {formatDate(day)}
          </h2>

          {TIME_BUCKETS.map((bucket) => {
            const rides = pastRides.filter((r) => {
              const hour = getHour(r.pickupTime);
              return (
                r.date === day &&
                hour >= bucket.from &&
                hour <= bucket.to
              );
            });

            if (!rides.length) return null;

            return (
              <div key={bucket.label} className="space-y-3">
                <div>
                  <h3 className="font-semibold">{bucket.label}</h3>
                  <StatusBadge status="completed" />
                </div>

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
                        <tr
                          key={r.id}
                          className="border-t border-[#FFEDE9]"
                        >
                          <td className="p-4 font-medium">{r.id}</td>
                          <td className="p-4">{r.passenger}</td>
                          <td className="p-4">{r.pickupLocation}</td>
                          <td className="p-4">{r.pickupTime}</td>
                          <td className="p-4">{r.driver}</td>
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

      <ViewRideModal
        open={viewOpen}
        ride={activeRide}
        onClose={() => setViewOpen(false)}
      />
    </div>
  );
}

/* ---------------- MODAL ---------------- */

function ViewRideModal({
  open,
  ride,
  onClose,
}: {
  open: boolean;
  ride: Ride | null;
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
        <Detail label="Driver" value={ride.driver} />
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

function StatusBadge({ status }: { status: RideStatus }) {
  return (
    <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
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
