export interface User {
  id: string;
  name: string;
  walletBalance: number;
}

export const mockUsers: User[] = [
  { id: "USR-001", name: "Aliyu Musa", walletBalance: 10000 },
  { id: "USR-002", name: "Sadiya Bello", walletBalance: 8000 },
  { id: "USR-003", name: "Grace Anthony", walletBalance: 5000 },
  { id: "USR-004", name: "Kingsley", walletBalance: 3000 },
];
