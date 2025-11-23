// File: /components/HowItWorks.tsx
"use client";

import { motion } from "framer-motion";
import {
  MapPinIcon,
  UsersIcon,
  CreditCardIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    icon: <MapPinIcon className="h-8 w-8 text-primary" />,
    title: "Choose Route & Seats",
    desc: "Pick your travel route, number of seats, and your pickup point.",
  },
  {
    icon: <UsersIcon className="h-8 w-8 text-primary" />,
    title: "Select Class or Fleet",
    desc: "Economy, Business, or full ceremonial fleet — your call.",
  },
  {
    icon: <CreditCardIcon className="h-8 w-8 text-primary" />,
    title: "Pay & Get Confirmed",
    desc: "Pay securely via Paystack. Get instant booking confirmation.",
  },
  {
    icon: <XMarkIcon className="h-8 w-8 text-primary" />,
    title: "Cancel Anytime (2hrs+)",
    desc: "Change of plans? Cancel freely up to 2 hours before departure.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-accentBg dark:bg-dark-background text-text dark:text-dark-text py-20 px-4 font-poppins">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-12">
          How It Works
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                type: "spring",
                bounce: 0.25,
                duration: 0.6,
                delay: idx * 0.1,
              }}
              className="p-5 rounded-xl bg-cardBg/40 dark:bg-dark-cardBg"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted dark:text-dark-muted">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
