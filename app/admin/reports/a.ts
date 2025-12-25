// ======= a.ts =======

// Wallet analytics function
export async function getWalletAnalytics() {
  await new Promise((res) => setTimeout(res, 200)); // simulate async

  return {
    totalWalletBalance: 12500000,
    weeklyTransactions: [120000, 150000, 110000, 180000],
    weeklyTopUps: [80000, 95000, 72000, 120000],
    topUsers: [
      { id: "u1", name: "Aliyu Umar", walletBalance: 500000 },
      { id: "u2", name: "Fatima Bello", walletBalance: 420000 },
      { id: "u3", name: "John Doe", walletBalance: 390000 },
    ],
    topDrivers: [
      { id: "d1", name: "Driver One", walletBalance: 750000 },
      { id: "d2", name: "Driver Two", walletBalance: 620000 },
    ],
  };
}

// Mock Users
export const mockUsers = [
  { id: "u1", name: "Aliyu Umar", email: "aliyu@example.com" },
  { id: "u2", name: "Fatima Bello", email: "fatima@example.com" },
  { id: "u3", name: "John Doe", email: "john@example.com" },
  { id: "u4", name: "Maryam Musa", email: "maryam@example.com" },
];

// Mock Drivers
export const mockDrivers = [
  { id: "d1", name: "Driver One", email: "driver1@example.com" },
  { id: "d2", name: "Driver Two", email: "driver2@example.com" },
  { id: "d3", name: "Driver Three", email: "driver3@example.com" },
];

// Mock Transactions
export const mockTransactions = [
  {
    id: "t1",
    type: "credit",
    amount: 5000,
    userName: "Aliyu Umar",
    driverName: "",
    createdAt: "2025-12-21",
  },
  {
    id: "t2",
    type: "debit",
    amount: 2000,
    userName: "Fatima Bello",
    driverName: "",
    createdAt: "2025-12-20",
  },
  {
    id: "t3",
    type: "credit",
    amount: 8000,
    userName: "",
    driverName: "Driver One",
    createdAt: "2025-12-19",
  },
  {
    id: "t4",
    type: "debit",
    amount: 1500,
    userName: "",
    driverName: "Driver Two",
    createdAt: "2025-12-18",
  },
];
