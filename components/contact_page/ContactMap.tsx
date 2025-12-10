"use client";
import { motion } from "framer-motion";

export default function ContactMap() {
  return (
    <section className="max-w-5xl mx-auto px-4 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="w-full h-64 rounded-xl bg-gray-200 dark:bg-dark-card flex items-center justify-center text-muted dark:text-dark-muted"
      >
        Map will appear here
      </motion.div>
    </section>
  );
}
