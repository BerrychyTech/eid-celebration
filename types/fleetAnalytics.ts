export type FleetAnalytics = {
  totalEarnings: number;
  weeklyEarnings: number[];
  totalTrips: number;
  totalDistance: number;
  activeVehicles: number;
  tripsPerVehicle: { vehicleId: string; trips: number }[];
};
