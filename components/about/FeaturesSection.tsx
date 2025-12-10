"use client";

import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaUserShield,
  FaBusAlt,
  FaCalendarAlt,
  FaHandshake,
  FaCar,
} from "react-icons/fa";

export default function FeaturesSection() {
  const features = [
    { icon: <FaCar className="text-primary text-4xl" />, title: "Smart Booking", desc: "Book seats instantly across verified routes." },
    { icon: <FaMapMarkedAlt className="text-primary text-4xl" />, title: "Pickup Tracking", desc: "Know when your driver is approaching." },
    { icon: <FaCalendarAlt className="text-primary text-4xl" />, title: "Flexible Trips", desc: "Daily inter-state movements you can rely on." },
    { icon: <FaHandshake className="text-primary text-4xl" />, title: "Event Fleets", desc: "Hire cars & minibuses for events or ceremonies." },
    { icon: <FaUserShield className="text-primary text-4xl" />, title: "Safe Drivers", desc: "Verified drivers for safe and convenient travel." },
    { icon: <FaBusAlt className="text-primary text-4xl" />, title: "Organized Vehicles", desc: "Clean, inspected vehicles ready to move daily." },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 font-poppins">
      <h2 className="text-3xl font-semibold text-center font-heading">
        What We Offer
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {features.map((f, i) => (
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
            className="p-6 rounded-2xl bg-accentBg/40 dark:bg-dark-card shadow"
          >
            <div className="mb-3">{f.icon}</div>
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-muted dark:text-dark-muted mt-2">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
