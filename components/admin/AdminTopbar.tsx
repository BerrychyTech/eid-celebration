"use client";
import React, { useState } from "react";

export default function AdminTopbar() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="sticky top-0 left-0 right-0 h-16 bg-[var(--color-accentBg)] border-b border-[var(--color-muted)]/20 flex items-center justify-between px-6 z-20">
      <input
        className="px-4 py-2 w-72 bg-[var(--color-formBg)] border rounded-xl text-sm"
        placeholder="Search anything..."
      />

      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white font-medium"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
