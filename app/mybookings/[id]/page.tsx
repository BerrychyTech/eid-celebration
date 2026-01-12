"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { FaLifeRing } from "react-icons/fa";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface SupportPayload {
  type: "ride" | "delivery" | "fleet";
  issue: string;
  message: string;
  context: {
    bookingId?: string;
    from?: string;
    to?: string;
    date?: string;
  };
}

export default function BookingSupportPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  /* ✅ Detect support type safely */
  const supportType =
    (searchParams.get("type") as "ride" | "delivery" | "fleet") ?? "ride";

  /* ✅ Booking context (auto-attached invisibly) */
  const booking = {
    id: searchParams.get("bookingId"),
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    date: searchParams.get("date"),
  };


  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = issue && message.trim().length > 10;

  /* ✅ Issue options per support type */
  const issueOptions: Record<typeof supportType, { value: string; label: string }[]> =
  {
    ride: [
      { value: "driver_delay", label: "Driver delayed" },
      { value: "driver_absent", label: "Driver did not show" },
      { value: "payment", label: "Payment issue" },
      { value: "route", label: "Ride ended incorrectly" },
    ],
    delivery: [
      { value: "delivery_delay", label: "Delivery delayed" },
      { value: "item_missing", label: "Item missing" },
      { value: "wrong_item", label: "Wrong item delivered" },
    ],
    fleet: [
      { value: "request_pending", label: "Request pending" },
      { value: "vehicle_issue", label: "Vehicle issue" },
      { value: "pricing", label: "Pricing concern" },
    ],
  };

  /* ✅ Submit handler */
  const handleSubmit = async () => {
    if (!canSubmit) return;

    const payload: SupportPayload = {
      type: supportType,
      issue,
      message,
      context: {
        bookingId: booking.id ?? undefined,
        from: booking.from ?? undefined,
        to: booking.to ?? undefined,
        date: booking.date ?? undefined,
      },
    };

    try {
      setSubmitting(true);
      await api.post("/support", payload);
      router.push("/support/success");
    } catch {
      toast.error("Failed to submit support request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background px-4 py-10">
      <div className="max-w-3xl mx-auto bg-cardBg dark:bg-dark-cardBg rounded-xl shadow p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <FaLifeRing className="text-primary text-xl" />
          <h1 className="text-2xl font-semibold text-primary">
            {supportType === "ride" && "Ride Support"}
            {supportType === "delivery" && "Delivery Support"}
            {supportType === "fleet" && "Fleet Support"}
          </h1>
        </div>

        <p className="text-sm text-muted dark:text-dark-muted">
          We already have the details. Just explain the issue.
        </p>

        {/* Context Summary */}
        {booking.id && (
          <div className="bg-accentBg dark:bg-dark-accentBg rounded-lg p-4 text-sm space-y-1 border border-muted/20">
            <p><strong>Reference ID:</strong> {booking.id}</p>
            {booking.from && booking.to && (
              <p><strong>Route:</strong> {booking.from} → {booking.to}</p>
            )}
            {booking.date && <p><strong>Date:</strong> {booking.date}</p>}
          </div>
        )}

        {/* Issue Form */}
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            What went wrong?
          </label>

          <select
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full bg-formBg dark:bg-dark-formBg border rounded px-3 py-2"
          >
            <option value="">Select an issue</option>
            {issueOptions[supportType].map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
            <option value="other">Other</option>
          </select>

          {issue && (
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Briefly explain what happened..."
              className="w-full bg-formBg dark:bg-dark-formBg border rounded px-3 py-2 h-32"
            />
          )}

          <p className="text-xs text-muted dark:text-dark-muted">
            Most requests are reviewed within 24 hours.
          </p>

          <button
            disabled={!canSubmit || submitting}
            onClick={handleSubmit}
            className={`w-full py-3 rounded-lg font-medium transition
              ${
                canSubmit
                  ? "bg-primary text-white hover:opacity-90"
                  : "bg-muted/40 text-muted cursor-not-allowed"
              }
            `}
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
