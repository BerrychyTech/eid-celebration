// types.ts
export interface DeliveryRequest {
  pickupTown: string;
  destinationTown: string;
  category: string;
  description: string;
  images: File[];
}

export interface Delivery {
  id: string;
  pickupTown: string;
  destinationTown: string;
  driver: string;
  status: 'Pending Verification' | 'Verified' | 'Scheduled' | 'In Transit' | 'Delivered';
  price: number;
  images: string[];
}

export type DeliveryStatus =
  | "pending"
  | "accepted"
  | "en-route"
  | "delivered"
  | "cancelled";

export interface DeliveryDocument {
  id: string;
  url: string;
  name: string;
}

export interface DeliveryRequest {
  id: string;
  sender: string;
  receiver: string;
  pickup: string;
  dropoff: string;
  itemType: string;
  fee: number;
  status: DeliveryStatus;
  driver?: string;
  createdAt: string;
  documents: DeliveryDocument[];
}
