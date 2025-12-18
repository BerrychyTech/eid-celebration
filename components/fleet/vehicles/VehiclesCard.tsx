"use client";

import { Vehicle } from "@/types/vehicle";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const color =
    vehicle.status === "active"
      ? "text-green-600"
      : vehicle.status === "maintenance"
      ? "text-orange-600"
      : "text-red-600";

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#FFEDE9] shadow">
      <h3 className="font-semibold text-[#FD5C63]">{vehicle.model}</h3>

      <div className="mt-3 text-sm text-neutral-700">
        <p>Plate: {vehicle.plate}</p>
        <p>Partner Company: {vehicle.partnerCompany}</p>
        <p className={color}>Status: {vehicle.status}</p>
      </div>
    </div>
  );
}
