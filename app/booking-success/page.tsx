"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore.getState().token;

  useEffect(() => {
    if (!bookingId) return;

    async function fetchBooking() {
      try {
        if (!token) {
          console.error("Missing token in store");
          return;
        }

        const res = await api.get(`/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBooking(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [bookingId, token]);

  // Secure PDF download
  const downloadPDF = async () => {
    if (!token) return;

    try {
      const res = await api.get(`/receipt/${bookingId}/pdf/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // important for file downloads
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading PDF:", err);
    }
  };

  // Secure Image download
  const downloadImage = async () => {
    if (!token) return;

    try {
      const res = await api.get(`/receipt/${bookingId}/image/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${bookingId}.png`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading image:", err);
    }
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
              className=" text-center py-3 rounded-lg font-medium bg-accentBg dark:bg-dark-accentBg border border-muted/20 dark:border-dark-muted/20 hover:bg-primary dark:hover:bg-dark-primary transition text-primary hover:text-white px-17 md:px-8 md:ml-0.5"
            >
              Download PDF Receipt
            </button>

            <button
              onClick={downloadImage}
              className=" text-center py-3 rounded-lg font-medium bg-accentBg dark:bg-dark-accentBg border border-muted/20 dark:border-dark-muted/20 hover:bg-primary dark:hover:bg-dark-primary transition text-primary hover:text-white px-14 md:px-5 md:ml-5"
            >
              Download Image Receipt
            </button>

            <a
              href="/dashboard"
              className="block text-center py-3 rounded-lg font-medium bg-accentBg dark:bg-dark-accentBg border border-muted/20 dark:border-dark-muted/20 hover:bg-primary dark:hover:bg-dark-primary transition text-primary hover:text-white"
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
