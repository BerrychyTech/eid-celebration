// File: /components/DriverNavbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function DriverNavbar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [tripType, setTripType] = useState<"ride" | "fleet">("ride");

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => logout(), 800);
  };

  const tripLink =
    tripType === "ride"
      ? "/driver/assigned-trips/rides"
      : "/driver/assigned-trips/fleet";

  return (
    <header className="fixed top-0 w-full z-50 bg-cardBg shadow font-poppins">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/driver/dashboard" className="text-xl font-bold text-primary">
          BerryGo Driver
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="text-muted">Trips:</span>
            <button
              onClick={() =>
                setTripType((p) => (p === "ride" ? "fleet" : "ride"))
              }
              className="px-3 py-1 rounded-full border text-primary text-xs hover:bg-primary/10 transition"
            >
              {tripType === "ride" ? "Ride Requests" : "Fleet Requests"}
            </button>
            <Link
              href={tripLink}
              className={pathname === tripLink ? "text-primary font-semibold hover:text-primary dark:hover:text-dark-primary" : ""}
            >
              Assigned Trips
            </Link>
          </div>

          <Link
            href="/driver/deliveries"
            className={pathname === "/driver/deliveries" ? "hover:text-primary dark:hover:text-dark-primary text-primary font-semibold" : ""}
          >
            Assigned Deliveries
          </Link>

          <Link
            href="/support"
            className={pathname === "/support" ? "hover:text-primary dark:hover:text-dark-primary text-primary font-semibold" : ""}
          >
            Support
          </Link>

          {/* Profile dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center uppercase text-sm">
                {user?.fullName?.[0] || "D"}
              </div>
              <ChevronDown className="w-4 h-4 text-muted" />
            </div>

            <div className="absolute right-0 mt-2 w-40 bg-cardBg border rounded shadow hidden group-hover:block text-sm">
              <Link
                href="/driver/profile"
                className="block px-4 py-2 hover:text-primary dark:hover:text-dark-primary"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-accentBg"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 rounded-md bg-accentBg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Panel */}
      <div
        className={`fixed inset-0 bg-cardBg p-6 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="text-3xl text-primary mb-6 block ml-auto"
        >
          &times;
        </button>

        <nav className="flex flex-col gap-4 text-lg">
          <button
            onClick={() =>
              setTripType((p) => (p === "ride" ? "fleet" : "ride"))
            }
            className="self-start px-4 py-2 rounded-full border text-primary text-sm"
          >
            {tripType === "ride" ? "Ride Requests" : "Fleet Requests"}
          </button>

          <Link className="hover:text-primary dark:hover:text-dark-primary" href={tripLink}>Assigned Trips</Link>
          <Link className="hover:text-primary dark:hover:text-dark-primary" href="/driver/deliveries">Assigned Deliveries</Link>
          <Link className="hover:text-primary dark:hover:text-dark-primary" href="/support">Support</Link>
          <Link className="hover:text-primary dark:hover:text-dark-primary" href="/driver/profile">Profile</Link>

          <button
            onClick={handleLogout}
            className="text-left text-red-600 mt-4"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
