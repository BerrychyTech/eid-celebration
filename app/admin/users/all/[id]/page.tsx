// File: /app/admin/users/[id]/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  city: string;
  createdAt: string;
  verification: {
    email: boolean;
    phone: boolean;
    kyc: boolean;
  };
  wallet: number;
  referral: string | null;
  status: "active" | "banned" | "pending";
  lastActive: string;
}

interface Ride {
  id: string;
  userId: string;
  pickup: string;
  dropoff: string;
  date: string;
  driver: string;
  fare: number;
  status: "completed" | "cancelled" | "pending";
  duration: string;
  complaint: string | null;
}

interface CardProps {
  title: string;
  value: string | number;
}

interface Delivery {
  id: string;
  userId: string;
  pickup: string;
  dropoff: string;
  item: string;
  date: string;
  rider: string;
  fee: number;
  status: "delivered" | "pending";
  notes: string;
}

interface WalletTxn {
  id: string;
  userId: string;
  type: "credit" | "debit";
  amount: number;
  date: string;
  desc: string;
  status: string;
}

interface Order {
  id: string;
  userId: string;
  items: number;
  vendor: string;
  total: number;
  payment: string;
  deliveryRequested: boolean;
  status: string;
}

interface Ticket {
  id: string;
  userId: string;
  category: string;
  preview: string;
  date: string;
  status: string;
  body: string;
}

interface BadgeProps {
  children: React.ReactNode;
  color?: "green" | "red" | "yellow" | "blue" | "gray";
}

/* --------------------------------------------------------------------------
   Mock data - replace with real API calls later (fetch in server components
   or use SWR / React Query in client components)
   -------------------------------------------------------------------------- */

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Musa Ibrahim",
    email: "musa@example.com",
    phone: "08012345678",
    gender: "Male",
    dob: "1996-04-15",
    city: "Abuja",
    createdAt: "2023-02-10",
    verification: { email: true, phone: true, kyc: false },
    wallet: 12000.5,
    referral: "BG-REF-123",
    status: "active",
    lastActive: "2025-12-09 18:23",
  },
  {
    id: "2",
    name: "Sarah Bello",
    email: "sarah@example.com",
    phone: "08098765432",
    gender: "Female",
    dob: "1998-11-02",
    city: "Lagos",
    createdAt: "2024-08-01",
    verification: { email: true, phone: false, kyc: true },
    wallet: 450.0,
    referral: null,
    status: "banned",
    lastActive: "2025-11-21 09:05",
  },
];

const MOCK_RIDES: Ride[] = [
  {
    id: "R-1001",
    userId: "1",
    pickup: "Garki, Abuja",
    dropoff: "Wuse, Abuja",
    date: "2025-12-01",
    driver: "Haidar",
    fare: 1500,
    status: "completed",
    duration: "22m",
    complaint: null,
  },
  {
    id: "R-1002",
    userId: "1",
    pickup: "Maitama, Abuja",
    dropoff: "Asokoro, Abuja",
    date: "2025-12-05",
    driver: "Femi Wheels",
    fare: 2200,
    status: "cancelled",
    duration: "—",
    complaint: "Driver arrived 30m late",
  },
];

const MOCK_DELIVERIES: Delivery[] = [
  {
    id: "D-5001",
    userId: "1",
    pickup: "Kado",
    dropoff: "Gwarinpa",
    item: "Small parcel",
    date: "2025-11-15",
    rider: "DeliverBoy",
    fee: 900,
    status: "delivered",
    notes: "",
  },
];

const MOCK_WALLETS: WalletTxn[] = [
  { id: "T-1", userId: "1", type: "credit", amount: 5000, date: "2025-11-01", desc: "Wallet top-up (Paystack)", status: "success" },
  { id: "T-2", userId: "1", type: "debit", amount: 1500, date: "2025-12-01", desc: "Ride payment R-1001", status: "success" },
];

const MOCK_ORDERS: Order[] = [
  { id: "O-900", userId: "1", items: 2, vendor: "Ada's Store", total: 4500, payment: "wallet", deliveryRequested: true, status: "delivered" },
];

const MOCK_TICKETS: Ticket[] = [
  { id: "TK-33", userId: "1", category: "ride", preview: "Driver arrived late", date: "2025-12-05", status: "resolved", body: "Driver arrived 30 minutes late and refused to cancel." },
];

/* -------------------------------------------------------------------------- */
/* --------------------------- Utility components --------------------------- */
/* -------------------------------------------------------------------------- */

export function Badge({ children, color = "gray" }: BadgeProps) {
  const colorMap = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-800",
  } as const;

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${colorMap[color]}`}>
      {children}
    </span>
  );
}

function StatCard({ title, value }: CardProps) {
  return (
    <div className="p-4 rounded-2xl bg-[var(--color-cardBg)] shadow">
      <p className="text-sm text-[var(--color-muted)]">{title}</p>
      <h3 className="text-2xl font-semibold mt-2">{value}</h3>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* --------------------------- Main page component -------------------------- */
/* -------------------------------------------------------------------------- */

export default function UserDetailsPageClient() {
  const { id } = useParams();
  const user :User = useMemo(() => MOCK_USERS.find((u) => u.id === id) ?? MOCK_USERS[0], [id]);

  const [status, setStatus] = useState(user.status);
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("rides");
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);

  const userRides = MOCK_RIDES.filter((r) => r.userId === user.id);
  const userDeliveries = MOCK_DELIVERIES.filter((d) => d.userId === user.id);
  const userWallet = MOCK_WALLETS.filter((t) => t.userId === user.id);
  const userOrders = MOCK_ORDERS.filter((o) => o.userId === user.id);
  const userTickets = MOCK_TICKETS.filter((t) => t.userId === user.id);

  /* ------------------ admin actions (mocked) ------------------ */
  function toggleBan() {
    const next = status === "active" ? "banned" : "active";
    setStatus(next);
    alert(`User ${next === "banned" ? "banned" : "unbanned"} (mock)`);
  }

  function resetPassword() {
    alert("Password reset link sent to user's email (mock)");
  }

  function downloadWalletCSV() {
    const rows = [
      ["Transaction ID", "Type", "Amount", "Date", "Description", "Status"],
      ...userWallet.map((t) => [t.id, t.type, t.amount, t.date, t.desc, t.status]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wallet-${user.id}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[var(--color-cardBg)] flex items-center justify-center text-xl font-bold">
            {user.name.split(" ").map(n => n[0]).slice(0,2).join("")}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <Badge color={status === "active" ? "green" : status === "banned" ? "red" : "yellow"}>
                {status.toUpperCase()}
              </Badge>
              <p className="text-xs text-[var(--color-muted)]">Joined {user.createdAt} • Last active {user.lastActive}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Open edit modal (mock)")}
            className="px-3 py-2 rounded-lg border border-[var(--color-muted)]/30 bg-[var(--color-formBg)]"
          >
            Edit Info
          </button>

          <button
            onClick={resetPassword}
            className="px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white"
          >
            Reset Password
          </button>

          <button
            onClick={toggleBan}
            className={`px-3 py-2 rounded-lg ${status === "active" ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
          >
            {status === "active" ? "Ban User" : "Unban User"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (profile + tiles) */}
        <div className="space-y-6 lg:col-span-1">
          {/* Profile card */}
          <div className="p-6 rounded-2xl bg-[var(--color-cardBg)] shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-[var(--color-accentBg)] flex items-center justify-center text-2xl font-bold">
                {user.name.split(" ").map(n => n[0]).slice(0,2).join("")}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-[var(--color-muted)]">{user.email}</p>
                <p className="text-sm text-[var(--color-muted)]">{user.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[var(--color-muted)]">Gender</p>
                <p className="font-medium">{user.gender}</p>
              </div>
              <div>
                <p className="text-[var(--color-muted)]">DOB</p>
                <p className="font-medium">{user.dob}</p>
              </div>

              <div>
                <p className="text-[var(--color-muted)]">City</p>
                <p className="font-medium">{user.city}</p>
              </div>
              <div>
                <p className="text-[var(--color-muted)]">Account created</p>
                <p className="font-medium">{user.createdAt}</p>
              </div>

              <div>
                <p className="text-[var(--color-muted)]">Verification</p>
                <p className="font-medium">
                  <span className="mr-2">Email: {user.verification.email ? "Yes" : "No"}</span>
                  <span className="mr-2">Phone: {user.verification.phone ? "Yes" : "No"}</span>
                  <span>KYC: {user.verification.kyc ? "Yes" : "No"}</span>
                </p>
              </div>

              <div>
                <p className="text-[var(--color-muted)]">Wallet</p>
                <p className="font-medium">₦{user.wallet.toLocaleString()}</p>
              </div>

              <div>
                <p className="text-[var(--color-muted)]">Referral</p>
                <p className="font-medium">{user.referral ?? "—"}</p>
              </div>
            </div>
          </div>

          {/* Activity overview tiles */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Total Rides" value={userRides.length} />
            <StatCard title="Total Deliveries" value={userDeliveries.length} />
            <StatCard title="Orders Placed" value={userOrders.length} />
            <StatCard title="Complaints" value={userTickets.length} />
            <StatCard title="Wallet Txns" value={userWallet.length} />
            <StatCard title="Last Active" value={user.lastActive} />
          </div>
        </div>

        {/* Right / Main column (tabs + tables) */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="mb-4">
            <div className="flex gap-2">
              {[
                { key: "rides", label: "Rides" },
                { key: "deliveries", label: "Deliveries" },
                { key: "wallet", label: "Wallet Logs" },
                { key: "orders", label: "Orders" },
                { key: "tickets", label: "Tickets" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-4 py-2 rounded-full text-sm ${activeTab === t.key ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-formBg)] text-[var(--color-text)]"}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Rides */}
            {activeTab === "rides" && (
              <div className="bg-[var(--color-accentBg)] rounded-2xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--color-cardBg)]">
                    <tr>
                      <th className="p-3 text-left">Trip ID</th>
                      <th className="p-3 text-left">From → To</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Driver</th>
                      <th className="p-3 text-left">Fare</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRides.map((r) => (
                      <tr key={r.id} className="border-b hover:bg-[var(--color-accentBg)]">
                        <td className="p-3">{r.id}</td>
                        <td className="p-3">{r.pickup} → {r.dropoff}</td>
                        <td className="p-3">{r.date}</td>
                        <td className="p-3">{r.driver}</td>
                        <td className="p-3">₦{r.fare.toLocaleString()}</td>
                        <td className="p-3">
                          <Badge color={r.status === "completed" ? "green" : r.status === "cancelled" ? "red" : "yellow"}>{r.status}</Badge>
                        </td>
                        <td className="p-3">
                          <button onClick={() => setSelectedRide(r)} className="text-[var(--color-link)]">View</button>
                        </td>
                      </tr>
                    ))}
                    {userRides.length === 0 && <tr><td colSpan={7} className="p-4 text-center text-[var(--color-muted)]">No rides found</td></tr>}
                  </tbody>
                </table>
              </div>
            )}

            {/* Deliveries */}
            {activeTab === "deliveries" && (
              <div className="bg-[var(--color-accentBg)] rounded-2xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--color-cardBg)]">
                    <tr>
                      <th className="p-3 text-left">Delivery ID</th>
                      <th className="p-3 text-left">Pickup → Dropoff</th>
                      <th className="p-3 text-left">Item</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Rider</th>
                      <th className="p-3 text-left">Fee</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDeliveries.map((d) => (
                      <tr key={d.id} className="border-b hover:bg-[var(--color-accentBg)]">
                        <td className="p-3">{d.id}</td>
                        <td className="p-3">{d.pickup} → {d.dropoff}</td>
                        <td className="p-3">{d.item}</td>
                        <td className="p-3">{d.date}</td>
                        <td className="p-3">{d.rider}</td>
                        <td className="p-3">₦{d.fee.toLocaleString()}</td>
                        <td className="p-3"><Badge color={d.status === "delivered" ? "green" : "yellow"}>{d.status}</Badge></td>
                        <td className="p-3"><button onClick={() => setSelectedDelivery(d)} className="text-[var(--color-link)]">View</button></td>
                      </tr>
                    ))}
                    {userDeliveries.length === 0 && <tr><td colSpan={8} className="p-4 text-center text-[var(--color-muted)]">No deliveries found</td></tr>}
                  </tbody>
                </table>
              </div>
            )}

            {/* Wallet */}
            {activeTab === "wallet" && (
              <div className="bg-[var(--color-accentBg)] rounded-2xl shadow overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-[var(--color-muted)]/20">
                  <h3 className="font-semibold">Wallet Transactions</h3>
                  <div className="flex items-center gap-3">
                    <button onClick={downloadWalletCSV} className="px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm">Download CSV</button>
                  </div>
                </div>

                <table className="w-full text-sm">
                  <thead className="bg-[var(--color-cardBg)]">
                    <tr>
                      <th className="p-3 text-left">Txn ID</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Amount</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {userWallet.map(t => (
                      <tr key={t.id} className="border-b">
                        <td className="p-3">{t.id}</td>
                        <td className="p-3">{t.type}</td>
                        <td className="p-3">₦{t.amount.toLocaleString()}</td>
                        <td className="p-3">{t.date}</td>
                        <td className="p-3">{t.desc}</td>
                        <td className="p-3"><Badge color={t.type === "credit" ? "green" : "red"}>{t.status}</Badge></td>
                      </tr>
                    ))}
                    {userWallet.length === 0 && <tr><td colSpan={6} className="p-4 text-center text-[var(--color-muted)]">No transactions</td></tr>}
                  </tbody>
                </table>
              </div>
            )}

            {/* Orders */}
            {activeTab === "orders" && (
              <div className="bg-[var(--color-accentBg)] rounded-2xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--color-cardBg)]">
                    <tr>
                      <th className="p-3 text-left">Order ID</th>
                      <th className="p-3 text-left">Items</th>
                      <th className="p-3 text-left">Vendor</th>
                      <th className="p-3 text-left">Total</th>
                      <th className="p-3 text-left">Payment</th>
                      <th className="p-3 text-left">Delivery</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOrders.map(o => (
                      <tr key={o.id} className="border-b">
                        <td className="p-3">{o.id}</td>
                        <td className="p-3">{o.items}</td>
                        <td className="p-3">{o.vendor}</td>
                        <td className="p-3">₦{o.total.toLocaleString()}</td>
                        <td className="p-3">{o.payment}</td>
                        <td className="p-3">{o.deliveryRequested ? "Yes" : "No"}</td>
                        <td className="p-3"><Badge color={o.status === "delivered" ? "green" : "yellow"}>{o.status}</Badge></td>
                        <td className="p-3"><button className="text-[var(--color-link)]">View</button></td>
                      </tr>
                    ))}
                    {userOrders.length === 0 && <tr><td colSpan={8} className="p-4 text-center text-[var(--color-muted)]">No orders</td></tr>}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tickets */}
            {activeTab === "tickets" && (
              <div className="bg-[var(--color-accentBg)] rounded-2xl shadow overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--color-cardBg)]">
                    <tr>
                      <th className="p-3 text-left">Ticket ID</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-left">Preview</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTickets.map(t => (
                      <tr key={t.id} className="border-b">
                        <td className="p-3">{t.id}</td>
                        <td className="p-3">{t.category}</td>
                        <td className="p-3">{t.preview}</td>
                        <td className="p-3">{t.date}</td>
                        <td className="p-3"><Badge color={t.status === "resolved" ? "green" : "yellow"}>{t.status}</Badge></td>
                        <td className="p-3"><button onClick={() => alert(t.body)} className="text-[var(--color-link)]">View</button></td>
                      </tr>
                    ))}
                    {userTickets.length === 0 && <tr><td colSpan={6} className="p-4 text-center text-[var(--color-muted)]">No tickets</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin control panel (sticky bottom right) */}
      <div className="fixed bottom-6 right-6 w-80 p-4 rounded-2xl bg-[var(--color-cardBg)] shadow">
        <h4 className="font-semibold mb-2">Admin Controls</h4>
        <div className="flex flex-col gap-2">
          <button onClick={() => { setStatus("suspended"); alert("User suspended (mock)"); }} className="px-3 py-2 rounded-lg bg-yellow-500 text-white">Suspend User</button>
          <button onClick={toggleBan} className={`px-3 py-2 rounded-lg ${status === "active" ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}>{status === "active" ? "Ban User" : "Unban User"}</button>
          <button onClick={resetPassword} className="px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white">Reset Password</button>
          <button onClick={() => alert("Edit modal (mock)")} className="px-3 py-2 rounded-lg border">Edit Profile</button>

          <div>
            <p className="text-[var(--color-muted)] text-xs mb-1">Admin notes (private)</p>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full p-2 rounded-lg bg-[var(--color-formBg)] text-sm" placeholder="Add private notes..."/>
            <div className="flex justify-end mt-2">
              <button onClick={() => alert("Note saved (mock)")} className="px-3 py-1 rounded-lg bg-[var(--color-primary)] text-white text-sm">Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Modal */}
      {selectedRide && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-3xl bg-[var(--color-accentBg)] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold">Ride {selectedRide.id} — Details</h3>
              <button onClick={() => setSelectedRide(null)} className="text-[var(--color-primary)]">Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[var(--color-muted)]">Route</p>
                <p className="font-medium">{selectedRide.pickup} → {selectedRide.dropoff}</p>

                <p className="text-[var(--color-muted)] mt-3">Driver</p>
                <p className="font-medium">{selectedRide.driver}</p>

                <p className="text-[var(--color-muted)] mt-3">Fare</p>
                <p className="font-medium">₦{selectedRide.fare.toLocaleString()}</p>

                {selectedRide.complaint && (
                  <>
                    <p className="text-[var(--color-muted)] mt-3">Complaint</p>
                    <p className="text-sm text-red-700">{selectedRide.complaint}</p>
                  </>
                )}
              </div>

              <div>
                <p className="text-[var(--color-muted)]">Map preview</p>
                <div className="h-48 rounded-lg bg-[var(--color-cardBg)] flex items-center justify-center text-[var(--color-muted)]">
                  Map placeholder
                </div>

                <div className="mt-3">
                  <p className="text-[var(--color-muted)]">Payment breakdown</p>
                  <div className="mt-2 text-sm">
                    <div className="flex justify-between"><span>Base fare</span><span>₦500</span></div>
                    <div className="flex justify-between"><span>Distance</span><span>₦800</span></div>
                    <div className="flex justify-between"><span>Tax/Fees</span><span>₦200</span></div>
                    <div className="flex justify-between font-semibold mt-2"><span>Total</span><span>₦{selectedRide.fare}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-[var(--color-accentBg)] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold">Delivery {selectedDelivery.id} — Details</h3>
              <button onClick={() => setSelectedDelivery(null)} className="text-[var(--color-primary)]">Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[var(--color-muted)]">Pickup</p>
                <p className="font-medium">{selectedDelivery.pickup}</p>

                <p className="text-[var(--color-muted)] mt-3">Dropoff</p>
                <p className="font-medium">{selectedDelivery.dropoff}</p>

                <p className="text-[var(--color-muted)] mt-3">Item</p>
                <p className="font-medium">{selectedDelivery.item}</p>
              </div>

              <div>
                <p className="text-[var(--color-muted)]">Rider</p>
                <p className="font-medium">{selectedDelivery.rider}</p>

                <p className="text-[var(--color-muted)] mt-3">Fee</p>
                <p className="font-medium">₦{selectedDelivery.fee}</p>

                <p className="text-[var(--color-muted)] mt-3">Status</p>
                <Badge color={selectedDelivery.status === "delivered" ? "green" : "yellow"}>{selectedDelivery.status}</Badge>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
