// File: /components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import DarkModeToggle from "./DarkModeToggle";

const menu = [
  { label: "Home", href: "/" },
  { label: "Book a Ride", href: "/book" },
  { label: "My Bookings", href: "/mybookings" },
  { label: "Fleet Partner", href: "/fleet-partner" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();
  const { user, logout, hasHydrated } = useAuthStore();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    setTimeout(() => {
      logout();
    }, 1000);
  };

    const filteredMenu = user
    ? 
    [
    { label: "Dashboard", href: "/dashboard" },  
    ...menu.filter((item) => item.label !== "Home"),
    ]
    : menu;

  const renderAuth = () => {
    if (user) {
      return (
        <div className="relative group" aria-haspopup="true" aria-expanded="false">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-primary dark:bg-dark-primary text-white flex items-center justify-center uppercase text-sm">
              {user.fullName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "👤"}
            </div>
            <span className="text-sm">{user.fullName || user.email || "👤"}</span>
            <ChevronDown className="w-4 h-4 text-muted dark:text-dark-muted group-hover:text-primary dark:group-hover:text-dark-primary transition" />
          </div>

          <div className="absolute top-full right-0 mt-2 w-44 bg-cardBg dark:bg-dark-cardBg border rounded shadow hidden group-hover:block z-50 text-sm font-poppins">
            <Link href="/profile" className="block px-4 py-2 hover:bg-accentBg dark:hover:bg-dark-accentBg">
              My Account
            </Link>
            <Link href="/mybookings" className="block px-4 py-2 hover:bg-accentBg dark:hover:bg-dark-accentBg">
              My Bookings
            </Link>
            <Link href="/support" className="block px-4 py-2 hover:bg-accentBg dark:hover:bg-dark-accentBg">
              Support
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-accentBg dark:hover:bg-dark-accentBg"
              disabled={loggingOut}
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      );
    }

    return (
      <Link href="/login" className="hover:text-primary dark:hover:text-dark-primary text-sm font-medium">
        Login / Register
      </Link>
    );
  };

  if (!hasHydrated) {
    return (
      <header className="fixed w-full top-0 z-50 bg-accentBg dark:bg-dark-accentBg shadow px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="h-10 w-24 bg-muted dark:bg-dark-muted rounded animate-pulse" />
          <div className="h-8 w-8 bg-muted dark:bg-dark-muted rounded-full animate-pulse" />
        </div>
      </header>
    );
  }

  return (
    <header className="fixed w-full top-0 z-50 bg-cardBg dark:bg-dark-cardBg text-text dark:text-dark-text shadow font-poppins">
      <div className="flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-poppins font-bold tracking-tight text-primary">
        BerryGo
        </Link>
        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
         {filteredMenu.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`hover:text-primary dark:hover:text-dark-primary transition ${
              pathname === item.href ? "text-primary dark:text-dark-primary font-semibold" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}

          {renderAuth()}
          <DarkModeToggle size="md" />
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden gap-3 items-center">
          <DarkModeToggle size="md" />
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-md bg-accentBg dark:bg-dark-accentBg hover:bg-accentBg hover:text-primary dark:hover:bg-dark-accentBg dark:hover:text-dark-primary transition text-2xl"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className="relative z-40">
        <div
          className={`fixed inset-0 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
          } bg-cardBg dark:bg-dark-cardBg text-text dark:text-dark-text p-6 font-poppins`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="text-3xl text-primary dark:text-dark-primary mb-6 block ml-auto"
            aria-label="Close menu"
          >
            &times;
          </button>
          <nav className="flex flex-col gap-4 text-lg font-medium">
            {filteredMenu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`hover:text-primary dark:hover:text-dark-primary transition ${
                pathname === item.href ? "text-primary dark:text-dark-primary font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

            <div className="mt-6">{renderAuth()}</div>
          </nav>
        </div>
      </div>
    </header>
  );
}
