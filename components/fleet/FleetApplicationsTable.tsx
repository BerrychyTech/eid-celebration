"use client";

import { FleetApplication } from "@/types/fleet";

export default function FleetApplicationsTable({
  applications,
  onSelect,
}: {
  applications: FleetApplication[];
  onSelect: (app: FleetApplication) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-primary">
      <h2 className="text-lg font-semibold mb-3">Fleet Partnership Applications</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-primary/40">
            <th className="py-2">Partner</th>
            <th>Company</th>
            <th>Status</th>
            <th>Submitted</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border-b last:border-none">
              <td className="py-2">{app.partnerName}</td>
              <td>{app.companyName}</td>
              <td>
                <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary text-xs">
                  {app.status}
                </span>
              </td>
              <td>{app.submittedAt}</td>
              <td>
                <button
                  onClick={() => onSelect(app)}
                  className="text-primary underline text-sm"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
