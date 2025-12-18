export type User = {
  id: string;
  name: string;
  walletBalance: number;
  status: "active" | "inactive" | "frozen";
};

export const mockUsers: User[] = [
  { id: "U-001", name: "Aliyu Musa", walletBalance: 15000, status: "active" },
  { id: "U-002", name: "Sadiya Bello", walletBalance: 3500, status: "active" },
  { id: "U-003", name: "Grace Anthony", walletBalance: 0, status: "frozen" },
];
