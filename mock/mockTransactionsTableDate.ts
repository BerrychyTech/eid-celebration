export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  driverId?: string;
  driverName?: string;
  category: "ride" | "delivery" | "wallet" | "marketplace";
  amount: number;
  date: string;
}

export const mockTransactions: Transaction[] = [
  {
    id: "TXN-001",
    userId: "USR-001",
    userName: "Aliyu Musa",
    driverId: "DRV-001",
    driverName: "Driver John",
    category: "ride",
    amount: 2500,
    date: "2025-12-01",
  },
  {
    id: "TXN-002",
    userId: "USR-002",
    userName: "Sadiya Bello",
    driverId: "DRV-002",
    driverName: "Driver Ibrahim",
    category: "delivery",
    amount: 3500,
    date: "2025-12-02",
  },
  {
    id: "TXN-003",
    userId: "USR-003",
    userName: "Grace Anthony",
    category: "wallet",
    amount: 5000,
    date: "2025-12-03",
  },
  {
    id: "TXN-004",
    userId: "USR-004",
    userName: "Kingsley",
    category: "marketplace",
    amount: 1500,
    date: "2025-12-04",
  },
];
