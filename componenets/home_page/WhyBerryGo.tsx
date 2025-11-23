// File: /components/WhyBerryGo.tsx
"use client";

import { motion } from "framer-motion";
import {
  MapIcon,
  TruckIcon,
  CheckBadgeIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const features = [
  { icon: <TruckIcon className="h-8 w-8 text-primary" />, title: "Clean Cars", desc: "No dusty seats, no bad smells" },
  { icon: <ClockIcon className="h-8 w-8 text-primary" />, title: "Easy Booking", desc: "Mobile & Web access anytime" },
  { icon: <MapIcon className="h-8 w-8 text-primary" />, title: "Smart Pickup", desc: "Closest stop or doorstep option" },
  { icon: <CheckBadgeIcon className="h-8 w-8 text-primary" />, title: "Regular Servicing", desc: "We use only new cars" },
  { icon: <ShieldCheckIcon className="h-8 w-8 text-primary" />, title: "Secure Drivers", desc: "Verified, polite, uniformed" },
];

export default function WhyBerryGo() {
  return (
    <section className="bg-background dark:bg-dark-background text-text dark:text-dark-text py-16 px-4 font-poppins">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-10">
          Why Choose BerryGo?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                bounce: 0.3,
                duration: 0.8,
                delay: idx * 0.1,
              }}
              className="p-6 rounded-lg bg-accentBg/40 dark:bg-dark-card"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted dark:text-dark-muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
