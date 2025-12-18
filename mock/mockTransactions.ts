export type Transaction = {
  userName: any;
  driverName: any;
  id: string;
  type: "ride" | "delivery" | "wallet" | "marketplace";
  userId: string;
  driverId?: string;
  amount: number;
  category: string;
  date: string;
};

export const mockTransactions: Transaction[] = [
  {
    id: "TX-001", type: "ride", userId: "U-001", driverId: "DRV-101", amount: 2500, category: "Ride Payment", date: "2025-01-10",
    userName: undefined,
    driverName: undefined
  },
  {
    id: "TX-002", type: "wallet", userId: "U-002", amount: 5000, category: "Top-up", date: "2025-01-12",
    userName: undefined,
    driverName: undefined
  },
  {
    id: "TX-003", type: "delivery", userId: "U-001", driverId: "DRV-103", amount: 1500, category: "Delivery Fee", date: "2025-01-14",
    userName: undefined,
    driverName: undefined
  },
];
