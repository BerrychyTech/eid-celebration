"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const data = [
  { q: "How long does approval take?", a: "Usually 24–48 hours." },
  { q: "When do I get paid?", a: "Payouts are sent weekly." },
  {
    q: "Do I need my own car?",
    a: "Yes, or you can join a fleet partner who provides vehicles.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center">FAQ</h2>

      <div className="mt-10 max-w-2xl mx-auto">
        {data.map((item, i) => (
          <FAQItem key={i} item={item} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ item }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-4">
      <button
        className="w-full flex justify-between"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium">{item.q}</span>
        <FiChevronDown
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">{item.a}</p>
      )}
    </div>
  );
}
