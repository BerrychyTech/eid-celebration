// app/admin/drivers/approved/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import type { DriverProfile, DriverDocument, VehicleInfo } from "@/types/driver";

import ActivityDashboard from "@/components/admin/drivers/ActivityDashboard";
import VehicleAssignmentCard from "@/components/admin/drivers/VehicleAssignmentCard";
import EarningsMetricsCard from "@/components/admin/drivers/EarningsMetricsCard";
import DocumentReviewPanel from "@/components/admin/drivers/DocumentReviewPanel";

/* MOCK DATA (approved driver only) */

const MOCK_DRIVER: DriverProfile = {
  id: "DRV001",
  fullName: "Ibrahim Musa",
  phone: "+234800000001",
  status: "active",
  city: "Abuja",
  rating: 4.6,
  trips: 128,
  earnings: 540000,
  createdAt: "2025-01-10",
  lastActive: "2025-12-01",
};

const MOCK_DOCS: DriverDocument[] = [
  {
    id: "DOC1",
    type: "driverLicense",
    url: "#",
    uploadedAt: "2025-11-01",
    status: "approved",
    expiryDate: "2027-01-01",
  },
  {
    id: "DOC2",
    type: "insurance",
    url: "#",
    uploadedAt: "2025-10-10",
    status: "approved",
    expiryDate: "2026-09-01",
  },
];

const MOCK_VEHICLES: VehicleInfo[] = [
  {
    id: "V001",
    plateNumber: "ABC-123DE",
    model: "Toyota Corolla 2018",
    color: "White",
    year: 2018,
    insuranceExpiry: "2026-09-01",
    registrationExpiry: "2027-01-01",
  },
];

export default function ApprovedDriverDetailsPage() {
  const { id } = useParams();
  const [driver, setDriver] = useState<DriverProfile>(MOCK_DRIVER);
  const [assignedVehicle, setAssignedVehicle] = useState<VehicleInfo | null>(
    MOCK_VEHICLES[0]
  );

  function toggleSuspension() {
    setDriver(prev => ({
      ...prev,
      status: prev.status === "active" ? "suspended" : "active",
    }));

    alert(
      driver.status === "active"
        ? "Driver suspended (mock)"
        : "Driver reactivated (mock)"
    );
  }

  function assignVehicle(vehicle: VehicleInfo | null) {
    setAssignedVehicle(vehicle);
    alert(
      vehicle
        ? `Assigned ${vehicle.plateNumber} (mock)`
        : "Vehicle unassigned (mock)"
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold">{driver.fullName}</h1>
          <p className="text-sm text-[var(--color-muted)]">
            {driver.id} • {driver.city} • Last active {driver.lastActive}
          </p>
          <StatusBadge status={driver.status} />
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-lg border">
            Edit Profile
          </button>

          <button
            onClick={toggleSuspension}
            className={`px-3 py-2 rounded-lg text-white ${
              driver.status === "active"
                ? "bg-red-600"
                : "bg-green-600"
            }`}
          >
            {driver.status === "active" ? "Suspend" : "Reactivate"}
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-6">

          <div className="p-4 rounded-2xl bg-[var(--color-cardBg)] shadow">
            <p className="text-sm text-[var(--color-muted)]">Profile Summary</p>
            <h2 className="font-semibold text-lg mt-2">
              {driver.fullName}
            </h2>
            <p className="text-sm">
              {driver.phone} • {driver.email ?? "—"}
            </p>
            <p className="text-sm mt-2">
              Rating: {driver.rating} • Trips: {driver.trips}
            </p>
          </div>

          <EarningsMetricsCard earnings={driver.earnings} />

          <VehicleAssignmentCard
            assigned={assignedVehicle}
            vehicles={MOCK_VEHICLES}
            onAssign={assignVehicle}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">

          {/* READ-ONLY DOCUMENTS */}
          <DocumentReviewPanel
            docs={MOCK_DOCS}
            readOnly
          />

          <ActivityDashboard driverId={driver.id} />
        </div>

      </div>
    </div>
  );
}

/* SMALL UI */

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}
