"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWallet, FaTicketAlt } from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore"; // keep if you have it

export default function DashboardHero({
  upcomingCount = 1,
  walletBalance = 1200,
  points = 24,
}: {
  upcomingCount?: number;
  walletBalance?: number;
  points?: number;
}) {
  // if you have an auth store, you can use it:
  // const user = useAuthStore((s) => s.user);
  const user = { fullName: "Aliyu" };

  return (
    <section className="bg-accentBg dark:bg-dark-accentBg rounded-xl p-6 shadow-sm font-poppins">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-cardBg dark:bg-dark-cardBg flex items-center justify-center overflow-hidden">
          {/* if you have user avatar URL use <Image /> */}
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-lg">
            {user.fullName?.[0] ?? "U"}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-semibold">
            Good {new Date().getHours() < 12 ? "Morning" : "Afternoon"},{" "}
            <span className="text-primary dark:text-dark-primary">{user.fullName}</span>
          </h2>
          <p className="text-sm text-muted dark:text-dark-muted mt-1 max-w-xl">
            Here’s your quick overview. Book a ride, check your bookings, or top-up your wallet.
          </p>

          <div className="mt-4 flex gap-4 flex-wrap">
            <div className="px-4 py-2 bg-cardBg dark:bg-dark-cardBg rounded-lg shadow-sm flex items-center gap-3">
              <FaTicketAlt className="w-5 h-5 text-primary dark:text-dark-primary" />
              <div>
                <div className="text-xs text-muted dark:text-dark-muted">Upcoming</div>
                <div className="font-semibold">{upcomingCount} ride(s)</div>
              </div>
            </div>

            <div className="px-4 py-2 bg-cardBg dark:bg-dark-cardBg rounded-lg shadow-sm flex items-center gap-3">
              <FaWallet className="w-5 h-5 text-primary dark:text-dark-primary" />
              <div>
                <div className="text-xs text-muted dark:text-dark-muted">Wallet</div>
                <div className="font-semibold">₦{walletBalance.toLocaleString()}</div>
              </div>
            </div>

            <div className="px-4 py-2 bg-cardBg dark:bg-dark-cardBg rounded-lg shadow-sm flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">★</div>
              <div>
                <div className="text-xs text-muted dark:text-dark-muted">Loyalty</div>
                <div className="font-semibold">{points} pts</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-primary dark:bg-dark-primary text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            Book a ride
          </Link>
        </div>
      </div>
    </section>
  );
}
