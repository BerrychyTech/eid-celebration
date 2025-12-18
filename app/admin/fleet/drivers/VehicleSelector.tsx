"use client";

import { FleetVehicle } from "@/types/fleet";

export default function VehicleSelector({
  vehicles,
  onAssign,
}: {
  vehicles: FleetVehicle[];
  onAssign: (vehicleId: string) => void;
}) {
  return (
    <div className="bg-white border border-[#FFEDE9] rounded-2xl p-4 shadow-sm">
      <h3 className="text-md font-semibold mb-3">Available Vehicles</h3>

      {vehicles.filter(v => v.status === "available").length === 0 ? (
        <p className="text-sm text-gray-500">No available vehicles</p>
      ) : (
        <ul className="space-y-2">
          {vehicles
            .filter(v => v.status === "available")
            .map(v => (
              <li
                key={v.id}
                className="flex justify-between p-3 bg-gray-50 rounded-xl"
              >
                <span>
                  {v.model} ({v.plate})
                </span>
                <button
                  onClick={() => onAssign(v.id)}
                  className="px-4 py-2 bg-[#FD5C63] text-white rounded-xl"
                >
                  Assign
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
