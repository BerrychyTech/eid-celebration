"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FAQSection() {
  const faqs = [
    {
      q: "How does BerryGo work?",
      a: "Choose your towns, select seats, confirm booking, and prepare for pickup."
    },
    {
      q: "Can I track the driver?",
      a: "Driver tracking is coming soon. You’ll be able to see ETA and arrival status."
    },
    {
      q: "Is BerryGo safe?",
      a: "Yes. All drivers and vehicles are verified and follow strict safety processes."
    },
    {
      q: "Do you offer event or fleet rentals?",
      a: "Yes, we provide vehicles for weddings, events, conferences, and group trips."
    },
    {
      q: "Can I cancel a booking?",
      a: "Yes. Cancellation policies apply depending on time and seat availability."
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-accentBg dark:bg-dark-accentBg">
      <h2 className="text-3xl font-semibold text-center">People Also Ask</h2>

      <div className="max-w-3xl mx-auto mt-10 space-y-4 px-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="bg-cardBg dark:bg-dark-cardBg rounded-xl shadow p-4 cursor-pointer"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{item.q}</h3>
              <FaChevronDown
                className={`transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </div>

            {open === i && (
              <p className="mt-3 text-sm text-muted dark:text-dark-muted">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
