export type Booking = {
  id: number;
  fromTown: string;
  toTown: string;
  travelDate: string;
  class: string;
  seats: number;
  status: "confirmed" | "cancelled" | "completed";
  state?: string;
  bagCount?: number;
};