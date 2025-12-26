// File: src/components/booking/EventFleetForm.tsx
"use client";

import * as React from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

const pickupState = "Jigawa";
const jigawaTowns = ["Gumel", "Dutse", "Hadejia"];

export default function EventFleetForm() {
  const [form, setForm] = React.useState({
    pickupState,
    pickupTown: "",
    destinationState: "",
    destinationTown: "",
    eventDate: "",
    eventTime: "",
    eventType: "",
    vehicleType: "",
    quantity: "1",
    tripFlow: "", // go only / go & return
    stayDuration: "", // hours or days
    journeyDescription: "", // optional textarea
    notes: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [showWaitingPage, setShowWaitingPage] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

    const token = useAuthStore.getState().token;

  const handleFleetRequest = async () => {
    const required = [
      "pickupTown",
      "destinationState",
      "destinationTown",
      "eventDate",
      "eventTime",
      "eventType",
      "vehicleType",
      "tripFlow",
    ];

    const empty = required.find((f) => !form[f as keyof typeof form]);
    if (empty) {
      toast.error("Please fill all required fields.");
      return;
    }

    const confirmed = window.confirm(
      "Your fleet request payment schedule is being prepared.\nYou shall be updated within five minutes."
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await api.post(
        "/event-fleet",
        {
          pickupState,
          pickupTown: form.pickupTown,
          destinationState: form.destinationState,
          destinationTown: form.destinationTown,
          eventDate: form.eventDate,
          eventTime: form.eventTime,
          tripFlow: form.tripFlow,
          stayDuration: form.stayDuration || null,
          eventType: form.eventType,
          vehicleType: form.vehicleType,
          quantity: Number(form.quantity),
          journeyDescription: form.journeyDescription || null,
          notes: form.notes || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Fleet request submitted successfully 🚐");
      setShowWaitingPage(true);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to submit fleet request"
      );
    } finally {
      setLoading(false);
    }
  };


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

        {/* Pickup State (Fixed) */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Pickup State</label>
          <input
            value="Jigawa"
            disabled
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          />
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
            <option value="">Select Town</option>
            {jigawaTowns.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Destination State (Input) */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Destination State</label>
          <input
            type="text"
            name="destinationState"
            value={form.destinationState}
            onChange={handleChange}
            placeholder="e.g. Kano"
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          />
        </div>

        {/* Destination Town (Input) */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Destination Town</label>
          <input
            type="text"
            name="destinationTown"
            value={form.destinationTown}
            onChange={handleChange}
            placeholder="e.g. Nassarawa"
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          />
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
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Event Time</label>
          <input
            type="time"
            name="eventTime"
            value={form.eventTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          />
        </div>

        {/* Journey Flow */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">Journey Flow</label>
          <select
            name="tripFlow"
            value={form.tripFlow}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
          >
            <option value="">Select Flow</option>
            <option value="one_way">One-Way Voyage</option>
            <option value="round_trip">Go & Graceful Return</option>
          </select>
        </div>

        {/* Stay Duration */}
        <div>
          <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">
            Time Spent at Destination
          </label>
          <input
            type="text"
            name="stayDuration"
            value={form.stayDuration}
            onChange={handleChange}
            placeholder="e.g. 6 hours / 2 days"
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
            <option value="bus">Rolls Royce</option>
            <option value="suv">Ferrari</option>
            <option value="car">Lamborghini</option>
            <option value="hiace">Homa</option>
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

      {/* Journey Description (Optional) */}
      <div>
        <label className="text-text dark:text-dark-text text-sm font-medium mb-1 block">
          Journey Description (Optional)
        </label>
        <textarea
          name="journeyDescription"
          value={form.journeyDescription}
          onChange={handleChange}
          rows={4}
          placeholder="Anything special we should know about this journey?"
          className="w-full px-3 py-2 border rounded-md bg-accentBg dark:bg-dark-accentBg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
        />
      </div>

      <div className="text-right">
        <button
          type="button"
          disabled={loading}
          onClick={handleFleetRequest}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Submitting..." : "🔘 Request Fleet"}
        </button>
      </div>
    </form>
  );
}
