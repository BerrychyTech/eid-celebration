import { FleetDriver } from "@/types/fleet";

export const mockDrivers: FleetDriver[] = [
  {
    id: "DRV001",
    name: "Ibrahim Musa",
    phone: "+2348000000001",
    currentVehicle: "VH-2001",
    walletBalance: 12000,
    bankName: "GTBank",
    accountNumber: "0123456789"
  },
  {
    id: "DRV002",
    name: "Grace Anthony",
    phone: "+2348000000002",
    currentVehicle: undefined,
    walletBalance: 13000,
    bankName: "GtBank",
    accountNumber: "0123456789"
  },
  {
    id: "DRV003",
    name: "John Samuel",
    phone: "+2348000000003",
    currentVehicle: undefined,
    walletBalance: 2345,
    bankName: "GTBank",
    accountNumber: "0123456789"
  },
];

