"use client";

import { motion } from "framer-motion";
import { FaRoute, FaClock, FaCarSide } from "react-icons/fa";

export default function MissionSection() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-4 font-poppins">
      <h2 className="text-3xl font-semibold text-center font-heading">
        Our Mission
      </h2>

      <p className="mt-4 text-center text-muted dark:text-dark-muted max-w-3xl mx-auto">
        BerryGo is built to solve the challenges travelers face daily — 
        unpredictable transport, unsafe vehicles, lack of information, 
        and unreliable timing.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {[
          {
            icon: <FaRoute className="text-primary text-4xl" />,
            title: "Reliable Routes",
            desc: "Travel with confidence on verified routes and schedules.",
          },
          {
            icon: <FaCarSide className="text-primary text-4xl" />,
            title: "Better Mobility",
            desc: "Designed to make inter-state movements seamless and stress-free.",
          },
          {
            icon: <FaClock className="text-primary text-4xl" />,
            title: "Right On Time",
            desc: "We help users reach pickup points before the vehicle arrives.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "spring",
              bounce: 0.3,
              duration: 0.8,
              delay: idx * 0.1,
            }}
            className="p-6 rounded-2xl bg-accentBg/40 dark:bg-dark-card shadow"
          >
            <div className="mb-3">{item.icon}</div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-muted dark:text-dark-muted mt-2">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
