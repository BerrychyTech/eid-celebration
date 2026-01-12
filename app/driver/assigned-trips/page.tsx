"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { TIME_BUCKETS } from "@/constants/timeBuckets";
import { groupByTimeWindow } from "@/lib/driverAssignmentsAdapter";
import { useAuthStore } from "@/store/useAuthStore";
import DriverNavbar from "@/components/DriverNavbar";
import Footer from "@/components/Footer";

export default function AssignedTripsPage() {
  const [mode, setMode] = useState<"ride" | "fleet">("ride");
  const [activeTrip, setActiveTrip] = useState<any>(null);
  const [assignedTrips, setAssignedTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = useAuthStore.getState().token;
  
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get("/driver/assignments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },});

        console.log("RESPONSE BODY:", res.data);

        const { bookings, deliveries, fleetRequests } = res.data.data;

      const grouped = groupByTimeWindow(
        mode === "ride" ? bookings : fleetRequests,
        mode === "ride" ? deliveries : []
      );

        setAssignedTrips(grouped);
      } catch (err) {
        console.error("Failed to load driver assignments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [mode]);

  if (loading) {
    return (
      <div className="pt-24 text-center text-muted">
        Loading assigned trips…
      </div>
    );
  }

  return (
    <>
      <DriverNavbar/>
      <div className="pt-20 px-4 max-w-7xl mx-auto space-y-6">
        {/* Toggle */}
        <div className="flex gap-2">
          {["ride", "fleet"].map((t) => (
            <button
              key={t}
              onClick={() => setMode(t as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                mode === t
                  ? "bg-primary text-white"
                  : "border text-primary"
              }`}
            >
              {t === "ride" ? "Ride Requests" : "Fleet Requests"}
            </button>
          ))}
        </div>

        {TIME_BUCKETS.map((bucket) => {
          const trips = assignedTrips.filter(
            (t) => t.hour >= bucket.from && t.hour <= bucket.to
          );

          if (trips.length === 0) return null;

          return (
            <div key={bucket.label} className="space-y-3">
              <h3 className="font-semibold text-muted">{bucket.label}</h3>

              {trips.map((trip) => (
                <div key={trip.id} className="bg-cardBg p-4 rounded-xl shadow border">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold">
                        {mode === "ride"
                          ? `${trip.fromTown} → ${trip.toTown}`
                          : `${trip.pickupTown} → ${trip.destinationTown}`}
                      </h4>
                      <p className="text-sm text-muted">
                        {mode === "ride"
                          ? `${trip.vehicle} • ${trip.travelDate}`
                          : `${trip.vehicleType} • ${trip.eventDate} ${trip.eventTime}`}
                      </p>

                      {mode === "ride" && (
                        <p className="text-sm">
                          {trip.rides.length} passenger(s)
                          {trip.deliveries?.length > 0 &&
                            ` • ${trip.deliveries.length} delivery(ies)`}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setActiveTrip(trip)}
                      className="h-fit px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}

            </div>
          );
        })}

        {activeTrip && (
          <TripWindowModal
            open={!!activeTrip}
            trip={activeTrip}
            mode={mode}
            showDeliveries={mode === "ride"}
            onClose={() => setActiveTrip(null)}
          />
        )}
      </div>
      <Footer/>
    </>  
  );
}


interface Props {
  open: boolean;
  onClose: () => void;
  trip: any;
  mode: "ride" | "fleet";
  showDeliveries: boolean;
}

function TripWindowModal({
  open,
  onClose,
  trip,
  showDeliveries,
  mode
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-cardBg rounded-xl w-full max-w-lg p-5 space-y-4 shadow-xl">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">
            {mode === "ride"
              ? `${trip.fromTown} → ${trip.toTown}`
              : `${trip.pickupTown} → ${trip.destinationTown}`
            }
          </h3>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

      {/* Passengers / Rides */}
      {mode === "ride" && (
        <div>
          <h4 className="font-medium mb-2">Passengers</h4>
          <ul className="space-y-2">
            {trip.rides.map((r: any) => (
              <li key={r.id} className="text-sm flex justify-between">
                <span>{r.passenger}</span>
                <span>{r.seats} seat(s)</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Deliveries */}
      {mode === "ride" && trip.deliveries?.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Deliveries</h4>
          <ul className="space-y-2">
            {trip.deliveries.map((d: any) => (
              <li key={d.id} className="text-sm flex justify-between">
                <span>{d.item}</span>
                <span>{d.receiverName}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Fleet details */}
      {mode === "fleet" && (
        <div className="space-y-2">
          <p>
            <strong>Event Type:</strong> {trip.eventType}
          </p>
          <p>
            <strong>Vehicle Type:</strong> {trip.vehicleType}
          </p>
          <p>
            <strong>Quantity:</strong> {trip.quantity}
          </p>
          <p>
            <strong>Price:</strong> ₦{trip.tripPrice}
          </p>
          <p>
            <strong>Status:</strong> {trip.status}
          </p>
        </div>
      )}


        <button
          onClick={onClose}
          className="w-full bg-primary text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

