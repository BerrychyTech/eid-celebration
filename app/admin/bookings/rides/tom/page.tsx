"use client";

import { useState } from "react";
import { todaysFleetTrips, } from "@/mock/todaysFleetTrips";

type AssignedDriversMap = {
  [bucketLabel: string]: string | null;
};


const TIME_BUCKETS = [
  { label: "Early Dispatch (12:00 AM – 6:59 AM)", from: 0, to: 6 },
  { label: "Morning Rush (7:00 AM – 8:59 AM)", from: 7, to: 8 },
  { label: "Mid-Morning Rollout (9:00 AM – 11:59 AM)", from: 9, to: 11 },
  { label: "Afternoon Dispatch (12:00 PM – 4:59 PM)", from: 12, to: 16 },
];


export default function TodaysFleetTripsPage() {
  const [assignOpen, setAssignOpen] = useState(false);
  const [activeBucket, setActiveBucket] = useState<string | null>(null);

  const [assignedDrivers, setAssignedDrivers] = useState<AssignedDriversMap>({
    "Early Dispatch (12:00 AM – 6:59 AM)": null,
    "Morning Rush (7:00 AM – 8:59 AM)": "Ibrahim Musa",
    "Mid-Morning Rollout (9:00 AM – 11:59 AM)": null,
    "Afternoon Dispatch (12:00 PM – 4:59 PM)": "Sadiq Lawal",
  });

  function openAssign(bucketLabel: string) {
    setActiveBucket(bucketLabel);
    setAssignOpen(true);
  }

  function assignDriver(driver: string) {
    if (!activeBucket) return;

    setAssignedDrivers((prev: any) => ({
      ...prev,
      [activeBucket]: driver,
    }));

    setAssignOpen(false);
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-[#FD5C63]">
        Today’s Fleet Dispatch Board
      </h1>

      {TIME_BUCKETS.map((bucket) => {
        const trips = todaysFleetTrips.filter((t) => {
          const hour = getHour(t.startTime);
          return hour >= bucket.from && hour <= bucket.to;
        });

        if (!trips.length) return null;

        const status = trips[0].status;
        const driver = assignedDrivers[bucket.label];

        return (
          <div key={bucket.label} className="space-y-4">
            {/* TABLE HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg">{bucket.label}</h2>
                <StatusBadge status={status} />
              </div>

              {(status === "scheduled" || status === "delayed") && (
                <div className="relative group">
                  <button
                    onClick={() => openAssign(bucket.label)}
                    className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm"
                  >
                    {driver ? "Reassign Driver" : "Assign Driver"}
                  </button>

                  {/* TOOLTIP */}
                  {driver && (
                    <div className="absolute right-0 mt-2 hidden group-hover:block">
                      <div className="px-3 py-2 rounded-lg bg-black text-white text-xs whitespace-nowrap">
                        Assigned Driver: {driver}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#FFF0ED]">
                  <tr>
                    <th className="p-4 text-left">Trip ID</th>
                    <th className="p-4 text-left">Company</th>
                    <th className="p-4 text-left">Route</th>
                    <th className="p-4 text-center">Vehicles</th>
                    <th className="p-4 text-left">Start Time</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((t) => (
                    <tr key={t.id} className="border-t border-[#FFEDE9]">
                      <td className="p-4 font-medium">{t.id}</td>
                      <td className="p-4">{t.company}</td>
                      <td className="p-4">{t.route}</td>
                      <td className="p-4 text-center">{t.vehicles}</td>
                      <td className="p-4">{t.startTime}</td>
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
    </div>
  );
}


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
          Assign Lead Driver
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
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm border"
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


function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "completed"
      ? "bg-green-100 text-green-700"
      : status === "ongoing"
      ? "bg-blue-100 text-blue-700"
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
