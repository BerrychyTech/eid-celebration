// File: /components/WhoItsFor.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaMobileAlt } from "react-icons/fa";
import {
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";

const audience = [
  { icon: <UserGroupIcon className="h-12 w-12 text-primary" />, label: "Families" },
  { icon: <AcademicCapIcon className="h-12 w-12 text-primary" />, label: "Students" },
  { icon: <BriefcaseIcon className="h-12 w-12 text-primary" />, label: "Business Travelers" },
  { icon: <TicketIcon className="h-12 w-12 text-primary" />, label: "Event Planners" },
];

export default function WhoItsFor() {
  return (
    <section className="bg-background dark:bg-dark-background text-text dark:text-dark-text py-20 px-4 font-poppins">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-10">
          Who Is BerryGo For?
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          {audience.map((a, idx) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.6,
                delay: idx * 0.1,
              }}
              className="flex flex-col items-center gap-2"
            >
              {a.icon}
              <p className="text-sm md:text-base font-medium">{a.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-red-500 transition"
          >
            <FaMobileAlt size={20} />
            Start Booking Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
