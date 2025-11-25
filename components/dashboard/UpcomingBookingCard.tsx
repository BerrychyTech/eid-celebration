"use client";

import React from "react";
import Link from "next/link";
import { FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";

export type Booking = {
  id: number;
  fromTown: string;
  toTown: string;
  travelDate: string;
  time?: string;
  class?: string;
  seats?: number;
  status?: string;
};

export default function UpcomingBookingCard({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel?: (id: number) => void;
}) {
  return (
    <article className="bg-cardBg dark:bg-dark-cardBg p-4 rounded-lg shadow font-poppins">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted dark:text-dark-muted">Next ride</p>
          <h3 className="text-lg font-semibold">
            {booking.fromTown} → {booking.toTown}
          </h3>
          <p className="text-sm text-muted dark:text-dark-muted mt-1">
            {booking.travelDate} {booking.time ? `• ${booking.time}` : ""} • {booking.class ?? "Economy"}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <Link href={`/bookings/${booking.id}`} className="text-sm inline-flex items-center gap-2 bg-primary text-white px-3 py-1 rounded hover:opacity-90 transition">
              <FaMapMarkerAlt />
              Track
            </Link>

            <button
              onClick={() => onCancel?.(booking.id)}
              className="text-sm text-danger dark:text-dark-danger underline ml-2"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-muted dark:text-dark-muted">Seats</div>
          <div className="font-semibold">{booking.seats ?? 1}</div>
        </div>
      </div>
    </article>
  );
}
