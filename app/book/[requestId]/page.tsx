"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams } from "next/navigation";


type Booking = {
  id: string;
  pickupTown: string;
  destinationTown: string;
  eventDate: string;
  eventTime: string;
  tripPrice: number | null;
  priceBreakdown: Record<string, any> | null;
  status: "new" | "awaiting_payment";
};

export default function UnpaidFleetBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { requestId } = useParams();
  const token = useAuthStore.getState().token;

  const fetchBookings = async () => {
    try {
      const res = await api.get(`/fleet-pricing/${requestId}/price`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(res.data?.data ? [res.data.data] : []);
      
    } catch (err) {
      console.error("Failed to fetch unpaid bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center font-poppins">
        ⏳ Loading your fleet bookings…
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="p-6 text-center font-poppins">
        🎉 You have no unpaid fleet bookings.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 font-poppins">
      <h1 className="text-2xl font-semibold">
        Unpaid Fleet Bookings
      </h1>

      <div className="space-y-5">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="rounded-2xl border border-[#FFEDE9] bg-white shadow-sm p-5"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-semibold">
                  {b.pickupTown} → {b.destinationTown}
                </p>

                <p className="text-sm text-neutral-500">
                  {new Date(b.eventDate).toDateString()} • {b.eventTime}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  b.status === "new"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {b.status === "new"
                  ? "Awaiting Pricing"
                  : "Awaiting Payment"}
              </span>
            </div>

            {/* PRICE SECTION */}
            {b.tripPrice && (
              <div className="mt-6 rounded-xl bg-[#FFF5F3] border border-[#FFD6CE] p-4">
                <p className="text-xs uppercase tracking-wide text-[#FD5C63] font-semibold">
                  Total Trip Price
                </p>

                <p className="text-3xl font-bold text-[#FD5C63] mt-1">
                  ₦{b.tripPrice.toLocaleString()}
                </p>
              </div>
            )}

            {/* PRICE BREAKDOWN */}
            {b.priceBreakdown && (
              <div className="mt-4 rounded-xl border border-[#FFEDE9] bg-[#FFF9F7] p-4">
                <p className="text-sm font-semibold mb-2">
                  Price Breakdown
                </p>

                <div className="space-y-1 text-sm">
                  {Object.entries(b.priceBreakdown).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between"
                      >
                        <span className="capitalize opacity-80">
                          {key.replace("_", " ")}
                        </span>
                        <span className="font-medium">
                          ₦{Number(value).toLocaleString()}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* ACTION */}
            {b.status === "awaiting_payment" && (
              <div className="mt-5 text-right">
                <button
                  className="bg-[#FD5C63] text-white px-6 py-2 rounded-xl font-semibold hover:opacity-90"
                  onClick={() =>
                    alert("Trigger payment flow here 💳")
                  }
                >
                  Pay Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
