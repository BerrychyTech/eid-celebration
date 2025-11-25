// File: /components/BookingPreview.tsx
"use client";

import { useState } from "react";

export default function BookingPreview() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    seats: "1",
  });

  const [errors, setErrors] = useState({ from: "", to: "", date: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = { from: "", to: "", date: "" };
    let valid = true;

    if (!form.from.trim()) {
      newErrors.from = "Please enter departure town.";
      valid = false;
    }
    if (!form.to.trim()) {
      newErrors.to = "Please enter destination town.";
      valid = false;
    }
    if (!form.date) {
      newErrors.date = "Please select a travel date.";
      valid = false;
    } else if (new Date(form.date) < new Date()) {
      newErrors.date = "Date must be today or in the future.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    console.log("✅ Booking Preview Submitted:", form);
    alert("Booking search submitted!");
  }

  return (
    <section className="bg-accentBg/20 dark:bg-dark-cardBg py-12 px-4 font-poppins">
      <div className="max-w-4xl mx-auto rounded-xl p-6 bg-cardBg dark:bg-dark-cardBg shadow">
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6 text-text dark:text-dark-text">
          🚗 Preview a Trip
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {/* From */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-text dark:text-dark-text">From</label>
            <input
              type="text"
              name="from"
              value={form.from}
              onChange={handleChange}
              placeholder="e.g. Abuja"
              className="rounded-md border border-muted dark:border-dark-muted bg-cardBg dark:bg-dark-cardBg px-3 py-2 text-sm text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
            />
            {errors.from && <p className="text-red-600 text-xs mt-1">{errors.from}</p>}
          </div>

          {/* To */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-text dark:text-dark-text">To</label>
            <input
              type="text"
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="e.g. Kano"
              className="rounded-md border border-muted dark:border-dark-muted bg-cardBg dark:bg-dark-cardBg px-3 py-2 text-sm text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
            />
            {errors.to && <p className="text-red-600 text-xs mt-1">{errors.to}</p>}
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-text dark:text-dark-text">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="rounded-md border border-muted dark:border-dark-muted bg-cardBg dark:bg-dark-cardBg px-3 py-2 text-sm text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
            />
            {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
          </div>

          {/* Seats */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-text dark:text-dark-text">Seats</label>
            <select
              name="seats"
              value={form.seats}
              onChange={handleChange}
              className="rounded-md border border-muted dark:border-dark-muted bg-cardBg dark:bg-dark-cardBg px-3 py-2 text-sm text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
            >
              {[1, 2, 3, 4].map((s) => (
                <option key={s} value={s.toString()}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary text-white px-6 py-3 rounded-lg text-base font-semibold hover:opacity-90 transition"
          >
            🔍 Find Rides
          </button>
        </div>
      </div>
    </section>
  );
}
