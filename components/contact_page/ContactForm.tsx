"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sendMessage } from "@/app/actions/sendMessage";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    const result = await sendMessage(formData);
    setStatus(result.success ? "sent" : "error");
  }

  return (
    <section className="max-w-4xl mx-auto px-4 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="p-8 rounded-xl bg-accentBg/40 dark:bg-dark-card"
      >
        <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>

        {status === "sent" && (
          <p className="mb-4 text-green-600 font-semibold">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="mb-4 text-red-600 font-semibold">Something went wrong.</p>
        )}

        <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="name" required placeholder="Your Name" className="p-3 rounded-lg bg-background dark:bg-dark-background border border-gray-300 dark:border-gray-700" />
          <input name="email" required type="email" placeholder="Email Address" className="p-3 rounded-lg bg-background dark:bg-dark-background border border-gray-300 dark:border-gray-700" />
          <input name="phone" required placeholder="Phone Number" className="p-3 rounded-lg bg-background dark:bg-dark-background border md:col-span-2 border-gray-300 dark:border-gray-700" />
          <textarea name="message" required rows={5} placeholder="Your Message" className="p-3 rounded-lg bg-background dark:bg-dark-background border md:col-span-2 border-gray-300 dark:border-gray-700" />

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-primary text-white py-3 rounded-lg md:col-span-2">
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
