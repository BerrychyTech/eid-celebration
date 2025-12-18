"use server";

import { fleetMetrics } from "@/mock/fleetMetrics";

export async function getFleetMetrics() {
  return fleetMetrics;
}

export async function updateFleetMetric(vehicleId: string, updates: Partial<FleetMetrics>) {
  const item = fleetMetrics.find(v => v.vehicleId === vehicleId);
  if (!item) return null;
  Object.assign(item, updates);
  return item;
}
