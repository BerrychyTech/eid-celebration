"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

export default function FleetPricingModal({
  requestId,
  onClose,
  onSuccess,
}: {
  requestId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [tripPrice, setTripPrice] = useState("");
  const [breakdown, setBreakdown] = useState({
    vehicleCost: "",
    fuel: "",
    driverAllowance: "",
    logistics: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = useAuthStore.getState().token;

      await api.post(
        `/admin/bookings/${requestId}/price`,
        {
          tripPrice: Number(tripPrice),
          priceBreakdown: {
            vehicleCost: Number(breakdown.vehicleCost),
            fuel: Number(breakdown.fuel),
            driverAllowance: Number(breakdown.driverAllowance),
            logistics: Number(breakdown.logistics),
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Pricing failed", err);
      alert("Failed to assign price");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[420px] space-y-4">
        <h3 className="text-lg font-semibold text-[#FD5C63]">
          Assign Fleet Price
        </h3>

        <input
          type="number"
          placeholder="Total Trip Price"
          value={tripPrice}
          onChange={(e) => setTripPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl"
        />

        {Object.keys(breakdown).map((key) => (
          <input
            key={key}
            type="number"
            placeholder={key}
            value={(breakdown as any)[key]}
            onChange={(e) =>
              setBreakdown({ ...breakdown, [key]: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-xl"
          />
        ))}

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white"
          >
            {loading ? "Saving…" : "Assign Price"}
          </button>
        </div>
      </div>
    </div>
  );
}
