"use client";

import Image from "next/image";
import {
  Gift,
  Users,
  Moon,
  Bell,
  Headphones,
  LogOut,
} from "lucide-react";
import ProfileRow from "@/components/profile/ProfileRow";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {

  // TEMP MOCK USER — replace with real backend user later
  const user = {
    name: "Aliyu Madachi",
    phone: "+234 704 698 8904",
    email: "Aliyu@example.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    referralCode: "BERRY123",
  };

  return (
    <>
        <Header />
        <div className="min-h-screen bg-pageBg dark:bg-dark-pageBg px-4 py-6 font-poppins">
          <div className="max-w-lg mx-auto space-y-6">

              {/* ⭐ USER CARD */}
              <div className="bg-cardBg dark:bg-dark-cardBg p-6 rounded-3xl shadow text-center">
                  <div className="flex justify-center">
                      <Image
                          src={user.avatar}
                          alt="User Avatar"
                          width={100}
                          height={100}
                          className="rounded-full" />
                  </div>

                  <h2 className="text-xl font-semibold text-text dark:text-dark-text mt-3">
                      {user.name}
                  </h2>

                  <p className="text-muted dark:text-dark-muted text-sm mt-1">
                      {user.email}
                  </p>

                  <p className="text-muted dark:text-dark-muted text-sm">
                      {user.phone}
                  </p>
              </div>

              {/* ⭐ ROWS */}
              <div className="space-y-3">

                  <ProfileRow
                      icon={<Gift className="text-primary dark:text-dark-primary" size={22} />}
                      label="Referral Code"
                      value={user.referralCode} />

                  <ProfileRow
                      icon={<Users className="text-primary dark:text-dark-primary" size={22} />}
                      label="Invite Friends" />

                  <ProfileRow
                      icon={<Bell className="text-primary dark:text-dark-primary" size={22} />}
                      label="Notification Settings" />

                  <ProfileRow
                      icon={<Headphones className="text-primary dark:text-dark-primary" size={22} />}
                      label="Help / Contact" />
              </div>

              {/* 🔴 Logout */}
              <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition">
                  <LogOut size={22} />
                  Logout
              </button>
          </div>
        </div>
        <Footer/>
    </>
  );
}
