"use client";

import React, { useMemo, useState } from "react";

/* ===========================================================================
   Types
   =========================================================================== */

type DeliveryStatus = "pending" | "accepted" | "en-route" | "delivered" | "canceled" | "escalated";
type PaymentStatus = "paid" | "unpaid" | "refunded";

interface Delivery {
  id: string;
  senderName: string;
  receiverName: string;
  pickupAddress: string;
  dropoffAddress: string;
  category: "documents" | "electronics" | "fragile" | "food" | "parcel";
  weightKg?: number;
  distanceKm?: number;
  scheduledAt?: string;
  fee: number;
  status: DeliveryStatus;
  assignedDriverId?: string | null;
  uploadedImages?: string[]; // urls or placeholders
  complaintId?: string | null;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  location?: string;
  rating: number;
  available: boolean;
  distanceToPickupKm?: number;
}

interface Complaint {
  id: string;
  deliveryId: string;
  reporter: string;
  description: string;
  images?: string[];
  status: "open" | "in_progress" | "resolved";
}

/* ===========================================================================
   Mock Data
   =========================================================================== */

const MOCK_DRIVERS: Driver[] = [
  { id: "DRV100", name: "Tunde Akande", phone: "+234800001", location: "Abuja - Garki", rating: 4.8, available: true, distanceToPickupKm: 2.3 },
  { id: "DRV101", name: "Aisha Bello", phone: "+234800002", location: "Abuja - Wuse", rating: 4.6, available: true, distanceToPickupKm: 1.1 },
  { id: "DRV102", name: "Emeka Okoro", phone: "+234800003", location: "Abuja - Asokoro", rating: 4.2, available: false, distanceToPickupKm: 8.5 },
];

const MOCK_COMPLAINTS: Complaint[] = [
  { id: "CMP-1", deliveryId: "DLV-003", reporter: "Sender", description: "Item arrived damaged. See images.", images: ["img1.png", "img2.png"], status: "open" },
];

const MOCK_DELIVERIES: Delivery[] = [
  {
    id: "DLV-001",
    senderName: "Ibrahim Musa",
    receiverName: "Aisha Musa",
    pickupAddress: "12 Garki St, Abuja",
    dropoffAddress: "45 Wuse Ave, Abuja",
    category: "parcel",
    weightKg: 2.4,
    distanceKm: 6.2,
    scheduledAt: "2025-12-11 10:00",
    fee: 1200,
    status: "pending",
    assignedDriverId: null,
  },
  {
    id: "DLV-002",
    senderName: "Grace Anthony",
    receiverName: "Ada Obi",
    pickupAddress: "Ikeja GRA, Lagos",
    dropoffAddress: "Victoria Island, Lagos",
    category: "documents",
    weightKg: 0.1,
    distanceKm: 12.0,
    scheduledAt: "2025-12-10 14:00",
    fee: 2000,
    status: "en-route",
    assignedDriverId: "DRV100",
  },
  {
    id: "DLV-003",
    senderName: "John Samuel",
    receiverName: "Nkechi John",
    pickupAddress: "Kano Market",
    dropoffAddress: "Kano East",
    category: "electronics",
    weightKg: 1.5,
    distanceKm: 18,
    scheduledAt: "2025-12-09 16:00",
    fee: 3500,
    status: "delivered",
    assignedDriverId: "DRV101",
    uploadedImages: ["pickup_before.png", "dropoff_after.png"],
    complaintId: "CMP-1",
  },
];

/* ===========================================================================
   Helpers & Small UI pieces
   =========================================================================== */

function Badge({ children, color = "gray" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    gray: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    blue: "bg-blue-100 text-blue-800",
    primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  };
  return <span className={`px-3 py-1 rounded-full text-xs ${colors[color] ?? colors.gray}`}>{children}</span>;
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return <div className="bg-[var(--color-cardBg)] border border-[var(--color-primary)]/10 rounded-2xl p-4 shadow-sm">{children}</div>;
}

/* ===========================================================================
   UI: Reassign Driver Modal
   =========================================================================== */

function ReassignModal({
  onClose,
  delivery,
  drivers,
  onAssign,
}: {
  onClose: () => void;
  delivery: Delivery;
  drivers: Driver[];
  onAssign: (deliveryId: string, driverId: string) => void;
}) {
  const available = drivers
    .filter((d) => d.available)
    .sort((a, b) => (a.distanceToPickupKm ?? 999) - (b.distanceToPickupKm ?? 999));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl bg-[var(--color-accentBg)] rounded-2xl p-6 border border-[var(--color-primary)] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Reassign Driver — {delivery.id}</h3>
          <button onClick={onClose} className="text-[var(--color-link)]">Close</button>
        </div>

        <p className="text-sm text-[var(--color-muted)] mb-4">Available drivers (closest first)</p>

        <div className="space-y-3">
          {available.length === 0 && <p className="text-sm text-[var(--color-muted)]">No drivers available</p>}
          {available.map((d) => (
            <div key={d.id} className="flex items-center justify-between border rounded-lg p-3 bg-[var(--color-formBg)]">
              <div>
                <div className="font-medium">{d.name} <span className="text-xs text-[var(--color-muted)]">· {d.rating}★</span></div>
                <div className="text-xs text-[var(--color-muted)]">{d.location} · {d.distanceToPickupKm ?? "—"} km</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { onAssign(delivery.id, d.id); onClose(); }}
                  className="px-3 py-1 rounded-lg bg-[var(--color-primary)] text-white text-sm"
                >
                  Assign
                </button>
                <a className="px-3 py-1 rounded-lg border text-sm" href={`tel:${d.phone}`}>Call</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===========================================================================
   UI: Delivery Details Modal
   =========================================================================== */

function DeliveryDetailsModal({
  delivery,
  drivers,
  complaint,
  onClose,
  onCancel,
  onOpenReassign,
  onAdjustFee,
  onTrackLive,
}: {
  delivery: Delivery;
  drivers: Driver[];
  complaint?: Complaint | null;
  onClose: () => void;
  onCancel: (id: string) => void;
  onOpenReassign: (d: Delivery) => void;
  onAdjustFee: (id: string, newFee: number) => void;
  onTrackLive: (id: string) => void;
}) {
  const assignedDriver = drivers.find((d) => d.id === delivery.assignedDriverId) ?? null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl bg-[var(--color-accentBg)] rounded-2xl p-6 border border-[var(--color-primary)] shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-xl font-semibold">{delivery.id} — {delivery.category.toUpperCase()}</h2>
            <p className="text-sm text-[var(--color-muted)]">Scheduled: {delivery.scheduledAt ?? "ASAP"} · Fee: ₦{delivery.fee.toLocaleString()}</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => onTrackLive(delivery.id)} className="px-3 py-2 rounded-lg bg-blue-600 text-white">Track Live</button>
            <button onClick={() => onOpenReassign(delivery)} className="px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white">Reassign</button>
            <button onClick={() => { const confirmCancel = confirm("Cancel this delivery?"); if (confirmCancel) onCancel(delivery.id); }} className="px-3 py-2 rounded-lg bg-red-600 text-white">Cancel</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <SectionCard>
            <h4 className="font-semibold">Pickup</h4>
            <p className="text-sm mt-1"><strong>Name:</strong> {delivery.senderName}</p>
            <p className="text-sm"><strong>Address:</strong> {delivery.pickupAddress}</p>
            <p className="text-sm"><strong>Weight:</strong> {delivery.weightKg ?? "—"} kg</p>
            <p className="text-sm"><strong>Distance:</strong> {delivery.distanceKm ?? "—"} km</p>
            <p className="text-sm"><strong>Notes:</strong> none</p>
          </SectionCard>

          <SectionCard>
            <h4 className="font-semibold">Drop-off</h4>
            <p className="text-sm mt-1"><strong>Name:</strong> {delivery.receiverName}</p>
            <p className="text-sm"><strong>Address:</strong> {delivery.dropoffAddress}</p>
            <p className="text-sm"><strong>Assigned Driver:</strong> {assignedDriver ? `${assignedDriver.name} · ${assignedDriver.phone}` : <span className="text-[var(--color-muted)]">Not assigned</span>}</p>
            <p className="text-sm"><strong>Status:</strong> <Badge color="primary">{delivery.status}</Badge></p>
          </SectionCard>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Map Preview</h4>
          <div className="h-48 rounded-lg bg-[var(--color-cardBg)] border border-[var(--color-primary)] flex items-center justify-center text-[var(--color-muted)]">
            Map preview placeholder (mock)
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <SectionCard>
            <h4 className="font-semibold">Uploaded Images</h4>
            <div className="flex gap-2 flex-wrap mt-2">
              {(delivery.uploadedImages ?? []).length === 0 && <p className="text-sm text-[var(--color-muted)]">No images</p>}
              {(delivery.uploadedImages ?? []).map((img, idx) => (
                <div key={idx} className="w-28 h-20 bg-white rounded-lg border flex items-center justify-center text-xs">{img}</div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <h4 className="font-semibold">Fee Breakdown & Adjust</h4>
            <p className="text-sm text-[var(--color-muted)]">Base fee</p>
            <div className="flex items-center justify-between mt-2">
              <div className="font-medium">₦{delivery.fee.toLocaleString()}</div>
              <button onClick={() => { const newFeeStr = prompt("Enter adjusted fee (NGN):", delivery.fee.toString()); if (newFeeStr) onAdjustFee(delivery.id, Number(newFeeStr)); }} className="px-3 py-1 rounded bg-[var(--color-primary)] text-white text-sm">Adjust Fee</button>
            </div>
            {complaint && (
              <div className="mt-3">
                <h5 className="font-medium">Complaint</h5>
                <p className="text-sm text-red-700 mt-1">{complaint.description}</p>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================================
   UI: Complaint / Dispute Modal
   =========================================================================== */

function ComplaintModal({ complaint, onClose, onResolve }: { complaint: Complaint; onClose: () => void; onResolve: (id: string, action: "refund" | "penalize" | "ignore") => void; }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl bg-[var(--color-accentBg)] rounded-2xl p-6 border border-[var(--color-primary)] shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Complaint — {complaint.id}</h3>
          <button onClick={onClose} className="text-[var(--color-link)]">Close</button>
        </div>
        <p className="text-sm text-[var(--color-muted)] mb-3">Reported by: {complaint.reporter}</p>
        <p className="mb-4">{complaint.description}</p>
        <div className="flex gap-2">
          <button onClick={() => onResolve(complaint.id, "refund")} className="px-3 py-2 bg-green-600 text-white rounded">Approve Refund</button>
          <button onClick={() => onResolve(complaint.id, "penalize")} className="px-3 py-2 bg-red-600 text-white rounded">Penalize Driver</button>
          <button onClick={() => onResolve(complaint.id, "ignore")} className="px-3 py-2 border rounded">Ignore</button>
        </div>
        <div className="mt-4">
          <h5 className="font-semibold">Evidence</h5>
          <div className="flex gap-2 mt-2">
            {(complaint.images ?? []).map((img, i) => <div key={i} className="w-24 h-16 bg-white rounded border flex items-center justify-center text-xs">{img}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================================
   Main Page: Deliveries
   =========================================================================== */

export default function DeliveriesAdminPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(MOCK_DELIVERIES);
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);

  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | "all">("all");
  const [query, setQuery] = useState("");

  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [reassignDelivery, setReassignDelivery] = useState<Delivery | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const filtered = useMemo(() => {
    return deliveries.filter((d) => {
      const matchesStatus = statusFilter === "all" || d.status === statusFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        d.id.toLowerCase().includes(q) ||
        d.senderName.toLowerCase().includes(q) ||
        d.receiverName.toLowerCase().includes(q) ||
        d.pickupAddress.toLowerCase().includes(q) ||
        d.dropoffAddress.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [deliveries, statusFilter, query]);

  /* ------------- Actions (mocked) ------------- */

  function assignDriverToDelivery(deliveryId: string, driverId: string) {
    setDeliveries((prev) => prev.map((d) => (d.id === deliveryId ? { ...d, assignedDriverId: driverId, status: "accepted" } : d)));
    setDrivers((prev) => prev.map((dr) => (dr.id === driverId ? { ...dr, available: false } : dr)));
    alert(`Assigned driver ${driverId} to ${deliveryId} (mock).`);
  }

  function cancelDelivery(deliveryId: string) {
    setDeliveries((prev) => prev.map((d) => (d.id === deliveryId ? { ...d, status: "canceled" } : d)));
    alert(`Delivery ${deliveryId} canceled (mock).`);
    setSelectedDelivery(null);
  }

  function adjustFee(deliveryId: string, newFee: number) {
    setDeliveries((prev) => prev.map((d) => (d.id === deliveryId ? { ...d, fee: newFee } : d)));
    alert(`Fee for ${deliveryId} adjusted to ₦${newFee.toLocaleString()} (mock).`);
  }

  function openTrack(deliveryId: string) {
    alert(`Opening live tracking for ${deliveryId} (mock).`);
  }

  function resolveComplaint(complaintId: string, action: "refund" | "penalize" | "ignore") {
    setComplaints((prev) => prev.map((c) => (c.id === complaintId ? { ...c, status: "resolved" } : c)));
    alert(`Complaint ${complaintId} resolved with action: ${action} (mock).`);
    setSelectedComplaint(null);
  }

  /* ------------- UI ------------- */

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Delivery & Logistics Management</h1>

      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by delivery id, sender, receiver, address..."
          className="px-4 py-2 rounded-xl border border-[var(--color-primary)]/10 bg-[var(--color-formBg)] w-full md:w-1/2"
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="px-3 py-2 rounded-xl bg-[var(--color-formBg)] border border-[var(--color-primary)]/10">
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="en-route">En-route</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>

        <div className="ml-auto flex gap-2">
          <button onClick={() => { setDeliveries(MOCK_DELIVERIES); setDrivers(MOCK_DRIVERS); setComplaints(MOCK_COMPLAINTS); }} className="px-3 py-2 rounded-lg border bg-[var(--color-accentBg)]">Reset</button>
        </div>
      </div>

      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-3">ID</th>
                <th className="p-3">Sender → Receiver</th>
                <th className="p-3">Pickup</th>
                <th className="p-3">Dropoff</th>
                <th className="p-3">Driver</th>
                <th className="p-3">Fee</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((d) => {
                const assigned = drivers.find((dr) => dr.id === d.assignedDriverId);
                return (
                  <tr key={d.id} className="border-b hover:bg-[var(--color-accentBg)]">
                    <td className="p-3">{d.id}</td>
                    <td className="p-3">
                      <div className="font-medium">{d.senderName} → {d.receiverName}</div>
                      <div className="text-xs text-[var(--color-muted)]">{d.category} • {d.weightKg ?? "—"}kg</div>
                    </td>
                    <td className="p-3">{d.pickupAddress}</td>
                    <td className="p-3">{d.dropoffAddress}</td>
                    <td className="p-3">{assigned ? `${assigned.name} (${assigned.phone})` : <span className="text-[var(--color-muted)]">Not assigned</span>}</td>
                    <td className="p-3">₦{d.fee.toLocaleString()}</td>
                    <td className="p-3"><Badge color={d.status === "delivered" ? "green" : d.status === "canceled" ? "red" : "yellow"}>{d.status}</Badge></td>
                    <td className="p-3 space-x-2">
                      <button onClick={() => setSelectedDelivery(d)} className="px-3 py-1 rounded bg-[var(--color-primary)] text-white text-sm">View</button>
                      <button onClick={() => setReassignDelivery(d)} className="px-3 py-1 rounded border text-sm">Reassign</button>
                      <button onClick={() => cancelDelivery(d.id)} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Cancel</button>
                      {d.complaintId && <button onClick={() => { const c = complaints.find((c) => c.id === d.complaintId); if (c) setSelectedComplaint(c); }} className="px-3 py-1 rounded bg-yellow-600 text-white text-sm">Complaint</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Modals */}
      {reassignDelivery && (
        <ReassignModal
          delivery={reassignDelivery}
          drivers={drivers}
          onClose={() => setReassignDelivery(null)}
          onAssign={assignDriverToDelivery}
        />
      )}

      {selectedDelivery && (
        <DeliveryDetailsModal
          delivery={selectedDelivery}
          drivers={drivers}
          complaint={complaints.find((c) => c.deliveryId === selectedDelivery.id) ?? null}
          onClose={() => setSelectedDelivery(null)}
          onCancel={cancelDelivery}
          onOpenReassign={(d) => setReassignDelivery(d)}
          onAdjustFee={adjustFee}
          onTrackLive={openTrack}
        />
      )}

      {selectedComplaint && (
        <ComplaintModal complaint={selectedComplaint} onClose={() => setSelectedComplaint(null)} onResolve={resolveComplaint} />
      )}
    </div>
  );
}
