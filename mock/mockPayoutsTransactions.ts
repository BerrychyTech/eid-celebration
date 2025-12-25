// /mock/mockTransactions.ts

export type TransactionType =
  | "ride_earning"
  | "delivery_earning"
  | "payout"
  | "adjustment";

export type TransactionStatus =
  | "pending"
  | "completed"
  | "failed";

export interface Transaction {
  id: string;
  driverId: string;
  driverName: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  createdAt: string; // ISO
}

/* ================= MOCK DATA ================= */

export const mockTransactions: Transaction[] = [
  {
    id: "TX-001",
    driverId: "DRV1",
    driverName: "Tunde Akande",
    type: "delivery_earning",
    amount: 8500,
    status: "completed",
    createdAt: "2025-01-01T10:12:00Z",
  },
  {
    id: "TX-002",
    driverId: "DRV1",
    driverName: "Tunde Akande",
    type: "delivery_earning",
    amount: 4200,
    status: "completed",
    createdAt: "2025-01-02T14:40:00Z",
  },
  {
    id: "TX-003",
    driverId: "DRV2",
    driverName: "Aisha Bello",
    type: "ride_earning",
    amount: 12000,
    status: "completed",
    createdAt: "2025-01-03T09:05:00Z",
  },
  {
    id: "TX-004",
    driverId: "DRV2",
    driverName: "Aisha Bello",
    type: "payout",
    amount: 15000,
    status: "completed",
    createdAt: "2025-01-04T18:30:00Z",
  },
  {
    id: "TX-005",
    driverId: "DRV1",
    driverName: "Tunde Akande",
    type: "payout",
    amount: 10000,
    status: "pending",
    createdAt: "2025-01-05T08:00:00Z",
  },
  {
    id: "TX-006",
    driverId: "DRV3",
    driverName: "Samuel Okoye",
    type: "delivery_earning",
    amount: 6400,
    status: "completed",
    createdAt: "2025-01-06T12:20:00Z",
  },
];
