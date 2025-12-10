"use client";

import React from "react";
import toast from "react-hot-toast";
import { createBooking } from "@/lib/bookings";
import { useAuthStore } from "@/store/useAuthStore";
import { calculateTotal, calculateBagFee, isFullCar } from "@/utils/priceUtils";
import { stateCityMap } from "@/constants/tripConstants";
import { useRouter } from "next/navigation";

export function useRegularTripForm() {
  const router = useRouter();

  const [form, setForm] = React.useState({
    currentState: "",
    destinationState: "",
    from: "",
    to: "",
    date: "",
    travelClass: "economy",
    bagCount: "1",
    pickupLocation: "",
    pickupTime: "",
    seats: "1",
  });

  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  // Derived values
  const fromOptions = form.currentState ? stateCityMap[form.currentState] || [] : [];
  const toOptions = form.destinationState ? stateCityMap[form.destinationState] || [] : [];

  const luggageFee = calculateBagFee(parseInt(form.bagCount));
  const fullCar = isFullCar(form.seats);
  const seats = fullCar ? 4 : parseInt(form.seats || "1");
  const total = calculateTotal(seats, luggageFee, fullCar);

  // Tailwind classes
  const dropdownClass =
    "w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-accentBg dark:bg-dark-accentBg text-text dark:text-dark-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out";

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "currentState") return { ...prev, currentState: value, from: "", to: "" };
      if (name === "destinationState") return { ...prev, destinationState: value, to: "" };
      return { ...prev, [name]: value };
    });
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.currentState || !form.destinationState || !form.from || !form.to || !form.date) {
      toast.error("All fields are required.");
      return;
    }

    if (form.from === form.to) {
      toast.error("🚫 'From' and 'To' cannot be the same.");
      return;
    }

    const travelDate = new Date(form.date);
    if (travelDate <= new Date()) {
      toast.error("Travel date must be in the future.");
      return;
    }

    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmSubmit = async () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      toast.error("Please login first.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fromTown: form.from,
        toTown: form.to,
        travelDate: form.date,
        currentState: form.currentState,
        destinationState: form.destinationState,
        travelClass: form.travelClass,
        bagCount: parseInt(form.bagCount),
        pickupLocation: form.pickupLocation,
        pickupTime: form.pickupTime,
        seats: fullCar ? 9 : parseInt(form.seats),
      };

      const response = await createBooking(payload, token);

      toast.success("🎉 Booking confirmed!");
      setShowModal(false); // Close modal
      if (!response?.bookingId) {
        toast.error("Booking ID missing from server response");
        return;
      }
      // Redirect to booking success page with booking ID
      router.push(`/booking-success?id=${response.bookingId}`);

      // Optionally reset form if you want users to book again
      setForm({
        currentState: "",
        destinationState: "",
        from: "",
        to: "",
        date: "",
        travelClass: "economy",
        bagCount: "1",
        pickupLocation: "",
        pickupTime: "",
        seats: "1",
      });
    } catch (err) {
      toast.error("❌ Booking failed.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    total,
    luggageFee,
    fromOptions,
    toOptions,
    dropdownClass,
    showModal,
    handleChange,
    handlePreSubmit,
    handleConfirmSubmit,
    closeModal: () => setShowModal(false),
  };
}
