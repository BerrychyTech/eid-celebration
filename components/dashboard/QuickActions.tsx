"use client";

import Link from "next/link";
import React from "react";
import { FaCar, FaCalendarAlt, FaWallet, FaQuestionCircle, FaUserPlus } from "react-icons/fa";

const actionItems = [
  { href: "/book", label: "Book a ride", icon: FaCar },
  { href: "/bookings", label: "My bookings", icon: FaCalendarAlt },
  { href: "/wallet", label: "Wallet", icon: FaWallet },
  { href: "/support", label: "Help", icon: FaQuestionCircle },
  { href: "/become-vendor", label: "Become vendor", icon: FaUserPlus },
  { href: "/be-fleet-partner", label: "Be fleet Partner", icon: FaUserPlus },

];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {actionItems.map((a) => {
        const Icon = a.icon;
        return (
          <Link
            key={a.href}
            href={a.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-cardBg dark:bg-dark-cardBg shadow hover:scale-[1.01] transition transform"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary dark:bg-dark-primary/10 dark:text-dark-primary flex items-center justify-center text-lg">
              <Icon />
            </div>
            <div className="text-sm font-medium">{a.label}</div>
          </Link>
        );
      })}
    </div>
  );
}
