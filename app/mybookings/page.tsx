"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Navbar";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import React from "react";
import toast from "react-hot-toast";
import { BookingTabs } from "@/components/mybookings_page/BookingsTab";
import { BookingList } from "@/components/mybookings_page/BookingList";
import { Booking } from "@/types/mybookings";


export default function BookingsPage() {
  const [activeTab, setActiveTab] = React.useState<"upcoming" | "past">("upcoming");
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);

  const token = useAuthStore.getState().token;

  const fetchBookings = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const endpoint =
        activeTab === "upcoming"
          ? "/upcoming"
          : "/past?page=1&limit=20";

      const res = await api.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const list = activeTab === "upcoming" ? res.data.upcoming : res.data.bookings;
      setBookings(list || []);
    } catch (err) {
      toast.error("❌ Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

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

  return (
    <>
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-6 bg-background dark:bg-dark-background text-text dark:text-dark-text font-poppins">
        <h1 className="text-2xl font-bold text-center mb-6">My Bookings</h1>

        <BookingTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <BookingList
          bookings={bookings}
          loading={loading}
          activeTab={activeTab}
          onCancel={cancelBooking}
          onRebook={rebookBooking}
        />
      </main>

      <Footer />
    </>
  );
}