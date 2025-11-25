"use client";

import React from "react";
import { Booking } from "./UpcomingBookingCard";
import { FaRedo } from "react-icons/fa";
import Link from "next/link";

export default function PastBookingList({
  bookings = [],
  onRebook,
}: {
  bookings?: Booking[];
  onRebook?: (id: number) => void;
}) {
  return (
    <div className="space-y-3">
      {bookings.length === 0 ? (
        <div className="text-center text-muted dark:text-dark-muted">No recent trips.</div>
      ) : (
        <ul className="space-y-3">
          {bookings.map((b) => (
            <li key={b.id} className="p-3 rounded-lg bg-cardBg dark:bg-dark-cardBg shadow flex justify-between items-center">
              <div>
                <div className="font-medium">{b.fromTown} → {b.toTown}</div>
                <div className="text-sm text-muted dark:text-dark-muted">{b.travelDate}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onRebook?.(b.id)}
                  className="text-sm inline-flex items-center gap-2 text-primary dark:text-dark-primary hover:underline"
                >
                  <FaRedo className="text-xs" /> Rebook
                </button>
                <Link href={`/bookings/${b.id}`} className="text-sm text-muted dark:text-dark-muted hover:underline">
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
