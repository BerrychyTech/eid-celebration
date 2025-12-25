export type NormalUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "suspended";
  verified: boolean;
  createdAt: string;
};

export const mockUsers: NormalUser[] = [
  {
    id: "usr_001",
    name: "Aliyu Musa",
    email: "aliyu@example.com",
    phone: "+2348012345678",
    status: "active",
    verified: true,
    createdAt: "2024-06-01",
  },
  {
    id: "usr_002",
    name: "Fatima Sadiq",
    email: "fatima@example.com",
    phone: "+2348098765432",
    status: "active",
    verified: false,
    createdAt: "2024-06-05",
  },
  {
    id: "usr_003",
    name: "Sadiq Ibrahim",
    email: "sadiq@example.com",
    phone: "+2347076543210",
    status: "suspended",
    verified: true,
    createdAt: "2024-05-18",
  },
];
