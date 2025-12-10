"use client";

import React from "react";
import { useRegularTripForm } from "./useRegularTripForm";
import TripFormFields from "./TripFormFields";
import ConfirmBookingModal from "./ConfirmBookingModal";

export default function RegularTripForm() {
  const {
    form,
    loading,
    total,
    luggageFee,
    dropdownClass,
    fromOptions,
    toOptions,
    showModal,
    handleChange,
    handlePreSubmit,
    handleConfirmSubmit,
    closeModal,
  } = useRegularTripForm();

  return (
    <>
      {/* Trip Booking Form */}
      <form
        className="bg-cardBg dark:bg-dark-cardBg text-text dark:text-dark-text p-6 rounded-lg shadow space-y-6 font-poppins"
      >
        {/* Form fields extracted to a separate component for cleanliness */}
        <TripFormFields
          form={form}
          handleChange={handleChange}
          dropdownClass={dropdownClass}
          fromOptions={fromOptions}
          toOptions={toOptions}
        />

        {/* Total price display */}
        <div className="text-right text-sm font-medium">
          Total:{" "}
          <span className="text-primary dark:text-dark-primary">
            ₦{total.toLocaleString()}
          </span>
        </div>

        {/* Search / Book button */}
        <button
          type="button"
          onClick={handlePreSubmit}
          className="bg-primary dark:bg-dark-primary hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Booking..." : "🔍 Search Rides"}
        </button>
      </form>

      {/* Confirm Booking Modal */}
      {showModal && (
        <ConfirmBookingModal
          form={form}
          total={total}
          luggageFee={luggageFee}
          loading={loading}
          onCancel={closeModal}
          onConfirm={handleConfirmSubmit}
        />
      )}
    </>
  );
}
