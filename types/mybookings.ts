export type Booking = {
  tripPrice: any;
  id: number;
  fromTown: string;
  toTown: string;
  travelDate: string;
  class: string;
  seats: number;
  status: "confirmed" | "cancelled" | "completed" | "new";
  state?: string;
  bagCount?: number;
};