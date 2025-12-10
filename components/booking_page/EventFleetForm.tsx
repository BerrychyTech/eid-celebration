// File: src/components/booking/EventFleetForm.tsx
"use client";

import * as React from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

const states = ["Kano", "Jigawa"];
const townsMap: Record<string, string[]> = {
  Kano: ["Kano"],
  Jigawa: ["Gumel", "Dutse", "Hadejia"],
};

export default function EventFleetForm() {
  const [form, setForm] = React.useState({
    pickupState: "",
    pickupTown: "",
    destinationState: "",
    destinationTown: "",
    eventDate: "",
    eventTime: "",
    eventType: "",
    vehicleType: "",
    quantity: "1",
    notes: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [showWaitingPage, setShowWaitingPage] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFleetRequest = () => {
    // Check required fields
    const required = ["pickupState", "pickupTown", "destinationState", "destinationTown", "eventDate", "eventTime", "eventType", "vehicleType"];
    const empty = required.find((f) => !form[f as keyof typeof form]);
    if (empty) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Show popup
    if (window.confirm(
      "Your fleet request payment schedule is being prepared.\nYou shall be updated within five minutes."
    )) {
      // Replace form with waiting page
      setShowWaitingPage(true);
    }
  };

  // Destination towns excluding pickup town
  const destinationTownsOptions = form.destinationState
    ? townsMap[form.destinationState].filter((t) => t !== form.pickupTown)
    : [];

  if (showWaitingPage) {
    return (
      <div className="p-6 bg-cardBg dark:bg-dark-cardBg rounded-lg shadow text-center font-poppins">
        <h2 className="text-xl font-semibold mb-4">Please wait...</h2>
        <p className="text-text dark:text-dark-text mb-2">
          Your booking price is being scheduled on your account.
        </p>
        <p className="text-text dark:text-dark-text">
          You can complete your booking process by making the required payment once scheduled.
        </p>
      </div>
    );
  }

  return (
    <form className="bg-cardBg dark:bg-dark-cardBg p-6 rounded-lg shadow space-y-6 font-poppins">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pickup State */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Pickup State</label>
          <select
            name="pickupState"
            value={form.pickupState}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          >
            <option value="">Select Pickup State</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Pickup Town */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Pickup Town</label>
          <select
            name="pickupTown"
            value={form.pickupTown}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          >
            <option value="">Select Pickup Town</option>
            {form.pickupState && townsMap[form.pickupState].map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Destination State */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Destination State</label>
          <select
            name="destinationState"
            value={form.destinationState}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          >
            <option value="">Select Destination State</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Destination Town */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Destination Town</label>
          <select
            name="destinationTown"
            value={form.destinationTown}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          >
            <option value="">Select Destination Town</option>
            {destinationTownsOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Event Date */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Event Date</label>
          <input
            type="date"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          />
        </div>

        {/* Event Time */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Time</label>
          <input
            type="time"
            name="eventTime"
            value={form.eventTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Event Type</label>
          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          >
            <option value="">Select</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate Travel</option>
            <option value="conference">Conference</option>
            <option value="school">School Trip</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Vehicle Type</label>
          <select
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          >
            <option value="">Select</option>
            <option value="bus">Bus</option>
            <option value="suv">SUV</option>
            <option value="car">Car</option>
            <option value="hiace">Hiace</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Quantity</label>
          <input
            type="number"
            name="quantity"
            min={1}
            max={10}
            value={form.quantity}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          />
        </div>
      </div>

      <div className="text-right">
        <button
          type="button"
          disabled={loading}
          onClick={handleFleetRequest}
          className="bg-primary dark:bg-dark-primary hover:bg-primary/80 dark:hover:bg-dark-primary/80 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Submitting..." : "🔘 Request Fleet"}
        </button>
      </div>
    </form>
  );
}
