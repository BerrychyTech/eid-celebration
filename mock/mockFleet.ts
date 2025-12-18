import {
  FleetApplication,
  FleetPartner,
  FleetVehicle,
  FleetMetrics,
  FleetPaymentRecord,
} from "@/types/fleet";

export const mockFleetApplications: FleetApplication[] = [
  {
    id: "APP-001",
    partnerName: "Musa Ibrahim",
    companyName: "Ibrahim Transport Ltd.",
    phone: "08034567890",
    email: "ibrahimfleet@gmail.com",
    submittedAt: "2025-01-11",
    status: "pending",
    documents: [
      {
        id: "doc1",
        name: "CAC Certificate",
        url: "https://via.placeholder.com/600",
      },
    ],
  },
  {
    id: "APP-002",
    partnerName: "Grace Motors",
    companyName: "Grace AutoFleet",
    phone: "08098765432",
    email: "gracefleet@gmail.com",
    submittedAt: "2025-01-09",
    status: "approved",
    documents: [],
  },
];

export const mockFleetPartners: FleetPartner[] = [
  {
    id: "FP-001",
    partnerName: "Grace Motors",
    companyName: "Grace AutoFleet",
    phone: "08098765432",
    email: "gracefleet@gmail.com",
    status: "approved",
    weeklyPaymentValue: 15000,
    vehicles: [],
    createdAt: "2024-12-20",
  },
];

export const mockFleetVehicles: FleetVehicle[] = [
  {
    id: "VH-1001",
    model: "Toyota Corolla",
    plateNumber: "ABJ-234-KY",
    year: 2021,
    status: "active",
    assignedDriver: "John Doe",
    documents: [
      {
        id: "ins1",
        name: "Insurance Paper",
        url: "https://via.placeholder.com/500",
      },
    ],
  },
  {
    id: "VH-1002",
    model: "Honda Civic",
    plateNumber: "LAG-889-QS",
    year: 2020,
    status: "under-maintenance",
    documents: [],
  },
];

export const mockFleetMetrics: FleetMetrics[] = [
  {
    partnerId: "FP-001",
    totalEarnings: 950000,
    totalTrips: 320,
    totalDistance: 7800,
  },
];

export const mockFleetPayments: FleetPaymentRecord[] = [
  {
    id: "PAY-01",
    partnerId: "FP-001",
    week: "2025-W03",
    amount: 15000,
    paid: true,
  },
];
