"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Gift,
  Users,
  Moon,
  Bell,
  Headphones,
  LogOut,
  Lock,
} from "lucide-react";
import ProfileRow from "@/components/profile/ProfileRow";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";

export default function ProfilePage() {
  const { user, logout, hasHydrated } = useAuthStore();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    setTimeout(() => {
      logout();
    }, 1000);
  };

  // ⛔ Avoid hydration mismatch
  if (!hasHydrated) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-pageBg dark:bg-dark-pageBg px-4 py-6 font-poppins">
        <div className="max-w-lg mx-auto space-y-6">

          {/* ⭐ USER CARD */}
          <div className="bg-cardBg dark:bg-dark-cardBg p-6 rounded-3xl shadow text-center">
            <div className="flex justify-center">
              <Image
                src="https://i.pravatar.cc/150?img=12" // ✅ untouched avatar
                alt="User Avatar"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>

            <h2 className="text-xl font-semibold text-text dark:text-dark-text mt-3">
              {user?.fullName || "—"}
            </h2>

            <p className="text-muted dark:text-dark-muted text-sm mt-1">
              {user?.email || "—"}
            </p>

            <p className="text-muted dark:text-dark-muted text-sm">
              {user?.phoneNumber || "—"}
            </p>
          </div>

          {/* ⭐ ROWS */}
          <div className="space-y-3">
            <Link href="/profile/pin" className="block">
              <ProfileRow
                icon={<Lock className="text-primary dark:text-dark-primary" size={22} />}
                label="PIN"
              />
            </Link>

            <Link href="/profile/referral" className="block">
              <ProfileRow
                icon={<Gift className="text-primary dark:text-dark-primary" size={22} />}
                label="Referral Code"
                value={user?.referralCode}
              />
            </Link>

            <Link href="/profile/invite-friends" className="block">
              <ProfileRow
                icon={<Users className="text-primary dark:text-dark-primary" size={22} />}
                label="Invite Friends"
              />
            </Link>

            <Link href="/profile/notifications" className="block">
              <ProfileRow
                icon={<Bell className="text-primary dark:text-dark-primary" size={22} />}
                label="Notification Settings"
              />
            </Link>

            <Link href="/profile/support" className="block">
              <ProfileRow
                icon={<Headphones className="text-primary dark:text-dark-primary" size={22} />}
                label="Help / Support"
              />
            </Link>
          </div>

          {/* 🔴 Logout */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition disabled:opacity-60"
          >
            <LogOut size={22} />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
