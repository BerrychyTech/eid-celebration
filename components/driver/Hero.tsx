"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export function DriverHero() {
  return (
    <section className="relative overflow-hidden bg-primary text-white py-24 font-poppins">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl top-10 left-1/2 -translate-x-1/2 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Become a Driver with <span className="text-yellow-300">BerryGo</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg opacity-90 max-w-2xl mx-auto mb-10"
        >
          Earn more. Drive flexibly. Join a community of professional drivers changing mobility.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link
            href="#apply"
            className="px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Apply Now
          </Link>

          <a
            href="https://wa.me/2349012345678" // replace with your agent number
            target="_blank"
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 hover:bg-green-600 transition"
          >
            <FaWhatsapp className="text-xl" /> Chat With an Agent
          </a>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-16 flex justify-center"
        >
          <div className="relative">
            {/* Car Glow Animation */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-72 h-10 bg-white/20 blur-xl rounded-full animate-pulse" />

            {/* Main Driver Image */}
            <Image
              src="/images/driver-keys.png" // change to your asset
              alt="Driver holding car keys"
              width={350}
              height={350}
              className="relative z-10 drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
