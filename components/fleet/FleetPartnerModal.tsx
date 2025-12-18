"use client";

import { FleetPartner, FleetVehicle } from "@/types/fleet";
import { useState } from "react";
import VehicleAssignModal from "./VehicleAssignModal";
import WeeklyPaymentModal from "./WeeklyPaymentModal";

export default function FleetPartnerModal({
  partner,
  onClose,
}: {
  partner: FleetPartner;
  onClose: () => void;
}) {
  const [assignVehicle, setAssignVehicle] = useState(false);
  const [setPayment, setSetPayment] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-[900]">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl border border-primary">
        <h2 className="text-xl font-semibold">Fleet Partner</h2>
        <p className="text-sm text-gray-500 mb-3">ID: {partner.id}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <p><strong>Name:</strong> {partner.partnerName}</p>
          <p><strong>Company:</strong> {partner.companyName}</p>
          <p><strong>Phone:</strong> {partner.phone}</p>
          <p><strong>Email:</strong> {partner.email}</p>
          <p><strong>Status:</strong> {partner.status}</p>
          <p>
            <strong>Weekly Payment:</strong>{" "}
            {partner.weeklyPaymentValue
              ? `₦${partner.weeklyPaymentValue.toLocaleString()}`
              : "Not Set"}
          </p>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Vehicles</h3>

        {partner.vehicles.length === 0 && (
          <p className="text-gray-500 text-sm mb-2">No vehicles added yet</p>
        )}

        {partner.vehicles.length > 0 && (
          <table className="w-full text-sm mb-3">
            <thead>
              <tr className="text-left border-b border-primary/40">
                <th className="py-2">Model</th>
                <th>Plate No</th>
                <th>Status</th>
                <th>Driver</th>
              </tr>
            </thead>

            <tbody>
              {partner.vehicles.map((v) => (
                <tr key={v.id} className="border-b last:border-none">
                  <td className="py-2">{v.model}</td>
                  <td>{v.plateNumber}</td>
                  <td>{v.status}</td>
                  <td>{v.assignedDriver || "None"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setAssignVehicle(true)}
            className="px-4 py-2 bg-primary text-white rounded-xl"
          >
            Assign Vehicle
          </button>

          <button
            onClick={() => setSetPayment(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-xl"
          >
            Set Weekly Payment
          </button>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-xl"
          >
            Close
          </button>
        </div>

        {assignVehicle && (
          <VehicleAssignModal
            partner={partner}
            onClose={() => setAssignVehicle(false)}
          />
        )}

        {setPayment && (
          <WeeklyPaymentModal
            partner={partner}
            onClose={() => setSetPayment(false)}
          />
        )}
      </div>
    </div>
  );
}
