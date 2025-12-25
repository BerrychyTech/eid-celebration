"use client";

import { useEffect, useState } from "react";

/* ================= TYPES ================= */

type DeliveryStatus = "pending" | "scheduled" | "ongoing" | "completed";

interface Delivery {
  id: string;
  date: string;
  customer: string;
  senderName: string;
  receiverName: string;
  receiverPhone: string;
  pickupAddress: string;
  dropoffAddress: string;
  route: string;
  pickupTime: string;
  bucket: string;
  category: "documents" | "electronics" | "fragile" | "food" | "parcel";
  fee: number;
  status: DeliveryStatus;
  assignedDriverId?: string | null;
  uploadedImages?: string[];
  weightKg?: number;
  distanceKm?: number;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  available: boolean;
}

/* ================= MOCK DRIVERS ================= */

const MOCK_DRIVERS: Driver[] = [
  { id: "DRV1", name: "Tunde Akande", phone: "0801000001", rating: 4.8, available: true },
  { id: "DRV2", name: "Aisha Bello", phone: "0801000002", rating: 4.6, available: true },
];

/* ================= DISPATCH BUCKETS ================= */

const DISPATCH_BUCKETS = [
  { label: "Early Dispatch (12:00 AM – 5:59 AM)", startHour: 0, startMinute: 0 },
  { label: "Morning Rush (6:00 AM – 8:59 AM)", startHour: 6, startMinute: 0 },
  { label: "Mid-Morning Rollout (9:00 AM – 11:59 AM)", startHour: 9, startMinute: 0 },
  { label: "Afternoon Dispatch (12:00 PM – 3:59 PM)", startHour: 12, startMinute: 0 },
  { label: "Evening Wind-Down (4:00 PM – 7:59 PM)", startHour: 16, startMinute: 0 },
];

const categories = [
  "Small Box", "Medium Box", "Large Box", "Sack – Small", "Sack – Big", "Envelope / Documents",
  "Electronics", "Fragile Items", "Clothes / Fabric Bag", "Foodstuff (non-perishable)", "Grocery Bag",
  "Household Items", "Personal Items", "Wholesale Sack (Big)", "Carton Goods", "Packed Drinks",
  "Retail Bags", "Industrial Samples", "Luggage", "Shoes / Fashion Products", "Books", "Office Items",
  "Spare Parts", "Light Tools", "Custom Category"
];

/* ================= FUTURE DATES ================= */

const today = new Date();
const day1 = new Date(today);
day1.setDate(today.getDate() + 1);

const day2 = new Date(today);
day2.setDate(today.getDate() + 2);

const FUTURE_DATES = [
  day1.toISOString().split("T")[0],
  day2.toISOString().split("T")[0],
];

/* ================= MOCK DELIVERIES ================= */

const deliveries: Delivery[] = FUTURE_DATES.flatMap((date, dayIndex) =>
  DISPATCH_BUCKETS.flatMap((b, i) =>
    Array.from({ length: 5 }).map((_, idx) => ({
      id: `UP-${dayIndex + 1}-${i + 1}${idx + 1}`,
      date,
      customer: `Customer ${idx + 1}`,
      senderName: `Sender ${idx + 1}`,
      receiverName: `Receiver ${idx + 1}`,
      receiverPhone: `0803${2000 + idx}`,
      pickupAddress: "Garki, Abuja",
      dropoffAddress: "Maitama, Abuja",
      route: "Garki → Maitama",
      pickupTime: `${6 + idx}:00`,
      bucket: b.label,
      category: "parcel",
      fee: 4000 + idx * 500,
      status: idx === 0 ? "pending" : "scheduled",
      assignedDriverId: idx > 1 ? "DRV1" : null,
      uploadedImages: idx < 2 ? [`future-${idx}.jpg`] : [],
      weightKg: idx + 1,
      distanceKm: 10 + idx,
    }))
  )
);

/* ================= PAGE ================= */

export default function UpcomingDeliveriesPage() {
  const [now, setNow] = useState(new Date());
  const [activeDelivery, setActiveDelivery] = useState<Delivery | null>(null);
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

  // 🔽 NEW: date collapse state
  const [collapsedDates, setCollapsedDates] = useState<Record<string, boolean>>(
    () =>
      FUTURE_DATES.reduce((acc, d) => {
        acc[d] = false; // expanded by default
        return acc;
      }, {} as Record<string, boolean>)
  );

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const toggleDate = (date: string) => {
    setCollapsedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <div className="p-6 space-y-16">
      <h1 className="text-2xl font-bold text-[#FD5C63]">
        Upcoming Deliveries
      </h1>

      {FUTURE_DATES.map((date) => {
        const isCollapsed = collapsedDates[date];

        return (
          <div key={date} className="space-y-6">
            {/* DATE HEADER */}
            <div className="flex justify-between items-center bg-[#FFF0ED] rounded-xl px-5 py-4 border">
              <h2 className="text-lg font-semibold">
                Deliveries for {new Date(date).toDateString()}
              </h2>

              <button
                onClick={() => toggleDate(date)}
                className="text-sm font-medium px-4 py-2 rounded-lg bg-white border hover:bg-gray-50"
              >
                {isCollapsed ? "Expand" : "Collapse"}
              </button>
            </div>

            {/* COLLAPSIBLE CONTENT */}
            {!isCollapsed && (
              <div className="space-y-10">
                {DISPATCH_BUCKETS.map((bucket) => {
                  const bucketDeliveries = deliveries.filter(
                    (d) => d.date === date && d.bucket === bucket.label
                  );

                  const countdown = getFutureCountdown(
                    now,
                    date,
                    bucket.startHour,
                    bucket.startMinute
                  );

                  return (
                    <div key={bucket.label} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{bucket.label}</h3>
                        <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                        {mounted ? `Starts in ${countdown}` : "Starts soon"}
                        </span>

                      </div>

                      <div className="bg-white rounded-2xl border shadow overflow-x-auto">
                        <table className="min-w-[1400px] w-full text-sm">
                          <thead className="bg-[#FFF0ED]">
                            <tr>
                              <th className="p-4 text-left">ID</th>
                              <th className="p-4 text-left">Sender</th>
                              <th className="p-4 text-left">Receiver</th>
                              <th className="p-4 text-left">Phone</th>
                              <th className="p-4 text-left">Pickup</th>
                              <th className="p-4 text-left">Drop-off</th>
                              <th className="p-4 text-left">Route</th>
                              <th className="p-4 text-left">Pickup Time</th>
                              <th className="p-4 text-left">Status</th>
                              <th className="p-4 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bucketDeliveries.map((d) => (
                              <tr key={d.id} className="border-t hover:bg-[#FFF9F7]">
                                <td className="p-4 font-medium">{d.id}</td>
                                <td className="p-4">{d.senderName}</td>
                                <td className="p-4">{d.receiverName}</td>
                                <td className="p-4">{d.receiverPhone}</td>
                                <td className="p-4">{d.pickupAddress}</td>
                                <td className="p-4">{d.dropoffAddress}</td>
                                <td className="p-4">{d.route}</td>
                                <td className="p-4">{d.pickupTime}</td>
                                <td className="p-4">
                                  <StatusBadge status={d.status} />
                                </td>
                                <td className="p-4 text-center">
                                  <button
                                    onClick={() => setActiveDelivery(d)}
                                    className="px-3 py-1.5 rounded-lg bg-[#FD5C63] text-white text-xs"
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {activeDelivery && (
        <DeliveryDetailsModal
          delivery={activeDelivery}
          drivers={MOCK_DRIVERS}
          onClose={() => setActiveDelivery(null)}
        />
      )}
    </div>
  );
}

/* ================= HELPERS (UNCHANGED) ================= */

function getFutureCountdown(now: Date, date: string, hour: number, minute: number) {
  const start = new Date(date);
  start.setHours(hour, minute, 0, 0);

  const diff = start.getTime() - now.getTime();
  if (diff <= 0) return "00:00:00";

  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function StatusBadge({ status }: { status: DeliveryStatus }) {
  const styles = {
    pending: "bg-gray-100 text-gray-700",
    scheduled: "bg-orange-100 text-orange-700",
    ongoing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
      {status}
    </span>
  );
}


function Badge({
  color = "primary",
  children,
}: {
  color?: "primary" | "gray";
  children: React.ReactNode;
}) {
  const colorClasses = {
    primary: "bg-[#FD5C63] text-white",
    gray: "bg-gray-200 text-gray-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
}


function DeliveryDetailsModal({
  delivery,
  drivers,
  onClose,
}: {
  delivery: Delivery;
  drivers: Driver[];
  onClose: () => void;
}) {
  const readOnly = delivery.status === "ongoing" || delivery.status === "completed";
  const driver = drivers.find((d) => d.id === delivery.assignedDriverId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl p-6 border border-[#FFEDE9] shadow-lg overflow-y-auto max-h-[90vh] relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div>
          <h2 className="text-xl font-semibold">{delivery.id} — {delivery.category.toUpperCase()}</h2>
          <p className="text-sm text-gray-500 mt-1">Fee: ₦{delivery.fee.toLocaleString()} · Status: {delivery.status}</p>
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
            <p className="text-sm"><strong>Phone:</strong> {delivery.receiverPhone}</p>
            <p className="text-sm"><strong>Address:</strong> {delivery.dropoffAddress}</p>
            <p className="text-sm"><strong>Assigned Driver:</strong> {driver ? `${driver.name} · ${driver.phone}` : <span className="text-gray-400">Not assigned</span>}</p>
            <p className="text-sm"><strong>Status:</strong> <Badge>{delivery.status}</Badge></p>
          </SectionCard>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-2">Map Preview</h4>
          <div className="h-48 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400">
            Map preview placeholder (mock)
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {/* Uploaded Images Card */}
          <SectionCard>
            <h4 className="font-semibold mb-3">Uploaded Images</h4>
            <div className="flex gap-2 flex-wrap mt-2">
              {(delivery.uploadedImages ?? []).length === 0 ? (
                <p className="text-sm text-gray-400">No images uploaded</p>
              ) : (
                (delivery.uploadedImages ?? []).map((img, idx) => (
                  <div key={idx} className="w-20 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                    <span className="text-xs truncate px-1">{img}</span>
                  </div>
                ))
              )}
            </div>
          </SectionCard>

          {/* Fee Breakdown & Adjust Card */}
          <SectionCard>
            <h4 className="font-semibold mb-3">Fee Breakdown & Adjust</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Base fee</span>
                <span className="font-medium">₦{delivery.fee.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Delivery fee</span>
                <span className="font-medium">₦{Math.round(delivery.fee * 0.8).toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">₦{delivery.fee.toLocaleString()}</span>
                </div>
              </div>
              {!readOnly && (
                <button 
                  onClick={() => {
                    const newFeeStr = prompt("Enter adjusted fee (NGN):", delivery.fee.toString());
                    if (newFeeStr && !isNaN(Number(newFeeStr))) {
                      console.log(`Adjusting fee for ${delivery.id} to ${newFeeStr}`);
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-[#FD5C63] text-white text-sm font-medium hover:bg-[#fd4a52] transition-colors mt-2"
                >
                  Adjust Fee
                </button>
              )}
            </div>
          </SectionCard>

          {/* Parcel Category Card */}
          <SectionCard>
            <h4 className="font-semibold mb-3">Parcel Category</h4>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FD5C63] focus:border-transparent"
              defaultValue={delivery.category}
              disabled={readOnly}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase().replace(/[^a-z]/g, '-')}>
                  {cat}
                </option>
              ))}
            </select>
            {!readOnly && (
              <button 
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 transition-colors mt-3"
                onClick={() => {
                  console.log(`Updating category for ${delivery.id}`);
                }}
              >
                Update Category
              </button>
            )}
          </SectionCard>
        </div>

        {!readOnly && (
          <div className="flex justify-end gap-3 mt-8">
            <button 
              onClick={() => {
                if (confirm("Cancel this delivery?")) {
                  console.log(`Cancelling delivery ${delivery.id}`);
                  onClose();
                }
              }}
              className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
            >
              Cancel Delivery
            </button>
            <button 
              className="px-5 py-2.5 rounded-lg bg-[#FD5C63] text-white font-medium hover:bg-[#fd4a52] transition-colors"
              onClick={() => {
                console.log(`Approving payment for ${delivery.id}`);
              }}
            >
              Approve Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-[#FFFDFD] shadow-sm">
      {children}
    </div>
  );
}
