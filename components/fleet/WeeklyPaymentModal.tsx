"use client";

import { FleetPartner } from "@/types/fleet";
import { useState } from "react";

export default function WeeklyPaymentModal({
  partner,
  onClose,
}: {
  partner: FleetPartner;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState(
    partner.weeklyPaymentValue ?? 0
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[1000]">
      <div className="bg-white w-full max-w-md p-5 rounded-2xl border border-primary">
        <h2 className="text-lg font-semibold">Set Weekly Payment</h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full mt-3 border border-primary px-3 py-2 rounded-xl"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded-xl" onClick={onClose}>
            Cancel
          </button>

          <button className="px-4 py-2 bg-green-600 text-white rounded-xl">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
