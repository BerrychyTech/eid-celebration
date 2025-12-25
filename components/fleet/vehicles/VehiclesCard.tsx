"use client";

import { useState } from "react";
import { Vehicle } from "@/types/vehicle";

const STATUS_COLORS: Record<Vehicle["status"], string> = {
  active: "text-green-600",
  maintenance: "text-orange-600",
  inactive: "text-red-600",
  available: "text-blue-600",
};

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [status, setStatus] = useState<Vehicle["status"]>(vehicle.status);

  function updateStatus(newStatus: Vehicle["status"]) {
    setStatus(newStatus);

    // later → call API here
    console.log(`Vehicle ${vehicle.id} status updated to ${newStatus}`);
  }

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#FFEDE9] shadow space-y-3">
      <h3 className="font-semibold text-[#FD5C63]">{vehicle.model}</h3>

      <div className="text-sm text-neutral-700 space-y-1">
        <p>Plate: {vehicle.plate}</p>
        <p>Partner Company: {vehicle.partnerCompany}</p>

        <div className="flex items-center gap-2">
          <span className={`font-medium ${STATUS_COLORS[status]}`}>
            Status: {status}
          </span>

          <select
            value={status}
            onChange={e => updateStatus(e.target.value as Vehicle["status"])}
            className="border rounded-lg px-2 py-1 text-sm"
          >
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="available">Available</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
}
