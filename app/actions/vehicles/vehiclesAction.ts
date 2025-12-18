"use server";

import { vehicles } from "@/mock/vehicles";

export async function getVehicles() {
  return vehicles;
}

export async function updateVehicleStatus(id: string, status: "active" | "inactive" | "maintenance") {
  const v = vehicles.find(v => v.id === id);
  if (!v) return null;
  v.status = status;
  return v;
}
