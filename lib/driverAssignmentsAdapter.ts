import { TIME_BUCKETS } from "@/constants/timeBuckets";

export function groupByTimeWindow(
  trips: any[],
  deliveries: any[] = []
) {
  return trips.map((trip) => {
    let hour: number | null = null;

    // 🚕 Ride bookings
    if (trip.pickupTime) {
      hour = Number(trip.pickupTime.split(":")[0]);
    }

    // 🚐 Fleet requests
    if (!hour && trip.eventTime) {
      hour = Number(trip.eventTime.split(":")[0]);
    }

    return {
      ...trip,
      hour,
      rides: trip.seats ? [trip] : [],
      deliveries: deliveries.filter(
        (d) => d.bookingId === trip.id
      ),
    };
  }).filter(t => t.hour !== null);
}

