// File: /app/dashboard/page.tsx
"use client";

import React from "react";
import DashboardHero from "@/components/dashboard/DashboardHero";
import QuickActions from "@/components/dashboard/QuickActions";
import UpcomingBookingCard, { Booking } from "@/components/dashboard/UpcomingBookingCard";
import PastBookingList from "@/components/dashboard/PastBookingList";
import WalletCard from "@/components/dashboard/WalletCard";
import MapPreview from "@/components/dashboard/MapPreview";
import NotificationsBanner from "@/components/dashboard/NotificationsBanner";
import PromotionsCarousel from "@/components/dashboard/PromotionsCarousel";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/lib/api";
import toast from "react-hot-toast";


export default function DashboardPage() {
  const token = useAuthStore.getState().token;
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<"upcoming" | "past">("upcoming");
  const [pastBookings, setpastBookings] = React.useState<Booking[]>([]);
  const [upcomingBookings, setupcomingBookings] = React.useState<Booking[]>([]);
  const [activeTrackingBooking, setActiveTrackingBooking] = React.useState<Booking | null>(null);

  React.useEffect(() => {
  fetchBookings();
}, []);

  const fetchBookings = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [upcomingRes, pastRes] = await Promise.all([
        api.get("/upcoming", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get("/past?page=1&limit=20", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      const upcomingBookingList = upcomingRes.data.upcoming;
      const pastBookingList = pastRes.data.bookings;
      setpastBookings( pastBookingList );
      setupcomingBookings( upcomingBookingList)

    } catch (err) {
      toast.error("❌ Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

const rebookBooking = async (id: number) => {
    if (!token) return;
    const today = new Date().toISOString().split("T")[0];
    try {
      await api.post(
        `/${id}/rebook`,
        { travelDate: today },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Rebooked for today!");
      fetchBookings();
    } catch {
      toast.error("❌ Rebooking failed.");
    }
  };  

    const cancelBooking = async (id: number) => {
    if (!token) return;
    try {
      await api.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Booking cancelled.");
      fetchBookings();
    } catch {
      toast.error("❌ Cancel failed.");
    }
  };

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6 bg-background dark:bg-dark-background text-text dark:text-dark-text font-poppins">
        <DashboardHero upcomingCount={1} walletBalance={1200} points={24} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <QuickActions />
            <NotificationsBanner />
            {upcomingBookings.map((b) => (
            <UpcomingBookingCard
              key={b.id}
              booking={b}
              onCancel={cancelBooking}
              onTrack={(b) => setActiveTrackingBooking(b)}
            />

            ))}
           {activeTrackingBooking && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              {/* Semi-transparent background overlay */}
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setActiveTrackingBooking(null)}
              />

              {/* The floating map modal */}
              <div className="relative bg-white dark:bg-dark-cardBg w-4/5 h-4/5 rounded-lg shadow-lg overflow-hidden">
                {/* Close button */}
                <button
                  onClick={() => setActiveTrackingBooking(null)}
                  className="absolute top-3 right-3 z-10 bg-primary text-white px-3 py-1 rounded hover:opacity-90"
                >
                  Close
                </button>

                {/* MapPreview component */}
                <MapPreview
                  pickupLabel={`Pickup: ${activeTrackingBooking.fromTown}`}
                />
              </div>
            </div>
          )}

            <PromotionsCarousel />
          </div>

          <aside className="space-y-6">
            <WalletCard balance={1200} />
            <div className="bg-cardBg dark:bg-dark-cardBg p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Recent trips</h3>
              <PastBookingList bookings={pastBookings} onRebook={rebookBooking} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
