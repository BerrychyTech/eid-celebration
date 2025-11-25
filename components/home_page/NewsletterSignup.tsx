// File: /components/NewsletterSignup.tsx
"use client";

import * as React from "react";
import api from "@/lib/api"; // adjust path if needed
import toast from "react-hot-toast";
import { FiBell } from "react-icons/fi";

export default function NewsletterSignup() {
  const [form, setForm] = React.useState({ email: "", town: "" });
  const [errors, setErrors] = React.useState({ email: "", town: "" });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function validateForm() {
    const newErrors = { email: "", town: "" };
    let valid = true;

    if (!form.email.trim() || !validateEmail(form.email)) {
      newErrors.email = "Enter a valid email.";
      valid = false;
    }
    if (!form.town.trim()) {
      newErrors.town = "Enter your town.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await api.post("/newsletter", form);
      toast.success("🎉 Thanks! We’ll notify you when we launch.");
      setForm({ email: "", town: "" });
    } catch (err: any) {
      toast.error("❌ Subscription failed. Try again later.");
      console.error("Newsletter error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-accentBg/30 dark:bg-dark-cardBg py-16 px-4 font-poppins">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-text dark:text-dark-text">
          📥 Be the first to know when we launch in your town.
        </h2>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4 sm:flex-row sm:items-end justify-center"
        >
          <div className="flex-1">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-muted dark:border-dark-muted bg-formBg dark:bg-dark-formBg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1 text-left">{errors.email}</p>
            )}
          </div>

          <div className="flex-1">
            <input
              type="text"
              name="town"
              value={form.town}
              onChange={handleChange}
              placeholder="Your town"
              className="w-full px-4 py-2 rounded-md border border-muted dark:border-dark-muted bg-formBg dark:bg-dark-formBg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.town && (
              <p className="text-xs text-red-600 mt-1 text-left">{errors.town}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-2 sm:mt-0 bg-primary text-white px-6 py-2 rounded-md font-semibold transition text-sm ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500"
            }`}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <FiBell className="inline mr-2 text-lg" /> Notify Me
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
