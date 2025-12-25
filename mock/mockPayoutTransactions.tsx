/* ================= TRANSACTION TYPE ================= */

export type Transaction = {
  id: string;
  type: "ride" | "delivery" | "topup" | "payout";
  status: "pending" | "completed" | "failed";
  amount: number;
  driverName: string;
  driverId: string;
  createdAt: string;
};

/* ================= MOCK DATA ================= */

export const mockPayoutTransactions: Transaction[] = [
  {
    id: "TXN-1001",
    type: "payout",
    status: "completed",
    amount: 12500,
    driverName: "Ahmed Musa",
    driverId: "DRV-001",
    createdAt: "2025-12-18T10:15:00Z",
  },
  {
    id: "TXN-1002",
    type: "payout",
    status: "completed",
    amount: 8900,
    driverName: "Ibrahim Sadiq",
    driverId: "DRV-002",
    createdAt: "2025-12-18T12:30:00Z",
  },
  {
    id: "TXN-1003",
    type: "payout",
    status: "pending",
    amount: 15400,
    driverName: "Samuel John",
    driverId: "DRV-003",
    createdAt: "2025-12-19T09:45:00Z",
  },
  {
    id: "TXN-1004",
    type: "payout",
    status: "completed",
    amount: 6700,
    driverName: "Usman Bello",
    driverId: "DRV-004",
    createdAt: "2025-12-19T14:10:00Z",
  },
  {
    id: "TXN-1005",
    type: "topup",
    status: "completed",
    amount: 5000,
    driverName: "",
    driverId: "",
    createdAt: "2025-12-19T15:00:00Z",
  },
];
