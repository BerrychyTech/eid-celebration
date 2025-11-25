"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;

    async function fetchBooking() {
      try {
        const res = await api.get(`/bookings/${bookingId}`);
        setBooking(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [bookingId]);

  const downloadPDF = () => {
    window.location.href = `http://localhost:5000/receipt/${bookingId}/pdf`;
  };

  const downloadImage = () => {
    window.location.href = `http://localhost:5000/receipt/${bookingId}/image`;
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background dark:bg-dark-background text-text dark:text-dark-text font-poppins px-4 py-10">
        <div className="max-w-xl mx-auto bg-card dark:bg-dark-card p-8 rounded-lg shadow">

          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="text-5xl">🎉</div>
            <h1 className="text-2xl font-semibold mt-2">Booking Successful!</h1>
            <p className="text-muted dark:text-dark-muted text-sm mt-1">
              Your trip has been booked successfully.
            </p>
          </div>

          {/* Booking Summary */}
          {loading ? (
            <p className="text-center text-muted dark:text-dark-muted">Loading booking details...</p>
          ) : booking ? (
            <div className="space-y-2 text-sm">
              <p><strong>From:</strong> {booking.fromTown}</p>
              <p><strong>To:</strong> {booking.toTown}</p>
              <p><strong>Travel Date:</strong> {booking.travelDate}</p>
              <p><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
              <p><strong>Pickup Time:</strong> {booking.pickupTime}</p>
              <p><strong>Seats:</strong> {booking.seats}</p>
              <p><strong>Class:</strong> {booking.travelClass}</p>
              <p><strong>Bags:</strong> {booking.bagCount}</p>
            </div>
          ) : (
            <p className="text-red-500 text-center">Unable to load booking info.</p>
          )}

          {/* Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={downloadPDF}
              className="w-full py-3 bg-primary dark:bg-dark-primary text-white rounded-lg font-medium shadow hover:opacity-90 transition"
            >
              Download PDF Receipt
            </button>

            <button
              onClick={downloadImage}
              className="w-full py-3 bg-accentBg dark:bg-dark-accentBg text-text dark:text-dark-text rounded-lg font-medium shadow border border-muted/20 dark:border-dark-muted/20 hover:opacity-80 transition"
            >
              Download Image Receipt (PNG)
            </button>

            <a
              href="/dashboard"
              className="block text-center py-3 rounded-lg font-medium bg-background dark:bg-dark-background border border-muted/20 dark:border-dark-muted/20 hover:bg-accentBg dark:hover:bg-dark-accentBg transition"
            >
              Go to Dashboard
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
