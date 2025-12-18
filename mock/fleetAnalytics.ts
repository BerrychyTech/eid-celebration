import { FleetAnalytics } from "@/types/fleetAnalytics";

export const fleetAnalytics: FleetAnalytics = {
  totalEarnings: 1250000,
  weeklyEarnings: [200000, 180000, 220000, 150000],
  totalTrips: 450,
  totalDistance: 9500,
  activeVehicles: 12,
  tripsPerVehicle: [
    { vehicleId: "VH-1001", trips: 45 },
    { vehicleId: "VH-2001", trips: 30 },
    { vehicleId: "VH-3001", trips: 60 },
  ],
};
