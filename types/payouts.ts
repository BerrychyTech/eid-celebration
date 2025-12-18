export type PayoutStatus = "pending" | "paid" | "on-hold";

export interface DriverPayout {
  driverId: string;
  driverName: string;
  trips: number;
  grossEarnings: number; // total before platform commission
  commission: number; // platform cut
  amountDue: number; // computed: grossEarnings - commission
  walletBalance: number;
  period: string; // e.g. "2025-W02"
  status: PayoutStatus;
}

export interface PayoutRecord {
  id: string;
  driverId: string;
  driverName: string;
  amount: number;
  method: "bank" | "wallet";
  admin?: string;
  date: string;
  note?: string;
}
