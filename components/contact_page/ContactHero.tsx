"use client";
import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="py-20 text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-4xl font-heading font-bold"
      >
        Contact <div className="text-primary inline">BerryGo</div>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-4 text-muted dark:text-dark-muted max-w-xl mx-auto"
      >
        We respond within minutes. Reach out anytime.
      </motion.p>
    </section>
  );
}
