import { Booking } from "@/types/mybookings";
import { StatusBadge } from "./StatusBadge";
import { FaSyncAlt, FaTimes } from "react-icons/fa";
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

      {/* 🔥 Add the map here for upcoming trips */}
      {showMap && <MockMovingMap />}

      <div className="mt-2 flex gap-4">
        {activeTab === "upcoming" && booking.status === "confirmed" && (
          <button
            onClick={() => onCancel(booking.id)}
            className="text-primary dark:text-dark-primary hover:underline text-sm flex items-center gap-1"
          >
            <FaTimes className="text-xs text-primary" />
            Cancel
          </button>
        )}

        {activeTab === "past" && booking.status === "completed" && (
          <button
            onClick={() => onRebook(booking.id)}
            className="text-primary dark:text-dark-primary hover:underline text-sm flex items-center gap-1"
          >
            <FaSyncAlt className="text-xs" />
            Rebook
          </button>
        )}
      </div>
    </li>
  );
}
