export async function getDriverAnalytics() {
  // In production, this will query DB or analytics service
  // For now, mock realistic admin metrics

  return {
    activeDrivers: 128,
    suspendedDrivers: 7,

    weeklyTrips: [320, 410, 398, 455],

    topDrivers: [
      {
        driverId: "DRV-1021",
        driverName: "Abdul Musa",
        trips: 48,
      },
      {
        driverId: "DRV-0874",
        driverName: "Samuel Okoye",
        trips: 44,
      },
      {
        driverId: "DRV-1140",
        driverName: "Zainab Bello",
        trips: 41,
      },
    ],
  };
}
