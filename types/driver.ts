// types/driver.ts
export type DriverStatus = "pending" | "approved" | "rejected" | "suspended" | "active" | "deactivated";

export interface DriverProfile {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  status: DriverStatus;
  city?: string;
  rating: number;
  trips: number;
  earnings: number;
  vehicleId?: string | null;
  onboardingStep?: number;
  createdAt?: string;
  lastActive?: string;
}

export interface DriverDocument {
  id: string;
  type: "nin" | "driverLicense" | "insurance" | "vehicleRegistration";
  url: string;
  uploadedAt: string;
  status: "pending" | "approved" | "rejected";
  expiryDate?: string | null;
  adminRemark?: string | null;
}

export interface VehicleInfo {
  id: string;
  plateNumber: string;
  model: string;
  color?: string;
  year?: number;
  insuranceExpiry?: string;
  registrationExpiry?: string;
}
