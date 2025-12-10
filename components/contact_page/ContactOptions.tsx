"use client";
import { motion } from "framer-motion";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function ContactOptions() {
  const options = [
    { icon: <PhoneIcon className="h-10 w-10 text-primary" />, title: "Phone Support", desc: "+234 704 698 8904" },
    { icon: <EnvelopeIcon className="h-10 w-10 text-primary" />, title: "Email", desc: "support@berrygo.com" },
    { icon: <MapPinIcon className="h-10 w-10 text-primary" />, title: "Office Locations", desc: "Dutse, Hadejia, Gumel" },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {options.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.6 }}
          className="p-6 rounded-xl bg-accentBg/40 dark:bg-dark-card text-center"
        >
          <div className="flex justify-center mb-3">{item.icon}</div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-muted dark:text-dark-muted">{item.desc}</p>
        </motion.div>
      ))}
    </section>
  );
}
