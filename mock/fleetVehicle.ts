import { FleetVehicle } from "@/types/fleet";

export const mockFleetVehicles: FleetVehicle[] = [
  {
      id: "VH-2001",
      model: "Toyota Corolla 2015",
      plate: "ABJ-432KD",
      status: "active",
      partnerId: "FPT-001",
      plateNumber: "",
      year: 0,
      documents: []
  },
  {
      id: "VH-2002",
      model: "Honda Civic 2016",
      plate: "KAN-122HS",
      status: "available",
      partnerId: "FPT-002",
      plateNumber: "KKM-30JH",
      year: 0,
      documents: []
  },
  {
      id: "VH-2003",
      model: "Kia Rio 2017",
      plate: "LAG-889KJ",
      status: "under-maintenance",
      partnerId: "FPT-003",
      plateNumber: "",
      year: 0,
      documents: []
  },
];
