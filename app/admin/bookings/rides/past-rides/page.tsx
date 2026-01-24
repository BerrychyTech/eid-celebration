"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

/* ---------------- TYPES ---------------- */

type RideStatus = "scheduled";

type Ride = {
  bookingId: number;
  userId: number;
  fullName: string;
  email: string;
  phone: string;

  fromTown: string;
  toTown: string;
  currentState: string;
  destinationState: string;

  pickupLocation: string;
  pickupTime: string;
  travelDate: string;

  travelClass: "economy" | "business";
  bagCount: number;
  seats: number;

  driver: string;
  vehicle: string;
  status: string;

  cancelledAt: string | null;
  createdAt: string;

  /* derived */
  date: string;
};

/* ---------------- TIME BUCKETS ---------------- */

const TIME_BUCKETS = [
  { label: "Early Dispatch (12:00 AM – 5:59 AM)", from: 0, to: 5 },
  { label: "Morning Rush (6:00 AM – 8:59 AM)", from: 6, to: 8 },
  { label: "Mid-Morning Rollout (9:00 AM – 11:59 AM)", from: 9, to: 11 },
  { label: "Afternoon Dispatch (12:00 PM – 3:59 PM)", from: 12, to: 15 },
  { label: "Evening Wind-Down (4:00 PM – 7:59 PM)", from: 16, to: 19 },
];

type AssignedDriversMap = {
  [bucketLabel: string]: string | null;
};

/* ---------------- PAGE ---------------- */

export default function UpcomingRidesPage() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  const [viewOpen, setViewOpen] = useState(false);
  const [activeRide, setActiveRide] = useState<Ride | null>(null);

  const [assignOpen, setAssignOpen] = useState(false);
  const [activeBucket, setActiveBucket] = useState<string | null>(null);

  const [assignedDrivers, setAssignedDrivers] =
    useState<AssignedDriversMap>(
      TIME_BUCKETS.reduce((acc, b) => {
        acc[b.label] = null;
        return acc;
      }, {} as AssignedDriversMap)
    );

  /* ---------------- FETCH UPCOMING RIDES ---------------- */

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const token = useAuthStore.getState().token;

        const res = await api.get("/admin/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(res)

        const today = getTodayDate();

        const upcoming: Ride[] = res.data.data
          .filter((b: any) => normalizeDate(b.travelDate) < today)
          .map((b: any) => ({
            ...b,
            date: normalizeDate(b.travelDate),
          }));

        setRides(upcoming);
      } catch (err) {
        console.error("Failed to fetch upcoming rides", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);




  /* ---------------- GROUP UNIQUE FUTURE DATES ---------------- */

  const futureDates = Array.from(new Set(rides.map((r) => r.date))).sort();

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Upcoming Rides</h1>

      {loading && <p className="text-sm text-gray-500">Loading…</p>}

      {futureDates.map((day) => (
        <div key={day} className="space-y-8">
          <h2 className="text-lg font-semibold text-gray-700">
            {formatDate(day)}
          </h2>

          {TIME_BUCKETS.map((bucket) => {
            const bucketRides = rides.filter((r) => {
              const hour = getHour(formatPickupTime(r.pickupTime));
              return r.date === day && hour >= bucket.from && hour <= bucket.to;
            });

            if (!bucketRides.length) return null;

            const driver = assignedDrivers[bucket.label];

            return (
              <div key={bucket.label} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{bucket.label}</h3>
                    <StatusBadge />
                  </div>

                </div>

                <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[#FFF0ED]">
                      <tr>
                        <th className="p-4 text-left">Ride ID</th>
                        <th className="p-4 text-left">Passenger</th>
                        <th className="p-4 text-left">Pickup Location</th>
                        <th className="p-4 text-left">Pickup Time</th>
                        <th className="p-4 text-left">Driver</th>
                        <th className="p-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bucketRides.map((r) => (
                        <tr
                          key={r.bookingId}
                          className="border-t border-[#FFEDE9]"
                        >
                          <td className="p-4 font-medium">{r.bookingId}</td>
                          <td className="p-4">{r.fullName}</td>
                          <td className="p-4">{r.pickupLocation}</td>
                          <td className="p-4">
                            {formatPickupTime(r.pickupTime)}
                          </td>
                          <td className="p-4">
                            {driver || r.driver || "Unassigned"}
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => {
                                setActiveRide(r);
                                setViewOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#FD5C63] text-white text-xs"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <ViewRideModal
        open={viewOpen}
        ride={activeRide}
        driver={activeBucket ? assignedDrivers[activeBucket] : null}
        onClose={() => setViewOpen(false)}
      />
    </div>
  );
}

/* ---------------- VIEW MODAL (FULL DETAILS) ---------------- */

function ViewRideModal({
  open,
  ride,
  driver,
  onClose,
}: {
  open: boolean;
  ride: Ride | null;
  driver: string | null;
  onClose: () => void;
}) {
  if (!open || !ride) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] space-y-3">
        <h3 className="font-semibold text-lg text-[#FD5C63]">
          Upcoming Ride Details
        </h3>

        <Detail label="Ride ID" value={String(ride.bookingId)} />
        <Detail label="Passenger" value={ride.fullName} />
        <Detail label="Email" value={ride.email} />
        <Detail label="Phone" value={ride.phone} />
        <Detail label="Route" value={`${ride.fromTown} → ${ride.toTown}`} />
        <Detail label="Pickup Location" value={ride.pickupLocation} />
        <Detail label="Pickup Time" value={formatPickupTime(ride.pickupTime)} />
        <Detail label="Date" value={formatDate(ride.travelDate)} />
        <Detail label="Travel Class" value={ride.travelClass} />
        <Detail label="Bags" value={String(ride.bagCount)} />
        <Detail label="Seats" value={String(ride.seats)} />
        <Detail label="Driver" value={driver || ride.driver || "Unassigned"} />
        <Detail label="Vehicle" value={ride.vehicle} />
        <Detail label="Status" value={ride.status} />

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function normalizeDate(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

function getTodayDate() {
  return normalizeDate(new Date().toISOString());
}

function formatPickupTime(time: string) {
  let [h, m] = time.split(":").map(Number);
  const meridian = h >= 12 ? "PM" : "AM";
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h}:${String(m).padStart(2, "0")} ${meridian}`;
}

function getHour(time: string) {
  const [raw, meridian] = time.split(" ");
  let hour = parseInt(raw, 10);
  if (meridian === "PM" && hour !== 12) hour += 12;
  if (meridian === "AM" && hour === 12) hour = 0;
  return hour;
}

function formatDate(date: string) {
  return new Date(date).toDateString();
}

function StatusBadge() {
  return (
    <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
      scheduled
    </span>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
