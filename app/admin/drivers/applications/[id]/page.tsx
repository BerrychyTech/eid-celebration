// app/admin/drivers/[id]/page.tsx
"use client";
import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { DriverProfile, DriverDocument, VehicleInfo } from "@/types/driver";
import DocumentReviewPanel from "@/components/admin/drivers/DocumentReviewPanel";
import OnboardingStepper from "@/components/admin/drivers/OnboardingStepper";
import ActivityDashboard from "@/components/admin/drivers/ActivityDashboard";
import VehicleAssignmentCard from "@/components/admin/drivers/VehicleAssignmentCard";
import EarningsMetricsCard from "@/components/admin/drivers/EarningsMetricsCard";

// small in-file mock data for immediate testing
const MOCK_DRIVER: DriverProfile[] = [
  { id: "DRV001", fullName: "Ibrahim Musa", phone: "+234800000001", status: "pending", city: "Abuja", rating: 4.6, trips: 128, earnings: 540000, onboardingStep: 2, createdAt: "2025-01-10", lastActive: "2025-12-01" },
];

const MOCK_DOCS: DriverDocument[] = [
  { id: "DOC1", type: "driverLicense", url: "#", uploadedAt: "2025-11-01", status: "pending", expiryDate: "2027-01-01" },
  { id: "DOC2", type: "insurance", url: "#", uploadedAt: "2025-10-10", status: "pending", expiryDate: "2026-09-01" },
];

const MOCK_VEHICLES: VehicleInfo[] = [
  { id: "V001", plateNumber: "ABC-123DE", model: "Toyota Corolla 2018", color: "White", year: 2018, insuranceExpiry: "2026-09-01", registrationExpiry: "2027-01-01" },
];

export default function DriverDetailsPage() {
  const params = useParams();
  const id = params?.id ?? "DRV001";
  const [driver] = useState<DriverProfile>(() => MOCK_DRIVER.find(d => d.id === id) ?? MOCK_DRIVER[0]);
  const [documents, setDocuments] = useState<DriverDocument[]>(MOCK_DOCS);
  const [assignedVehicle, setAssignedVehicle] = useState<VehicleInfo | null>(null);

  // callbacks (mock) to update documents and vehicle
  function reviewDoc(docId: string, verdict: "approved" | "rejected", remark?: string) {
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status: verdict, adminRemark: remark ?? null } : d));
    alert(`Document ${docId} marked ${verdict} (mock)`);
  }

  function assignVehicle(vehicle: VehicleInfo | null) {
    setAssignedVehicle(vehicle);
    alert(vehicle ? `Assigned ${vehicle.plateNumber} (mock)` : "Unassigned vehicle (mock)");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold">{driver.fullName}</h1>
          <p className="text-sm text-[var(--color-muted)]">{driver.id} • {driver.city} • Last active {driver.lastActive}</p>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white">Reject</button>
          <button className="px-3 py-2 rounded-lg bg-green-600 text-white">Approve</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="p-4 rounded-2xl bg-[var(--color-cardBg)] shadow">
            <p className="text-sm text-[var(--color-muted)]">Profile</p>
            <h2 className="font-semibold text-lg mt-2">{driver.fullName}</h2>
            <p className="text-sm">{driver.phone} • {driver.email ?? "—"}</p>
            <p className="text-sm mt-2">Rating: {driver.rating} • Trips: {driver.trips}</p>
          </div>

          <EarningsMetricsCard earnings={driver.earnings} />
          <VehicleAssignmentCard assigned={assignedVehicle} vehicles={MOCK_VEHICLES} onAssign={assignVehicle} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <OnboardingStepper step={driver.onboardingStep ?? 0} />
          <DocumentReviewPanel docs={documents} onReview={reviewDoc} />
          <ActivityDashboard driverId={driver.id} />
        </div>
      </div>
    </div>
  );
}
