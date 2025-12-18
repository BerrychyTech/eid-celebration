"use server";

import { mockDrivers } from "@/mock/fleetDrivers";
import { mockFleetVehicles } from "@/mock/fleetVehicle";

export async function assignVehicle(driverId: string, vehicleId: string) {
  const driver = mockDrivers.find(d => d.id === driverId);
  if (!driver) return { error: "Driver not found" };

  const vehicle = mockFleetVehicles.find(v => v.id === vehicleId);
  if (!vehicle) return { error: "Vehicle not found" };

  if (vehicle.status !== "available") {
    return { error: "Vehicle is not available" };
  }

  driver.currentVehicle = vehicleId;
  vehicle.status = "active";

  return { success: true };
}

export async function removeVehicle(driverId: string) {
  const driver = mockDrivers.find(d => d.id === driverId);
  if (!driver || !driver.currentVehicle) {
    return { error: "Driver has no assigned vehicle" };
  }

  const vehicle = mockFleetVehicles.find(v => v.id === driver.currentVehicle);
  if (vehicle) vehicle.status = "available";

  driver.currentVehicle = undefined;

  return { success: true };
}
