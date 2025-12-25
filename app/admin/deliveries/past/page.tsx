"use client";

import { useEffect, useState } from "react";

/* ================= TYPES ================= */

type DeliveryStatus = "pending" | "scheduled" | "ongoing" | "completed" | "cancelled";

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
  completionTime?: string;
  actualDistanceKm?: number;
  notes?: string;
  rating?: number;
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
  { id: "DRV3", name: "Chinedu Okafor", phone: "0801000003", rating: 4.9, available: false },
  { id: "DRV4", name: "Fatima Yusuf", phone: "0801000004", rating: 4.7, available: true },
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

/* ================= PAST DATES ================= */

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const dayBeforeYesterday = new Date(today);
dayBeforeYesterday.setDate(today.getDate() - 2);

const lastWeek = new Date(today);
lastWeek.setDate(today.getDate() - 7);

const PAST_DATES = [
  yesterday.toISOString().split("T")[0],
  dayBeforeYesterday.toISOString().split("T")[0],
  lastWeek.toISOString().split("T")[0],
];

/* ================= MOCK PAST DELIVERIES ================= */

const pastDeliveries: Delivery[] = PAST_DATES.flatMap((date, dayIndex) =>
  DISPATCH_BUCKETS.flatMap((b, i) =>
    Array.from({ length: 5 }).map((_, idx) => {
      // Generate different statuses for variety
      const statuses: DeliveryStatus[] = ["completed", "completed", "completed", "cancelled", "completed"];
      const status = statuses[idx];
      const isCompleted = status === "completed";
      const isCancelled = status === "cancelled";
      
      return {
        id: `PD-${dayIndex + 1}-${i + 1}${idx + 1}`,
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
        status,
        assignedDriverId: idx > 1 ? `DRV${(idx % 4) + 1}` : "DRV1",
        uploadedImages: idx < 3 ? [`delivered-${idx}.jpg`, `signature-${idx}.png`] : [],
        weightKg: idx + 1,
        distanceKm: 10 + idx,
        completionTime: isCompleted ? `${6 + idx + 1}:${idx % 2 === 0 ? '30' : '45'}` : undefined,
        actualDistanceKm: isCompleted ? 10 + idx + (idx % 3) : undefined,
        notes: isCompleted ? "Delivered successfully" : isCancelled ? "Customer cancelled" : "",
        rating: isCompleted ? [4, 5, 4, 5, 4][idx] : undefined,
      };
    })
  )
);

/* ================= PAGE ================= */

export default function PastDeliveriesPage() {
  const [activeDelivery, setActiveDelivery] = useState<Delivery | null>(null);
  const [filterStatus, setFilterStatus] = useState<DeliveryStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedDates, setCollapsedDates] = useState<Record<string, boolean>>(
    () =>
      PAST_DATES.reduce((acc, d) => {
        acc[d] = false; // expanded by default
        return acc;
      }, {} as Record<string, boolean>)
  );

  const toggleDate = (date: string) => {
    setCollapsedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  // Filter deliveries based on status and search
  const getFilteredDeliveries = (date: string) => {
    return pastDeliveries.filter((d) => {
      if (d.date !== date) return false;
      if (filterStatus !== "all" && d.status !== filterStatus) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          d.id.toLowerCase().includes(query) ||
          d.customer.toLowerCase().includes(query) ||
          d.senderName.toLowerCase().includes(query) ||
          d.receiverName.toLowerCase().includes(query) ||
          d.receiverPhone.includes(query)
        );
      }
      return true;
    });
  };

  // Calculate statistics
  const totalDeliveries = pastDeliveries.length;
  const completedDeliveries = pastDeliveries.filter(d => d.status === "completed").length;
  const cancelledDeliveries = pastDeliveries.filter(d => d.status === "cancelled").length;
  const totalRevenue = pastDeliveries
    .filter(d => d.status === "completed")
    .reduce((sum, d) => sum + d.fee, 0);

  return (
    <div className="p-6 space-y-16">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#FD5C63]">
          Past Deliveries
        </h1>
        <div className="text-sm text-gray-500">
          Showing last 7 days of deliveries
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Deliveries"
          value={totalDeliveries.toString()}
          color="blue"
        />
        <StatCard
          title="Completed"
          value={completedDeliveries.toString()}
          color="green"
        />
        <StatCard
          title="Cancelled"
          value={cancelledDeliveries.toString()}
          color="red"
        />
        <StatCard
          title="Total Revenue"
          value={`₦${totalRevenue.toLocaleString()}`}
          color="purple"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-white rounded-xl border">
        <div className="flex items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as DeliveryStatus | "all")}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <input
            type="text"
            placeholder="Search by ID, customer, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg w-64"
          />
        </div>
        
        <button
          onClick={() => {
            setFilterStatus("all");
            setSearchQuery("");
          }}
          className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
        >
          Clear Filters
        </button>
      </div>

      {/* Deliveries List */}
      {PAST_DATES.map((date) => {
        const filteredDeliveries = getFilteredDeliveries(date);
        const isCollapsed = collapsedDates[date];

        if (filteredDeliveries.length === 0 && filterStatus !== "all") {
          return null;
        }

        return (
          <div key={date} className="space-y-6">
            {/* DATE HEADER */}
            <div className="flex justify-between items-center bg-gray-50 rounded-xl px-5 py-4 border">
              <div>
                <h2 className="text-lg font-semibold">
                  Deliveries for {new Date(date).toDateString()}
                </h2>
                <p className="text-sm text-gray-500">
                  {filteredDeliveries.length} delivery{filteredDeliveries.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <button
                onClick={() => toggleDate(date)}
                className="text-sm font-medium px-4 py-2 rounded-lg bg-white border hover:bg-gray-50"
              >
                {isCollapsed ? "Expand" : "Collapse"}
              </button>
            </div>

            {/* COLLAPSIBLE CONTENT */}
            {!isCollapsed && filteredDeliveries.length > 0 && (
              <div className="space-y-10">
                {DISPATCH_BUCKETS.map((bucket) => {
                  const bucketDeliveries = filteredDeliveries.filter(
                    (d) => d.bucket === bucket.label
                  );

                  if (bucketDeliveries.length === 0) return null;

                  return (
                    <div key={bucket.label} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{bucket.label}</h3>
                        <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                          {bucketDeliveries.length} delivery{bucketDeliveries.length !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="bg-white rounded-2xl border shadow overflow-x-auto">
                        <table className="min-w-[1600px] w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-4 text-left">ID</th>
                              <th className="p-4 text-left">Sender</th>
                              <th className="p-4 text-left">Receiver</th>
                              <th className="p-4 text-left">Phone</th>
                              <th className="p-4 text-left">Pickup</th>
                              <th className="p-4 text-left">Drop-off</th>
                              <th className="p-4 text-left">Status</th>
                              <th className="p-4 text-left">Driver</th>
                              <th className="p-4 text-left">Completion Time</th>
                              <th className="p-4 text-left">Rating</th>
                              <th className="p-4 text-left">Fee</th>
                              <th className="p-4 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bucketDeliveries.map((d) => (
                              <tr key={d.id} className="border-t hover:bg-gray-50">
                                <td className="p-4 font-medium">{d.id}</td>
                                <td className="p-4">{d.senderName}</td>
                                <td className="p-4">{d.receiverName}</td>
                                <td className="p-4">{d.receiverPhone}</td>
                                <td className="p-4">{d.pickupAddress}</td>
                                <td className="p-4">{d.dropoffAddress}</td>
                                <td className="p-4">
                                  <StatusBadge status={d.status} />
                                </td>
                                <td className="p-4">
                                  {d.assignedDriverId ? 
                                    MOCK_DRIVERS.find(drv => drv.id === d.assignedDriverId)?.name : 
                                    "—"
                                  }
                                </td>
                                <td className="p-4">
                                  {d.completionTime || "—"}
                                </td>
                                <td className="p-4">
                                  {d.rating ? (
                                    <div className="flex items-center gap-1">
                                      <span className="text-yellow-500">★</span>
                                      <span>{d.rating}/5</span>
                                    </div>
                                  ) : "—"}
                                </td>
                                <td className="p-4 font-medium">
                                  ₦{d.fee.toLocaleString()}
                                </td>
                                <td className="p-4 text-center">
                                  <button
                                    onClick={() => setActiveDelivery(d)}
                                    className="px-3 py-1.5 rounded-lg bg-[#FD5C63] text-white text-xs hover:bg-[#fd4a52]"
                                  >
                                    View Details
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

            {!isCollapsed && filteredDeliveries.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border">
                <p className="text-gray-500">No deliveries found for this date with current filters</p>
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

/* ================= COMPONENTS ================= */

function StatCard({ 
  title, 
  value, 
  color 
}: { 
  title: string; 
  value: string; 
  color: "blue" | "green" | "red" | "purple" 
}) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    green: "bg-green-50 border-green-100 text-green-700",
    red: "bg-red-50 border-red-100 text-red-700",
    purple: "bg-purple-50 border-purple-100 text-purple-700",
  };

  return (
    <div className={`p-4 rounded-xl border ${colorClasses[color]}`}>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: DeliveryStatus }) {
  const styles = {
    pending: "bg-gray-100 text-gray-700",
    scheduled: "bg-orange-100 text-orange-700",
    ongoing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
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
  color?: "primary" | "gray" | "green" | "red";
  children: React.ReactNode;
}) {
  const colorClasses = {
    primary: "bg-[#FD5C63] text-white",
    gray: "bg-gray-200 text-gray-800",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
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
  const driver = drivers.find((d) => d.id === delivery.assignedDriverId);
  const isCompleted = delivery.status === "completed";
  const isCancelled = delivery.status === "cancelled";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl p-6 border border-gray-200 shadow-lg overflow-y-auto max-h-[90vh] relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{delivery.id} — {delivery.category.toUpperCase()}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Delivered on {new Date(delivery.date).toDateString()} • {delivery.pickupTime}
              </p>
            </div>
            <Badge color={isCompleted ? "green" : isCancelled ? "red" : "gray"}>
              {delivery.status}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="font-medium">Fee: ₦{delivery.fee.toLocaleString()}</span>
            {delivery.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span>Rating: {delivery.rating}/5</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pickup Details */}
          <SectionCard>
            <h4 className="font-semibold text-lg mb-3">Pickup Details</h4>
            <div className="space-y-2">
              <DetailRow label="Sender Name" value={delivery.senderName} />
              <DetailRow label="Pickup Address" value={delivery.pickupAddress} />
              <DetailRow label="Scheduled Time" value={delivery.pickupTime} />
              <DetailRow label="Weight" value={delivery.weightKg ? `${delivery.weightKg} kg` : "—"} />
              <DetailRow label="Estimated Distance" value={delivery.distanceKm ? `${delivery.distanceKm} km` : "—"} />
            </div>
          </SectionCard>

          {/* Delivery Details */}
          <SectionCard>
            <h4 className="font-semibold text-lg mb-3">Delivery Details</h4>
            <div className="space-y-2">
              <DetailRow label="Receiver Name" value={delivery.receiverName} />
              <DetailRow label="Phone" value={delivery.receiverPhone} />
              <DetailRow label="Drop-off Address" value={delivery.dropoffAddress} />
              <DetailRow label="Actual Distance" value={delivery.actualDistanceKm ? `${delivery.actualDistanceKm} km` : "—"} />
              <DetailRow label="Completion Time" value={delivery.completionTime || "—"} />
              <DetailRow label="Assigned Driver" value={driver ? `${driver.name} (${driver.phone})` : "—"} />
            </div>
          </SectionCard>
        </div>

        {/* Notes and Images */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <SectionCard>
            <h4 className="font-semibold text-lg mb-3">Delivery Notes</h4>
            <div className="p-3 bg-gray-50 rounded-lg min-h-[80px]">
              {delivery.notes ? (
                <p className="text-sm">{delivery.notes}</p>
              ) : (
                <p className="text-sm text-gray-400">No notes available</p>
              )}
            </div>
          </SectionCard>

          <SectionCard>
            <h4 className="font-semibold text-lg mb-3">Proof of Delivery</h4>
            <div className="flex gap-3 flex-wrap">
              {(delivery.uploadedImages ?? []).length === 0 ? (
                <p className="text-sm text-gray-400">No images uploaded</p>
              ) : (
                (delivery.uploadedImages ?? []).map((img, idx) => (
                  <div key={idx} className="relative group">
                    <div className="w-24 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                      <div className="text-center p-2">
                        <div className="text-xs font-medium truncate">{img}</div>
                        <div className="text-[10px] text-gray-500 mt-1">Click to view</div>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open(`/images/${img}`, '_blank')}
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg"
                    />
                  </div>
                ))
              )}
            </div>
          </SectionCard>
        </div>

        {/* Fee Breakdown */}
        <SectionCard className="mt-6">
          <h4 className="font-semibold text-lg mb-3">Fee Breakdown</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Base Delivery Fee</span>
              <span className="font-medium">₦{Math.round(delivery.fee * 0.8).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Service Charge</span>
              <span className="font-medium">₦{Math.round(delivery.fee * 0.1).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Platform Fee</span>
              <span className="font-medium">₦{Math.round(delivery.fee * 0.1).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-t">
              <span className="font-bold text-lg">Total Paid</span>
              <span className="font-bold text-lg text-[#FD5C63]">₦{delivery.fee.toLocaleString()}</span>
            </div>
          </div>
        </SectionCard>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
          <button
            onClick={() => {
              // Generate invoice
              console.log(`Generating invoice for ${delivery.id}`);
              alert('Invoice generated successfully!');
            }}
            className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
          >
            Download Invoice
          </button>
          {isCompleted && (
            <button
              onClick={() => {
                // Send to accounting
                console.log(`Marking ${delivery.id} as accounted`);
                alert('Delivery marked for accounting!');
              }}
              className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
            >
              Mark as Accounted
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionCard({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-gray-200 rounded-xl p-5 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-1.5">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm text-right">{value}</span>
    </div>
  );
}