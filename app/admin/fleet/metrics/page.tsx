import { getFleetMetrics } from "@/app/actions/fleetMetricsActions";
import MetricsGrid from "@/components/fleet/MetricsGrid";

export default async function FleetMetricsPage() {
  const metrics = await getFleetMetrics();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Fleet Performance Metrics</h1>
      <p className="text-neutral-600 mt-1">
        Track earnings, trip count, distance and vehicle performance.
      </p>

      <MetricsGrid items={metrics} />
    </div>
  );
}
