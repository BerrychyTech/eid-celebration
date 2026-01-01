"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Props {
  params: { id: string };
}

export default function EventFleetPaymentPage({ params }: Props) {
  const { id } = useParams<{ id: string }>(); // ✅ correct
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [tripPrice, setTripPrice] = useState<number | null>(null);

  const router = useRouter();

  React.useEffect(() => {
    // Fetch the booking details including assigned price
    const fetchBooking = async () => {
      const token = useAuthStore.getState().token;
      try {
        const res = await api.get(`/event-fleet/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTripPrice(res.data.booking.tripPrice);
      } catch {
        toast.error("Failed to fetch booking price.");
      }
    };

    fetchBooking();
  }, [id]);

  const handlePayment = () => {
    if (!pin) return toast.error("Please enter your PIN");
    // Open modal (can also use your favorite UI library like Radix, ShadCN, etc.)
    // For simplicity, we'll just show a prompt here
    if (window.confirm(`You are paying ₦${tripPrice}. Confirm?`)) {
      setLoading(true);
      api
        .post(
          `/event-fleet/${id}/pay`,
          { pin },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        .then(() => {
          toast.success("Payment successful!");
          router.push("/my-bookings");
        })
        .catch(() => toast.error("Payment failed"))
        .finally(() => setLoading(false));
    }
  };

  if (!tripPrice) return <p>Loading price...</p>;

  return (
    <>
        <Header/>
        <div className="max-w-md mx-auto p-6 bg-cardBg dark:bg-dark-cardBg rounded-lg shadow">
        <h1 className="text-xl font-bold mb-4">Event Fleet Payment</h1>
        <p className="mb-4">Assigned Price: <strong>₦{tripPrice}</strong></p>

        <input
            type="password"
            placeholder="Enter your PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-4"
        />

        <button
            onClick={handlePayment}
            disabled={loading}
            className="bg-primary text-white px-6 py-3 rounded-lg w-full"
        >
            {loading ? "Processing..." : "Pay Now"}
        </button>
    </div>
    <Footer/>
    </>
  );
}
