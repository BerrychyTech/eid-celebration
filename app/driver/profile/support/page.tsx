"use client";

import { useState } from "react";

const categories: Record<string, string[]> = {
  ride: ["Driver delay", "Payment issue", "Route issue"],
  fleet: ["Fleet request pending", "Vehicle issue"],
  delivery: ["Delivery delay", "Item missing"],
  other: ["App bug", "Account issue", "Suggestion"],
};

export default function SupportPage() {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background px-4 py-10">
      <div className="max-w-3xl mx-auto bg-cardBg dark:bg-dark-cardBg rounded-xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-primary">
          Support Center
        </h1>

        {/* Support Type */}
        <div>
          <label className="block text-sm font-medium mb-1">
            What do you need help with?
          </label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setCategory("");
            }}
            className="w-full bg-formBg dark:bg-dark-formBg border rounded px-3 py-2"
          >
            <option value="">Select support type</option>
            <option value="ride">Ride</option>
            <option value="fleet">Fleet Request</option>
            <option value="delivery">Delivery</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Category */}
        {type && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Issue category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-formBg dark:bg-dark-formBg border rounded px-3 py-2"
            >
              <option value="">Select category</option>
              {categories[type].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        )}

        {/* Description */}
        {category && (
          <>
            <textarea
              placeholder="Explain the issue..."
              className="w-full bg-formBg dark:bg-dark-formBg border rounded px-3 py-2 h-32"
            />

            <button className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90">
              Submit Ticket
            </button>
          </>
        )}
      </div>
    </div>
  );
}
