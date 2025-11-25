"use client";

import * as React from "react";
import toast from "react-hot-toast";
import { createBooking } from "@/lib/bookings";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegularTripForm() {
  const [form, setForm] = React.useState({
    currentState: "",
    destinationState: "",
    from: "",
    to: "",
    date: "",
    travelClass: "economy",
    bagCount: "1",
    pickup: "",
    pickupLocation: "",
    pickupTime: "",
    seats: "1",
  });

  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const stateCityMap = {
    jigawa: ["dutse", "gumel", "hadejia"],
    kano: ["kano"],
  };

  // Cities for FROM (based on currentState)
  const fromOptions = form.currentState
    ? stateCityMap[form.currentState as keyof typeof stateCityMap] || []
    : [];

  // Cities for TO (based on destinationState)
  const toOptions = form.destinationState
    ? stateCityMap[form.destinationState as keyof typeof stateCityMap] || []
    : [];

  const basePrice = 2500;
  const luggageFee = Math.max(0, parseInt(form.bagCount) - 1) * 500;
  const isFullCar = form.seats === "full-car";
  const seats = isFullCar ? 4 : parseInt(form.seats || "1", 10);
  const fullCarFee = isFullCar ? 1500 : 0;
  const total = (basePrice + luggageFee) * seats + fullCarFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (name === "currentState") {
        return { ...prev, currentState: value, from: "", to: "" };
      }
      if (name === "destinationState") {
        return { ...prev, destinationState: value, to: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.currentState ||
      !form.destinationState ||
      !form.from ||
      !form.to ||
      !form.date
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (form.from === form.to) {
      toast.error("🚫 'From' and 'To' cannot be the same city.");
      return;
    }

    const today = new Date();
    const travelDate = new Date(form.date);

    if (travelDate <= today) {
      toast.error("Travel date must be in the future.");
      return;
    }

    setShowModal(true);
  };

  const handleConfirmSubmit = async () => {
    
  const token = useAuthStore.getState().token;
    if (!token) {
      toast.error("Please login first.");
      return;
    }

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
      seats: isFullCar ? 9 : parseInt(form.seats),
    };

    try {
      setLoading(true);
      await createBooking(payload, token);
      toast.success("🎉 Booking confirmed!");

      setForm({
        currentState: "",
        destinationState: "",
        from: "",
        to: "",
        date: "",
        travelClass: "economy",
        bagCount: "1",
        pickup: "",
        pickupLocation: "",
        pickupTime: "",
        seats: "1",
      });

      setShowModal(false);
    } catch (err) {
      toast.error("❌ Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  // Tailwind classes for animated borders
  const dropdownClass =
    "w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-accentBg dark:bg-dark-accentBg text-text dark:text-dark-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out";

  return (
    <>
      <form
        className="bg-cardBg dark:bg-dark-cardBg text-text dark:text-dark-text p-6 rounded-lg shadow space-y-6 font-poppins"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* CURRENT STATE */}
          <div>
            <label className="text-sm font-medium block mb-1">Current State</label>
            <select
              name="currentState"
              value={form.currentState}
              onChange={handleChange}
              className={dropdownClass}
            >
              <option value="">Select State</option>
              <option value="jigawa">Jigawa</option>
              <option value="kano">Kano</option>
            </select>
          </div>

          {/* DESTINATION STATE */}
          <div>
            <label className="text-sm font-medium block mb-1">Destination State</label>
            <select
              name="destinationState"
              value={form.destinationState}
              onChange={handleChange}
              className={dropdownClass}
            >
              <option value="">Select Destination State</option>
              <option value="jigawa">Jigawa</option>
              <option value="kano">Kano</option>
            </select>
          </div>

          {/* FROM */}
          <div>
            <label className="text-sm font-medium block mb-1">From</label>
            <select
              name="from"
              value={form.from}
              onChange={handleChange}
              disabled={!form.currentState}
              className={dropdownClass}
            >
              <option value="">Select From</option>
              {fromOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* TO */}
          <div>
            <label className="text-sm font-medium block mb-1">To</label>
            <select
              name="to"
              value={form.to}
              onChange={handleChange}
              disabled={!form.destinationState}
              className={dropdownClass}
            >
              <option value="">Select To</option>
              {toOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* TRAVEL DATE */}
          <div>
            <label className="text-sm font-medium block mb-1">Travel Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className={dropdownClass}
            />
          </div>

          {/* PICKUP LOCATION */}
          <div>
            <label className="text-sm font-medium block mb-1">Pickup Location</label>
            <select
              name="pickupLocation"
              value={form.pickupLocation}
              onChange={handleChange}
              className={dropdownClass}
            >
              <option value="">Select Pickup Location</option>
              {[1, 2, 3, 4, 5].map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* PICKUP TIME */}
          <div>
            <label className="text-sm font-medium block mb-1">Pickup Time</label>
            <select
              name="pickupTime"
              value={form.pickupTime}
              onChange={handleChange}
              className={dropdownClass}
            >
              <option value="">Select Time</option>
              <option value="06:00">06:00 AM</option>
              <option value="08:00">08:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">02:00 PM</option>
            </select>
          </div>

          {/* BAG COUNT */}
          <div>
            <label className="text-sm font-medium block mb-1">Luggage (number of bags)</label>
            <select
              name="bagCount"
              value={form.bagCount}
              onChange={handleChange}
              className={dropdownClass}
            >
              <option value="1">1 (Free)</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          {/* SEATS */}
          <div>
            <label className="text-sm font-medium block mb-1">Seats</label>
            <select
              name="seats"
              value={form.seats}
              onChange={handleChange}
              className={dropdownClass}
            >
              <option value="1">1 Seat</option>
              <option value="2">2 Seats</option>
              <option value="3">3 Seats</option>
              <option value="4">4 Seats</option>
              <option value="full-car">Request Full Car</option>
            </select>
          </div>
        </div>

        <div className="text-right text-sm font-medium">
          Total:{" "}
          <span className="text-primary dark:text-dark-primary">
            ₦{total.toLocaleString()}
          </span>
        </div>

        <button
          type="button" onClick={handlePreSubmit}
          className="bg-primary dark:bg-dark-primary hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Booking..." : "🔍 Search Rides"}
        </button>
      </form>

      {/* CONFIRM MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]">
          <div className="bg-cardBg dark:bg-dark-cardBg p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 font-poppins">
            <h2 className="text-lg font-semibold">🧾 Confirm Booking</h2>

            <ul className="text-sm space-y-1">
              <li><strong>From:</strong> {form.from}</li>
              <li><strong>To:</strong> {form.to}</li>
              <li><strong>Current State:</strong> {form.currentState}</li>
              <li><strong>Destination State:</strong> {form.destinationState}</li>
              <li><strong>Date:</strong> {form.date}</li>
              <li><strong>Seats:</strong> {form.seats}</li>
              <li><strong>Class:</strong> {form.travelClass}</li>
              <li><strong>Bags:</strong> {form.bagCount}</li>
              <li><strong>Bag Fee:</strong> ₦{luggageFee.toLocaleString()}</li>
              <li><strong>Pickup Location:</strong> {form.pickupLocation}</li>
              <li><strong>Pickup Time:</strong> {form.pickupTime}</li>
              <li><strong>Total:</strong> ₦{total.toLocaleString()}</li>
            </ul>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="bg-primary dark:bg-dark-primary text-white font-semibold px-4 py-2 rounded text-sm"
              >
                {loading ? "Submitting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
