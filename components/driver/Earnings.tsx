"use client";
import { motion } from "framer-motion";

export default function Earnings() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-[#111] px-6">
      <h2 className="text-3xl font-bold text-center">Earnings Breakdown</h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-2xl mx-auto mt-10 p-6 rounded-xl shadow bg-white dark:bg-neutral-900"
      >
        <p className="text-lg">
          💰 <strong>Keep up to 85%</strong> of every ride.
        </p>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          You earn more during peak hours and high demand zones. Weekly payouts
          ensure consistent income.
        </p>
      </motion.div>
    </section>
  );
}
