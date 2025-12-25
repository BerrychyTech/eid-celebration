"use client";

import React from "react";
import Link from "next/link";

const promos = [
  { title: "Refer & earn ₦500", desc: "refer a fleet partner", href: "#" },
  { title: "10% off to Kano", desc: "Limited time", href: "#" },
  { title: "Group booking perks", desc: "Book full car & save", href: "#" },
  { title: "Refer & earn ₦500", desc: "Share with friends", href: "#" },
];

export default function PromotionsCarousel() {
  return (
    <div className="bg-cardBg dark:bg-dark-cardBg p-4 rounded-lg shadow">
      <div className="text-sm font-semibold mb-3">Promotions</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {promos.map((p, i) => (
          <Link key={i} href={p.href} className="p-3 rounded-md bg-accentBg dark:bg-dark-accentBg hover:scale-[1.02] transition">
            <div className="text-sm font-semibold">{p.title}</div>
            <div className="text-xs text-muted dark:text-dark-muted mt-1">{p.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
