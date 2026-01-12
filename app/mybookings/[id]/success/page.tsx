"use client";

import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function SupportSuccessPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-cardBg dark:bg-dark-cardBg rounded-xl shadow p-6 text-center space-y-4">
        <FaCheckCircle className="text-primary text-4xl mx-auto" />

        <h1 className="text-xl font-semibold text-text dark:text-dark-text">
          Support Request Submitted
        </h1>

        <p className="text-sm text-muted dark:text-dark-muted">
          We’ve received your request and our team is reviewing it.
          You’ll be contacted if we need more information.
        </p>

        <Link
          href="/dashboard"
          className="inline-block mt-4 px-6 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
