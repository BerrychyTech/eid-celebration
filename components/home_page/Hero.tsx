// File: /components/Hero.tsx
"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { FiVideo } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="pt-28 pb-16 px-4 bg-background dark:bg-dark-background text-text dark:text-dark-text font-poppins">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
        {/* Left Text Column */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Smart, Clean, <br />
            Digital Inter-Town Travel
          </h1>
          <p className="text-base md:text-lg text-muted dark:text-dark-muted max-w-md">
            Book clean cars. Nearby pickup. Pay online. No stress.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 text-white bg-primary px-6 py-3 rounded-lg font-medium text-lg shadow hover:opacity-90 transition"
            >
              <FaArrowRight className="text-white" />
              Book a Ride
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-link dark:text-dark-link hover:underline font-medium text-lg"
            >
              <FiVideo />
              Watch How It Works
            </Link>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex-1">
          <img
            src="/happy-car.jpg"
            alt="Clean car and map preview"
            className="w-full max-w-md mx-auto rounded-xl shadow"
          />
        </div>
      </div>
    </section>
  );
}
