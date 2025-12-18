"use client";

import { FleetDriver } from "@/types/fleet";

export default function DriverList({
  drivers,
  onSelect,
}: {
  drivers: FleetDriver[];
  onSelect: (d: FleetDriver) => void;
}) {
  return (
    <div className="bg-white border border-[#FFEDE9] rounded-2xl p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Drivers</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-neutral-600 border-b">
            <th className="py-2 text-left">Name</th>
            <th className="py-2 text-left">Phone</th>
            <th className="py-2">Assigned Vehicle</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {drivers.map(d => (
            <tr key={d.id} className="border-b hover:bg-gray-50 cursor-pointer">
              <td className="py-3">{d.name}</td>
              <td>{d.phone}</td>
              <td className="text-center">
                {d.currentVehicle || "—"}
              </td>
              <td className="text-right">
                <button
                  onClick={() => onSelect(d)}
                  className="text-[#FD5C63] hover:underline"
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
