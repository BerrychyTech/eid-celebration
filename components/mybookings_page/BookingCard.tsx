import Link from "next/link";
import { Booking } from "@/types/mybookings";
import { StatusBadge } from "./StatusBadge";
import { FaSyncAlt, FaTimes, FaLifeRing } from "react-icons/fa";
import MockMovingMap from "./MockMovingMap";

export function BookingsCard({
  booking,
  activeTab,
  onCancel,
  onRebook,
}: {
  booking: Booking;
  activeTab: "upcoming" | "past";
  onCancel: (id: number) => void;
  onRebook: (id: number) => void;
}) {
  const showMap =
    activeTab === "upcoming" && booking.status === "confirmed";

  return (
    <li className="p-4 rounded-md bg-card dark:bg-dark-card shadow">
      <div className="flex justify-between items-center mb-1">
        <p className="font-semibold text-lg">
          {booking.fromTown} → {booking.toTown}
        </p>
        <StatusBadge status={booking.status} />
      </div>

      <p className="text-sm text-muted dark:text-dark-muted">
        {booking.travelDate} • {booking.class} • {booking.seats} seat(s)
      </p>

      {showMap && <MockMovingMap />}

      <div className="mt-3 flex gap-4 flex-wrap">
        {activeTab === "upcoming" && booking.status === "confirmed" && (
          <button
            onClick={() => onCancel(booking.id)}
            className="text-primary hover:underline text-sm flex items-center gap-1"
          >
            <FaTimes className="text-xs" />
            Cancel
          </button>
        )}

        {activeTab === "past" && booking.status === "completed" && (
          <button
            onClick={() => onRebook(booking.id)}
            className="text-primary hover:underline text-sm flex items-center gap-1"
          >
            <FaSyncAlt className="text-xs" />
            Rebook
          </button>
        )}

        {/* 🆘 Support Link */}
        <Link
          href={{
            pathname: `/support/${booking.id}`,
            query: {
              from: booking.fromTown,
              to: booking.toTown,
              date: booking.travelDate,
            },
          }}
          className="text-primary hover:underline text-sm flex items-center gap-1"
        >
          <FaLifeRing className="text-xs" />
          Get Help
        </Link>
      </div>
    </li>
  );
}
