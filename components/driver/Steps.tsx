"use client";
import { motion } from "framer-motion";

const steps = [
  "Fill the driver application form",
  "Upload all required documents",
  "Vehicle inspection & verification",
  "Start driving and earning",
];

export default function Steps() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-[#111] px-6">
      <h2 className="text-3xl font-bold text-center">Onboarding Steps</h2>

      <div className="max-w-2xl mx-auto mt-10 space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-4 rounded-lg shadow bg-white dark:bg-neutral-900"
          >
            <p className="text-lg font-medium">
              {i + 1}. {step}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
