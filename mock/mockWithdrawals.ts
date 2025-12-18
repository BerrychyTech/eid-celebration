export interface Withdrawal {
  id: string;
  driverId: string;
  amount: number;
  status: "pending" | "completed" | "rejected";
  date: string;
}

export const mockWithdrawals: Withdrawal[] = [
  { id: "WDL-001", driverId: "DRV-001", amount: 5000, status: "pending", date: "2025-12-01" },
  { id: "WDL-002", driverId: "DRV-002", amount: 3000, status: "completed", date: "2025-11-28" },
];
