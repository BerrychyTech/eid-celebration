"use client";
import { useState } from "react";

// -------------------- MOCK DATA --------------------
type RideStatus = "upcoming" | "active" | "completed" | "canceled";
type FleetStatus = "pending" | "quoted" | "paid" | "completed" | "canceled";

interface Ride {
  id: string;
  passenger: string;
  pickup: string;
  dropoff: string;
  date: string;
  driver: string;
  status: RideStatus;
  complaint?: string;
}

interface FleetBooking {
  id: string;
  passenger: string;
  vehicleType: string;
  route: string;
  date: string;
  price?: number;
  status: FleetStatus;
  paymentStatus: "paid" | "unpaid" | "refunded";
}

// -------------------- MOCK DATA --------------------
const mockRides: Ride[] = [
  {
    id: "R001",
    passenger: "Ibrahim Musa",
    pickup: "Abuja Airport",
    dropoff: "Central Abuja",
    date: "2025-12-10 09:30",
    driver: "Grace Anthony",
    status: "upcoming",
  },
  {
    id: "R002",
    passenger: "Grace Anthony",
    pickup: "Lagos Ikeja",
    dropoff: "Lagos Victoria Island",
    date: "2025-12-09 14:00",
    driver: "John Samuel",
    status: "completed",
    complaint: "Driver arrived late.",
  },
];

const mockFleetBookings: FleetBooking[] = [
  {
    id: "F001",
    passenger: "Ibrahim Musa",
    vehicleType: "Bus",
    route: "Abuja → Lagos",
    date: "2025-12-12 08:00",
    price: 150000,
    status: "pending",
    paymentStatus: "unpaid",
  },
  {
    id: "F002",
    passenger: "Grace Anthony",
    vehicleType: "SUV",
    route: "Lagos → Ibadan",
    date: "2025-12-11 10:00",
    price: 45000,
    status: "paid",
    paymentStatus: "paid",
  },
];

// -------------------- STATUS BADGE --------------------
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    upcoming: "bg-blue-100 text-blue-700",
    active: "bg-green-100 text-green-700",
    completed: "bg-gray-100 text-gray-700",
    canceled: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    quoted: "bg-purple-100 text-purple-700",
    paid: "bg-green-100 text-green-700",
    refunded: "bg-red-200 text-red-800",
  };
  return (
    <span className={`px-2 py-1 rounded-xl text-sm ${variants[status]}`}>{status}</span>
  );
}

// -------------------- TAB BUTTONS --------------------
function TabSelector({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (t: string) => void;
}) {
  return (
    <div className="flex gap-4 mb-6">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setActiveTab(t)}
          className={`px-4 py-2 rounded-xl font-medium transition ${
            activeTab === t
              ? "bg-[var(--color-primary)] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// -------------------- RIDE TABLE --------------------
function RideTable({
  rides,
  forceCancel,
  liveMap,
  onView,
}: {
  rides: Ride[];
  forceCancel: (id: string) => void;
  liveMap: (id: string) => void;
  onView: (ride: Ride) => void;
}) {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm border-[var(--color-primary)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-700">
            <th className="py-3 text-left">ID</th>
            <th className="py-3 text-left">Passenger</th>
            <th className="py-3 text-left">Pickup → Dropoff</th>
            <th className="py-3 text-left">Date</th>
            <th className="py-3 text-left">Driver</th>
            <th className="py-3 text-left">Status</th>
            <th className="py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{r.id}</td>
              <td>{r.passenger}</td>
              <td>{r.pickup} → {r.dropoff}</td>
              <td>{r.date}</td>
              <td>{r.driver}</td>
              <td><StatusBadge status={r.status} /></td>
              <td className="flex gap-1">
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded-xl text-xs"
                  onClick={() => forceCancel(r.id)}
                  disabled={r.status === "completed" || r.status === "canceled"}
                >
                  Force Cancel
                </button>
                <button
                  className="px-2 py-1 bg-blue-600 text-white rounded-xl text-xs"
                  onClick={() => liveMap(r.id)}
                >
                  Live Map
                </button>
                <button
                  className="px-2 py-1 bg-gray-700 text-white rounded-xl text-xs"
                  onClick={() => onView(r)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// -------------------- FLEET TABLE --------------------
function FleetTable({
  bookings,
  updatePrice,
  onView,
}: {
  bookings: FleetBooking[];
  updatePrice: (id: string, price: number) => void;
  onView: (booking: FleetBooking) => void;
}) {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm border-[var(--color-primary)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-700">
            <th className="py-3 text-left">ID</th>
            <th className="py-3 text-left">Passenger</th>
            <th className="py-3 text-left">Vehicle</th>
            <th className="py-3 text-left">Route</th>
            <th className="py-3 text-left">Date</th>
            <th className="py-3 text-left">Price</th>
            <th className="py-3 text-left">Status</th>
            <th className="py-3 text-left">Payment</th>
            <th className="py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{b.id}</td>
              <td>{b.passenger}</td>
              <td>{b.vehicleType}</td>
              <td>{b.route}</td>
              <td>{b.date}</td>
              <td>₦{b.price?.toLocaleString() || "—"}</td>
              <td><StatusBadge status={b.status} /></td>
              <td><StatusBadge status={b.paymentStatus} /></td>
              <td className="flex gap-1">
                <button
                  className="text-blue-600 hover:underline text-xs"
                  onClick={() => {
                    const newPrice = prompt("Enter new price:", b.price?.toString() || "0");
                    if (newPrice) updatePrice(b.id, parseFloat(newPrice));
                  }}
                >
                  Update Price
                </button>
                <button
                  className="px-2 py-1 bg-gray-700 text-white rounded-xl text-xs"
                  onClick={() => onView(b)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// -------------------- MODAL --------------------
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-11/12 max-w-2xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

// -------------------- MAIN PAGE --------------------
export default function BookingManagementPage() {
  const [activeTab, setActiveTab] = useState("Rides");
  const [rides, setRides] = useState<Ride[]>(mockRides);
  const [fleetBookings, setFleetBookings] = useState<FleetBooking[]>(mockFleetBookings);

  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [selectedFleet, setSelectedFleet] = useState<FleetBooking | null>(null);

  const forceCancel = (id: string) => {
    setRides((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "canceled" } : r))
    );
    alert(`Ride ${id} has been force-canceled (mock).`);
  };

  const liveMap = (id: string) => {
    alert(`Opening live map for Ride ${id} (mock).`);
  };

  const updateFleetPrice = (id: string, price: number) => {
    setFleetBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, price, status: "quoted" } : b))
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Bookings Management</h1>

      <TabSelector tabs={["Rides", "Fleet Requests"]} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Rides" && (
        <RideTable rides={rides} forceCancel={forceCancel} liveMap={liveMap} onView={setSelectedRide} />
      )}

      {activeTab === "Fleet Requests" && (
        <FleetTable bookings={fleetBookings} updatePrice={updateFleetPrice} onView={setSelectedFleet} />
      )}

      {selectedRide && (
        <Modal onClose={() => setSelectedRide(null)}>
          <h2 className="text-xl font-semibold mb-4">Ride Details: {selectedRide.id}</h2>
          <p><strong>Passenger:</strong> {selectedRide.passenger}</p>
          <p><strong>Pickup:</strong> {selectedRide.pickup}</p>
          <p><strong>Dropoff:</strong> {selectedRide.dropoff}</p>
          <p><strong>Date:</strong> {selectedRide.date}</p>
          <p><strong>Driver:</strong> {selectedRide.driver}</p>
          <p><strong>Status:</strong> {selectedRide.status}</p>
          {selectedRide.complaint && <p><strong>Complaint:</strong> {selectedRide.complaint}</p>}
          <div className="mt-4 border rounded-lg p-4 bg-gray-50 text-center text-gray-600">
            Map preview placeholder (mock)
          </div>
        </Modal>
      )}

      {selectedFleet && (
        <Modal onClose={() => setSelectedFleet(null)}>
          <h2 className="text-xl font-semibold mb-4">Fleet Booking Details: {selectedFleet.id}</h2>
          <p><strong>Passenger:</strong> {selectedFleet.passenger}</p>
          <p><strong>Vehicle:</strong> {selectedFleet.vehicleType}</p>
          <p><strong>Route:</strong> {selectedFleet.route}</p>
          <p><strong>Date:</strong> {selectedFleet.date}</p>
          <p><strong>Price:</strong> ₦{selectedFleet.price?.toLocaleString() || "—"}</p>
          <p><strong>Status:</strong> {selectedFleet.status}</p>
          <p><strong>Payment Status:</strong> {selectedFleet.paymentStatus}</p>
        </Modal>
      )}
    </div>
  );
}
