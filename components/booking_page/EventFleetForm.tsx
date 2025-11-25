// File: src/components/booking/EventFleetForm.tsx
"use client";

import * as React from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

export default function EventFleetForm() {
  const [form, setForm] = React.useState({
    eventDate: "",
    eventTime: "",
    location: "",
    eventType: "",
    vehicleType: "",
    quantity: "1",
    notes: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.eventDate || !form.eventTime || !form.location || !form.eventType || !form.vehicleType) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
  const token = useAuthStore.getState().token;
      await api.post("/bookings/fleet", form, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      toast.success("✅ Fleet request submitted successfully!");
      setForm({
        eventDate: "",
        eventTime: "",
        location: "",
        eventType: "",
        vehicleType: "",
        quantity: "1",
        notes: "",
      });
    } catch (err: any) {
      console.error(err);
      toast.error("❌ Failed to submit booking. Check your data or login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cardBg dark:bg-dark-cardBg p-6 rounded-lg shadow space-y-6 font-poppins"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Pickup Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Central Mosque, Dutse"
            value={form.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          />
        </div>

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

        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min={1}
            max={10}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          />
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary dark:bg-dark-primary hover:bg-primary/80 dark:hover:bg-dark-primary/80 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Submitting..." : "🔘 Request Fleet"}
        </button>
      </div>
    </form>
  );
}
