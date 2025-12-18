export type FleetPartnerStatus = 
  | "pending"
  | "approved"
  | "rejected";

export type VehicleStatus =
  | "active"
  | "inactive"
  | "under-maintenance"
  | "available";

export interface FleetDocument {
  id: string;
  name: string;
  url: string;
}

export interface FleetApplication {
  id: string;
  partnerName: string;
  companyName: string;
  phone: string;
  email: string;
  submittedAt: string;
  status: FleetPartnerStatus;
  documents: FleetDocument[];
}

export interface FleetPartner {
  id: string;
  partnerName: string;
  companyName: string;
  phone: string;
  email: string;
  status: FleetPartnerStatus;
  vehicles: FleetVehicle[];
  weeklyPaymentValue: number | null;
  createdAt: string;
}

export interface FleetVehicle {
  id: string;
  model: string;
  plateNumber: string;
  year: number;
  status: VehicleStatus;
  assignedDriver?: string;
  documents: FleetDocument[];
}

export interface FleetMetrics {
  partnerId: string;
  totalEarnings: number;
  totalTrips: number;
  totalDistance: number; // km
}

export interface FleetPaymentRecord {
  id: string;
  partnerId: string;
  amount: number;
  week: string; // e.g "2025-W04"
  paid: boolean;
}

export type FleetVehicleStatus = "active" | "available" | "maintenance";

export interface FleetVehicle {
  id: string;
  model: string;
  plate: string;
  status: VehicleStatus;
  partnerId: string;
}

export interface AssignmentRecord {
  vehicleId: string;
  driverId: string;
  assignedAt: string;
}

export interface FleetDriver {
  id: string;
  name: string;
  phone: string;
  currentVehicle?: string; // vehicleId or undefined
  walletBalance: number;
  bankName: string;
  accountNumber: string;
}
