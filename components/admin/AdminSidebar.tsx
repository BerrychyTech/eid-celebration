"use client";
import React from "react";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", link: "/admin" },
  { name: "Users", link: "/admin/users" },
  { name: "Drivers", link: "/admin/drivers" },
  { name: "Vendors", link: "/admin/vendors" },
  { name: "Fleet", link: "/admin/fleet" },
  { name: "Bookings", link: "/admin/bookings" },
  { name: "Deliveries", link: "/admin/deliveries" },
  { name: "Wallet", link: "/admin/wallet" },
  { name: "Reports", link: "/admin/reports" },
  { name: "Payouts", link: "/admin/payouts" },
  { name: "Settings", link: "/admin/settings" },

];

export default function AdminSidebar() {
  const path = usePathname();

  return (
    <div className="w-64 h-screen fixed top-0 left-0 shadow-lg bg-[var(--color-accentBg)] text-[var(--color-text)]">
      <div className="px-6 py-6 border-b border-[var(--color-muted)]/20">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">BerryGo Admin</h1>
      </div>

      <nav className="mt-6 flex flex-col">
        {menu.map((item, index) => {
          const active = path === item.link;

          return (
            <a
              key={index}
              href={item.link}
              className={`px-6 py-3 text-sm font-medium hover:bg-[var(--color-cardBg)] transition-all ${
                active
                  ? "bg-[var(--color-primary)] text-white rounded-r-full"
                  : "text-[var(--color-text)]"
              }`}
            >
              {item.name}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
