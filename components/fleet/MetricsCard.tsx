"use client";

import { FleetMetrics } from "@/types/fleetMetrics";

export default function MetricsCard({ data }: { data: FleetMetrics }) {
  return (
    <div className="rounded-2xl p-5 shadow bg-white border border-[#FFEDE9]">
      <h3 className="text-lg font-semibold text-[#FD5C63]">
        Vehicle {data.vehicleId}
      </h3>

      <div className="mt-4 grid gap-2">
        <p className="text-sm text-neutral-700">Earnings: ₦{data.totalEarnings.toLocaleString()}</p>
        <p className="text-sm text-neutral-700">Distance: {data.distanceKm} km</p>
        <p className="text-sm text-neutral-700">Trips: {data.completedTrips}</p>
        <p className="text-xs text-neutral-500 mt-2">
          Updated {data.lastUpdated}
        </p>
      </div>
    </div>
  );
}
