// store/useBookingStore.ts
import { create } from "zustand";

interface BookingState {
  bookingData: any;
  setBookingData: (data: any) => void;
  clearBookingData: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookingData: null,
  setBookingData: (data) => set({ bookingData: data }),
  clearBookingData: () => set({ bookingData: null }),
}));