"use client";
import React from "react";

interface Props {
  form: any;
  total: number;
  luggageFee: number;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmBookingModal({
  form,
  total,
  luggageFee,
  loading,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999]">
      <div className="bg-cardBg dark:bg-dark-cardBg p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 font-poppins">
        <h2 className="text-lg font-semibold">🧾 Confirm Booking</h2>

        <ul className="text-sm space-y-1">
          <li><strong>From:</strong> {form.from}</li>
          <li><strong>To:</strong> {form.to}</li>
          <li><strong>Current State:</strong> {form.currentState}</li>
          <li><strong>Destination State:</strong> {form.destinationState}</li>
          <li><strong>Date:</strong> {form.date}</li>
          <li><strong>Seats:</strong> {form.seats}</li>
          <li><strong>Class:</strong> {form.travelClass}</li>
          <li><strong>Bags:</strong> {form.bagCount}</li>
          <li><strong>Bag Fee:</strong> ₦{luggageFee.toLocaleString()}</li>
          <li><strong>Pickup Location:</strong> {form.pickupLocation}</li>
          <li><strong>Pickup Time:</strong> {form.pickupTime}</li>
          <li><strong>Total:</strong> ₦{total.toLocaleString()}</li>
        </ul>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onCancel} className="px-4 py-2 rounded border text-sm">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary dark:bg-dark-primary text-white font-semibold px-4 py-2 rounded text-sm"
          >
            {loading ? "Submitting..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
