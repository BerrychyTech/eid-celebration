"use client";

import { useState } from "react";
import { approvedDrivers } from "@/mock/approvedDrivers";

type Vehicle = {
  id: string;
  plateNumber: string;
  model: string;
};

type Route = {
  id: string;
  name: string;
  start: string;
  end: string;
};

/* MOCK DATA */
const MOCK_VEHICLES: Vehicle[] = [
  { id: "V001", plateNumber: "ABC-123DE", model: "Toyota Corolla 2018" },
  { id: "V002", plateNumber: "XYZ-456FG", model: "Honda Civic 2020" },
];

const MOCK_ROUTES: Route[] = [
  { id: "R001", name: "Airport Shuttle", start: "Airport", end: "City Center" },
  { id: "R002", name: "University Loop", start: "Campus", end: "Downtown" },
];

export default function DriverAssignmentsPage() {
  const [drivers, setDrivers] = useState(approvedDrivers);

  const [assignments, setAssignments] = useState<Record<string, { vehicleId: string | null; routeId: string | null }>>(
    {}
  );

  function handleAssign(driverId: string, vehicleId: string | null, routeId: string | null) {
    setAssignments(prev => ({
      ...prev,
      [driverId]: { vehicleId, routeId },
    }));
    alert(`Assigned driver ${driverId} (mock)`);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Driver Assignments</h1>
      <p className="text-sm text-neutral-500">Assign fleets and routes to approved drivers</p>

      <div className="bg-white border border-[#FFEDE9] rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF6F4] text-neutral-600">
            <tr>
              <th className="px-4 py-3 text-left">Driver</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Vehicle</th>
              <th className="px-4 py-3 text-left">Route</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {drivers.map(driver => {
              const currentAssignment = assignments[driver.id] ?? { vehicleId: null, routeId: null };
              return (
                <tr key={driver.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 font-medium text-neutral-800">{driver.fullName}</td>
                  <td className="px-4 py-3 text-neutral-600">{driver.phone}</td>
                  <td className="px-4 py-3">
                    <select
                      className="border px-2 py-1 rounded-lg w-full"
                      value={currentAssignment.vehicleId ?? ""}
                      onChange={e => handleAssign(driver.id, e.target.value || null, currentAssignment.routeId)}
                    >
                      <option value="">Unassigned</option>
                      {MOCK_VEHICLES.map(v => (
                        <option key={v.id} value={v.id}>{v.model} ({v.plateNumber})</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="border px-2 py-1 rounded-lg w-full"
                      value={currentAssignment.routeId ?? ""}
                      onChange={e => handleAssign(driver.id, currentAssignment.vehicleId, e.target.value || null)}
                    >
                      <option value="">Unassigned</option>
                      {MOCK_ROUTES.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleAssign(driver.id, null, null)}
                      className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:opacity-90"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
