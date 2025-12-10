"use client";
import { motion } from "framer-motion";

export default function ContactPAQs() {
  const paqs = [
    { q: "How fast does BerryGo support reply?", a: "Most messages get responses within minutes." },
    { q: "Can I contact BerryGo on WhatsApp?", a: "Yes, WhatsApp support is 24/7." },
    { q: "Do you have physical offices?", a: "Yes — Kano, Abuja, Lagos." },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 mb-20">
      <h2 className="text-2xl font-heading font-bold mb-6">PAQs — People Also Ask</h2>

      <div className="space-y-4">
        {paqs.map((item, idx) => (
          <motion.details
            key={item.q}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-lg bg-accentBg/30 dark:bg-dark-card"
          >
            <summary className="font-semibold">{item.q}</summary>
            <p className="mt-2 text-muted dark:text-dark-muted">{item.a}</p>
          </motion.details>
        ))}
      </div>
    </section>
  );
}
