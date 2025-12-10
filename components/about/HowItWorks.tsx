"use client";

import { motion } from "framer-motion";
import { FaClipboardCheck, FaMap, FaSmileBeam } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaClipboardCheck className="text-primary text-4xl" />,
      title: "Book Your Trip",
      desc: "Choose route, select seats, confirm booking.",
    },
    {
      icon: <FaMap className="text-primary text-4xl" />,
      title: "Prepare for Pickup",
      desc: "Track pickup time and driver proximity.",
    },
    {
      icon: <FaSmileBeam className="text-primary text-4xl" />,
      title: "Enjoy the Ride",
      desc: "Travel smoothly with trained drivers.",
    },
  ];

  return (
    <section className="py-20 bg-accentBg dark:bg-dark-accentBg font-poppins">
      <h2 className="text-3xl font-semibold text-center font-heading">
        How BerryGo Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mt-12">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: 0.8,
              delay: i * 0.1,
            }}
            className="p-6 rounded-2xl bg-accentBg/40 dark:bg-dark-card shadow text-center"
          >
            <div className="mb-3">{s.icon}</div>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-muted dark:text-dark-muted mt-2">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
