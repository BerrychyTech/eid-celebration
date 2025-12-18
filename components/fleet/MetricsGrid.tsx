"use client";

import MetricsCard from "./MetricsCard";
import { FleetMetrics } from "@/types/fleetMetrics";

export default function MetricsGrid({ items }: { items: FleetMetrics[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {items.map(m => (
        <MetricsCard key={m.vehicleId} data={m} />
      ))}
    </div>
  );
}
