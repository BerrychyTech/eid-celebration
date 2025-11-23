// File: /components/LaunchPromos.tsx
"use client";

import { motion } from "framer-motion";
import {
  GiftIcon,
  BanknotesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const promos = [
  {
    icon: <BanknotesIcon className="h-8 w-8 text-primary" />,
    title: "₦500 Off First Ride",
    desc: "New here? Get ₦500 discount instantly when you book your first trip.",
  },
  {
    icon: <GiftIcon className="h-8 w-8 text-primary" />,
    title: "₦500 per Referral",
    desc: "Invite a friend. They ride, you earn. Unlimited ₦500 bonuses.",
  },
  {
    icon: <UsersIcon className="h-8 w-8 text-primary" />,
    title: "Group Booking Perks",
    desc: "Need a full car or a ceremonial fleet? We’ve got special pricing.",
  },
];

export default function LaunchPromos() {
  return (
    <section className="bg-accentBg/20 dark:bg-dark-card text-text dark:text-dark-text py-20 px-4 font-poppins">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          🎉 Launch Promos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {promos.map((promo, idx) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.6,
                delay: idx * 0.1,
              }}
              className="bg-cardBg dark:bg-dark-cardBg p-6 rounded-lg shadow-sm"
            >
              <div className="mb-4">{promo.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{promo.title}</h3>
              <p className="text-sm text-muted dark:text-dark-muted">{promo.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
