import { DriverPayout, PayoutRecord } from "@/types/payouts";

export const mockDriverPayouts: DriverPayout[] = [
  {
    driverId: "DRV-101",
    driverName: "Ibrahim Musa",
    trips: 18,
    grossEarnings: 20000,
    commission: 3000,
    amountDue: 17000,
    walletBalance: 2000,
    period: "2025-W02",
    status: "pending",
  },
  {
    driverId: "DRV-102",
    driverName: "Grace Anthony",
    trips: 12,
    grossEarnings: 14000,
    commission: 2100,
    amountDue: 11900,
    walletBalance: 400,
    period: "2025-W02",
    status: "pending",
  },
  {
    driverId: "DRV-103",
    driverName: "John Samuel",
    trips: 9,
    grossEarnings: 9000,
    commission: 1350,
    amountDue: 7650,
    walletBalance: 5000,
    period: "2025-W02",
    status: "on-hold",
  },
];

export const mockPayoutHistory: PayoutRecord[] = [
  {
    id: "P-20251201-01",
    driverId: "DRV-100",
    driverName: "Old Driver",
    amount: 12000,
    method: "bank",
    admin: "admin1",
    date: "2025-12-01T10:00:00Z",
    note: "Weekly payout",
  },
];
