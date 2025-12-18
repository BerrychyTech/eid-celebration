"use client";

import { FleetPartner } from "@/types/fleet";

export default function FleetPartnersTable({
  partners,
  onSelect,
}: {
  partners: FleetPartner[];
  onSelect: (p: FleetPartner) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-primary">
      <h2 className="text-lg font-semibold mb-3">Fleet Partners</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-primary/40">
            <th className="py-2">Partner</th>
            <th>Company</th>
            <th>Status</th>
            <th>Vehicles</th>
            <th>Weekly Payment</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {partners.map((p) => (
            <tr key={p.id} className="border-b last:border-none">
              <td className="py-2">{p.partnerName}</td>
              <td>{p.companyName}</td>
              <td>
                <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary text-xs">
                  {p.status}
                </span>
              </td>
              <td>{p.vehicles.length}</td>
              <td>
                {p.weeklyPaymentValue
                  ? `₦${p.weeklyPaymentValue.toLocaleString()}`
                  : "Not Set"}
              </td>
              <td>
                <button
                  onClick={() => onSelect(p)}
                  className="text-primary underline text-sm"
                >
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
