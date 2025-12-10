"use client";

import React from "react";

interface Props {
  icon: React.ReactNode;
  label: string;
  value?: string;
  toggleValue?: boolean;
  onToggle?: () => void;
}

export default function ProfileRow({
  icon,
  label,
  value,
  toggleValue,
  onToggle,
}: Props) {
  return (
    <div className="flex items-center justify-between bg-cardBg dark:bg-dark-cardBg p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-text dark:text-dark-text font-medium">
          {label}
        </span>
      </div>

      {value && (
        <span className="text-muted dark:text-dark-muted text-sm">
          {value}
        </span>
      )}

      {/* 🌙 Custom Toggle Switch (No HeadlessUI) */}
      {typeof toggleValue === "boolean" && (
        <button
          type="button"
          onClick={onToggle}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition
            ${toggleValue ? "bg-primary dark:bg-dark-primary" : "bg-gray-300"}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition
              ${toggleValue ? "translate-x-6" : "translate-x-1"}
            `}
          />
        </button>
      )}
    </div>
  );
}
