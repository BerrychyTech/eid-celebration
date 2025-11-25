"use client";

import React from "react";

export default function NotificationsBanner({ messages = [] }: { messages?: string[] }) {
  const list = messages.length ? messages : [
    "₦500 off for first ride — use code FIRST500",
    "New: Group booking discounts for events",
  ];

  return (
    <div className="bg-accentBg dark:bg-dark-accentBg rounded-lg p-3 shadow-sm font-poppins">
      <div className="text-sm font-semibold mb-1">Announcements</div>
      <div className="flex gap-3 overflow-x-auto py-1">
        {list.map((m, i) => (
          <div key={i} className="whitespace-nowrap px-3 py-2 bg-cardBg dark:bg-dark-cardBg rounded-md">
            <div className="text-xs text-muted dark:text-dark-muted">{m}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
