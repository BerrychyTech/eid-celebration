export type AdminRole = "admin" | "super_admin" | "user";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "active" | "suspended";
  createdAt: string;
};

export const mockAdmins: AdminUser[] = [
  {
    id: "adm_001",
    name: "Super Admin",
    email: "superadmin@platform.com",
    role: "super_admin",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "adm_002",
    name: "Operations Admin",
    email: "ops@platform.com",
    role: "admin",
    status: "active",
    createdAt: "2024-03-02",
  },
  {
    id: "adm_003",
    name: "Support Admin",
    email: "support@platform.com",
    role: "admin",
    status: "suspended",
    createdAt: "2024-04-14",
  },
];
