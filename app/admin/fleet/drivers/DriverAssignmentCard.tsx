"use client";

import { FleetDriver } from "@/types/fleet";

export default function DriverAssignmentCard({
  driver,
  onRemoveVehicle,
}: {
  driver: FleetDriver;
  onRemoveVehicle: () => void;
}) {
  return (
    <div className="bg-white border border-[#FFEDE9] rounded-2xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold">Driver Info</h3>

      <div className="mt-3 text-sm space-y-2">
        <p><strong>Name:</strong> {driver.name}</p>
        <p><strong>Phone:</strong> {driver.phone}</p>
        <p>
          <strong>Assigned Vehicle:</strong>{" "}
          {driver.currentVehicle || "None"}
        </p>
      </div>

      {driver.currentVehicle && (
        <button
          onClick={onRemoveVehicle}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl"
        >
          Remove Vehicle
        </button>
      )}
    </div>
  );
}
