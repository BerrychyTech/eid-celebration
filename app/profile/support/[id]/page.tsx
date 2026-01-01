"use client";

import { FaLifeRing } from "react-icons/fa";
import Header from "@/components/Navbar";
type SupportPageProps = {
  params: { bookingId: string };
  searchParams: {
    from?: string;
    to?: string;
    date?: string;
  };
};

export default function SupportPage({
  params,
  searchParams,
}: SupportPageProps) {
  const { bookingId } = params;
  const { from, to, date } = searchParams;

  return (
    <>
    <Header/>
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold flex items-center gap-2 mb-2">
        <FaLifeRing className="text-primary" />
        Get Help with This Booking
      </h1>

      <p className="text-sm text-muted mb-6">
        Booking ID: <span className="font-medium">{bookingId}</span>
      </p>

      {/* Contextual Summary */}
      <div className="rounded-md bg-card dark:bg-dark-card p-4 mb-6">
        <p className="font-medium mb-1">Trip Details</p>
        <p className="text-sm text-muted">
          {from} → {to}
        </p>
        <p className="text-sm text-muted">{date}</p>
      </div>

      {/* Contextual Entry Point */}
      <p className="mb-4 font-medium">
        What seems to be the issue?
      </p>

      <ul className="space-y-3">
        <li className="hover:underline text-primary cursor-pointer">
          My driver is late or missing
        </li>
        <li className="hover:underline text-primary cursor-pointer">
          I need to change or cancel this booking
        </li>
        <li className="hover:underline text-primary cursor-pointer">
          I was charged incorrectly
        </li>
        <li className="hover:underline text-primary cursor-pointer">
          Something else
        </li>
      </ul>
    </div>
    </>
  );
}
