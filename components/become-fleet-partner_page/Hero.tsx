"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="px-6 py-20 bg-gradient-to-br from-primary/10 to-accentBg dark:from-dark-primary/10 dark:to-dark-accentBg rounded-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-3xl md:text-5xl font-semibold">
          Earn More. Drive with{" "}
          <span className="text-primary dark:text-dark-primary">BerryGo Fleet Partnership.</span>
        </h1>

        <p className="text-muted dark:text-dark-muted mt-4 text-lg max-w-2xl mx-auto">
          Register your car(s), get verified, and start earning daily income with ease.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="#apply"
            className="px-6 py-3 bg-primary dark:bg-dark-primary text-white rounded-xl shadow hover:opacity-90"
          >
            Apply Now
          </Link>

          <Link
            href="https://wa.me/2340000000000"
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl shadow"
          >
            <FaWhatsapp className="text-xl" />
            Speak With an Agent
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
