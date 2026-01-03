"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaTimes,
  FaLifeRing,
  FaTruck,
  FaPlus,
} from "react-icons/fa";
import Header from "@/components/Navbar";
import MapPreview from "@/components/dashboard/MapPreview";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

type TabStatus = "pending" | "verified";
type DeliveryStatus = "pending" | "verified" | "rejected";

interface Delivery {
  publicId: string;
  senderName: string;
  receiverName: string;
  receiverPhone: string;
  pickupState: string;
  pickupTown: string;
  destinationState: string;
  destinationTown: string;
  category: string;
  description: string;
  images: string[];
  estimatedFee: number;
  verificationStatus: DeliveryStatus;
  suggestedCategory?: string;
  createdAt: string;
}

export default function DeliveriesPage() {
  const router = useRouter();
  const token = useAuthStore.getState().token;
  const [activeTab, setActiveTab] = useState<TabStatus>("pending");
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTracking, setActiveTracking] = useState<Delivery | null>(null);

  useEffect(() => {
    async function fetchDeliveries() {
      try {
        const res = await api.get("/deliveries/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDeliveries(res.data);
      } catch (err) {
        console.error("Failed to fetch deliveries", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDeliveries();
  }, [token]);

  const filtered = deliveries.filter(
    (d) => d.verificationStatus === activeTab
  );

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background dark:bg-dark-background font-poppins">
        {/* Tabs */}
        <div className="flex justify-around p-2 bg-gray-200 dark:bg-gray-800 rounded-full m-4">
          {(["pending", "verified"] as TabStatus[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 mx-1 rounded-full font-semibold transition ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-muted dark:text-dark-muted"
              }`}
            >
              {tab === "pending" ? "Pending" : "Verified"}
            </button>
          ))}
        </div>

        {/* List */}
        <section className="p-4 space-y-4">
          {filtered.map((d) => (
            <article
              key={d.publicId}
              className="bg-cardBg dark:bg-dark-cardBg p-4 rounded-xl shadow"
            >
              {/* Route */}
              <h3 className="font-semibold text-text dark:text-dark-text">
                {d.pickupTown}, {d.pickupState} → {d.destinationTown},{" "}
                {d.destinationState}
              </h3>

              <p className="text-sm text-muted dark:text-dark-muted mt-1">
                Category: {d.category}
              </p>

              <p className="text-sm text-text dark:text-dark-text mt-2">
                Receiver: {d.receiverName} ({d.receiverPhone})
              </p>

              <p className="text-sm font-medium text-text dark:text-dark-text mt-2">
                Fee: ₦{d.estimatedFee.toLocaleString()}
              </p>

              {d.suggestedCategory && (
                <p className="text-sm text-yellow-600 mt-2">
                  Suggested: {d.suggestedCategory}
                </p>
              )}

              {/* Actions */}
              <div className="mt-4 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTracking(d)}
                    className="flex-1 py-2 rounded-lg bg-primary text-white flex items-center justify-center gap-2 text-sm"
                  >
                    <FaMapMarkerAlt />
                    Track
                  </button>

                  <button className="flex-[2] py-2 rounded-lg border border-red-500 text-red-600 flex items-center justify-center gap-2 text-sm">
                    <FaTimes />
                    Cancel
                  </button>
                </div>

                <div className="flex gap-2">
                  <button className="flex-[2] py-2 rounded-lg bg-accentBg dark:bg-dark-accentBg text-text dark:text-dark-text text-sm">
                    View Details
                  </button>

                  <button
                    onClick={() =>
                      router.push(
                        `/support/${d.publicId}?from=${d.pickupTown}&to=${d.destinationTown}`
                      )
                    }
                    className="flex-1 py-2 rounded-lg bg-link/10 text-link dark:text-dark-link flex items-center justify-center gap-2 text-sm"
                  >
                    <FaLifeRing />
                    Get Help
                  </button>
                </div>

                {d.verificationStatus === "pending" && (
                  <p className="text-center text-xs text-muted mt-2">
                    Awaiting verification
                  </p>
                )}
              </div>
            </article>
          ))}

          {!loading && filtered.length === 0 && (
            <p className="text-center text-muted mt-8">
              No deliveries here yet.
            </p>
          )}
        </section>

        {/* Floating Action Button */}
        <button
          onClick={() => router.push("/deliveries")}
          className="fixed bottom-6 right-5 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <FaTruck />
          <FaPlus className="absolute -top-1 -right-1 text-xs" />
        </button>

        {/* Tracking Modal */}
        {activeTracking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-cardBg dark:bg-dark-cardBg w-full max-w-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-text dark:text-dark-text">
                  Tracking Ride
                </h3>
                <button
                  onClick={() => setActiveTracking(null)}
                  className="text-2xl"
                >
                  ×
                </button>
              </div>

              <p className="text-center font-medium mb-4">
                {activeTracking.pickupTown} →{" "}
                {activeTracking.destinationTown}
              </p>

              <MapPreview
                pickupLabel={`Pickup: ${activeTracking.pickupTown}`}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
