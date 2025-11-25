import { Booking } from "@/types/mybookings";
import { BookingsCard } from "./BookingCard";

export function BookingList({
  bookings,
  loading,
  activeTab,
  onCancel,
  onRebook,
}: {
  bookings: Booking[];
  loading: boolean;
  activeTab: "upcoming" | "past";
  onCancel: (id: number) => void;
  onRebook: (id: number) => void;
}) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-24 rounded bg-accentBg dark:bg-dark-accentBg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <p className="text-center text-muted dark:text-dark-muted">No bookings found.</p>
    );
  }

  return (
    <ul className="space-y-4">
      {bookings.map((b) => (
        <BookingsCard
          key={b.id}
          booking={b}
          activeTab={activeTab}
          onCancel={onCancel}
          onRebook={onRebook}
        />
      ))}
    </ul>
  );
}
