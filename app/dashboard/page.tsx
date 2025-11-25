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

// MOCK data - replace with API calls where needed
const MOCK_UPCOMING: Booking = {
  id: 1,
  fromTown: "Dutse",
  toTown: "Gumel",
  travelDate: "2025-12-01",
  time: "08:00 AM",
  class: "Economy",
  seats: 1,
};

const MOCK_PAST: Booking[] = [
  { id: 11, fromTown: "Abuja", toTown: "Kano", travelDate: "2025-10-12", class: "Economy", seats: 1 },
  { id: 12, fromTown: "Dutse", toTown: "Hadejia", travelDate: "2025-09-02", class: "Business", seats: 2 },
];

export default function DashboardPage() {
  // TODO: replace mocks with API & auth store
  const handleCancel = (id: number) => {
    // call booking cancel API and refresh
    console.log("cancel", id);
  };

  const handleRebook = (id: number) => {
    // call rebook or navigate
    console.log("rebook", id);
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
            <UpcomingBookingCard booking={MOCK_UPCOMING} onCancel={handleCancel} />
            <MapPreview pickupLabel="Your pickup" />
            <PromotionsCarousel />
          </div>

          <aside className="space-y-6">
            <WalletCard balance={1200} />
            <div className="bg-cardBg dark:bg-dark-cardBg p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Recent trips</h3>
              <PastBookingList bookings={MOCK_PAST} onRebook={handleRebook} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
