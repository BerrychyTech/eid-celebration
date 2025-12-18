// components/admin/drivers/VehicleAssignmentCard.tsx
"use client";
import React from "react";
import type { VehicleInfo } from "@/types/driver";

export default function VehicleAssignmentCard({ assigned, vehicles, onAssign }: { assigned: VehicleInfo | null; vehicles: VehicleInfo[]; onAssign: (v: VehicleInfo | null) => void; }) {
  return (
    <div className="p-4 rounded-2xl bg-[var(--color-cardBg)] shadow">
      <h3 className="font-semibold mb-3">Vehicle Assignment</h3>

      <div className="mb-3">
        <div className="text-sm text-[var(--color-muted)]">Assigned Vehicle</div>
        {assigned ? (
          <div className="mt-2">
            <div className="font-medium">{assigned.model}</div>
            <div className="text-xs text-[var(--color-muted)]">{assigned.plateNumber}</div>
            <div className="mt-2"><button className="px-3 py-1 rounded bg-red-600 text-white text-sm" onClick={() => onAssign(null)}>Unassign</button></div>
          </div>
        ) : (
          <div className="mt-2 text-[var(--color-muted)]">No vehicle assigned</div>
        )}
      </div>

      <div>
        <div className="text-sm text-[var(--color-muted)]">Available Vehicles</div>
        <div className="mt-2 space-y-2">
          {vehicles.map(v => (
            <div key={v.id} className="flex items-center justify-between border p-2 rounded">
              <div>
                <div className="font-medium">{v.model}</div>
                <div className="text-xs text-[var(--color-muted)]">{v.plateNumber}</div>
              </div>
              <button className="px-3 py-1 rounded bg-[var(--color-primary)] text-white text-sm" onClick={() => onAssign(v)}>Assign</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
