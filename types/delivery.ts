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
