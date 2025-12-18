"use client";

import { FleetPartner, FleetVehicle } from "@/types/fleet";
import { useState } from "react";
import { mockFleetVehicles } from "@/mock/mockFleet";

export default function VehicleAssignModal({
  partner,
  onClose,
}: {
  partner: FleetPartner;
  onClose: () => void;
}) {
  const [vehicleId, setVehicleId] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[1000]">
      <div className="bg-white w-full max-w-md p-5 rounded-2xl border border-primary">
        <h2 className="text-lg font-semibold">Assign Vehicle</h2>

        <select
          className="w-full mt-3 border border-primary rounded-xl px-3 py-2"
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
        >
          <option value="">Select vehicle</option>

          {mockFleetVehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.model} ({v.plateNumber})
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded-xl" onClick={onClose}>
            Cancel
          </button>

          <button className="px-4 py-2 bg-primary text-white rounded-xl">
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}
