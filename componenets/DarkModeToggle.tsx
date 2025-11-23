// File: /components/DarkModeToggle.tsx
"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface DarkModeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function DarkModeToggle({ 
  className = "", 
  size = "md" 
}: DarkModeToggleProps) {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const sizeClasses = {
    sm: "p-1.5 text-base",
    md: "p-2 text-xl",
    lg: "p-3 text-2xl",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={handleToggle}
      className={`
        rounded-md bg-accentBg dark:bg-dark-accentBg
        hover:bg-primary/10 hover:text-primary
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        dark:focus:ring-offset-dark-background
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className={iconSizes[size]} aria-hidden="true" />
      ) : (
        <Moon className={iconSizes[size]} aria-hidden="true" />
      )}
    </button>
  );
}
