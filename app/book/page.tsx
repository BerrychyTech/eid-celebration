// File: src/pages/Book.tsx
"use client";

import * as React from "react";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookTitleSection from "@/components/booking_page/BookTitleSection";
import RegularTripForm from "@/components/booking_page/RegularTripForm";
import EventFleetForm from "@/components/booking_page/EventFleetForm";
import { FaCar, FaUsers } from "react-icons/fa"; // ✅ Import icons

export default function BookPage() {
  const [activeTab, setActiveTab] = React.useState<"regular" | "fleet">("regular");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background dark:bg-dark-background text-text dark:text-dark-text pb-20 font-poppins">
        <BookTitleSection />

        {/* Toggle Tabs */}
        <div className="flex justify-center mt-6">
          <div className="inline-flex p-1 rounded-full bg-accentBg dark:bg-dark-accentBg">
            <button
              onClick={() => setActiveTab("regular")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition flex items-center gap-2  ${
                activeTab === "regular"
                  ? "bg-primary dark:bg-dark-primary text-white shadow"
                  : "text-muted dark:text-dark-muted"
              }`}
            >
              <FaCar className="text-base" />
                Regular Trip  
            </button>
            <button
              onClick={() => setActiveTab("fleet")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition flex items-center gap-2  ${
                activeTab === "fleet"
                  ? "bg-primary dark:bg-dark-primary text-white shadow"
                  : "text-muted dark:text-dark-muted"
              }`}
            >
              <FaUsers className="text-base" />
              Event Fleet
            </button>
          </div>
        </div>

        {/* Conditional Render */}
        <div className="max-w-5xl mx-auto mt-10 px-4">
          {activeTab === "regular" ? <RegularTripForm /> : <EventFleetForm />}
        </div>
      </main>
      <Footer />
    </>
  );
}
