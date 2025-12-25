"use client";

import { useState } from "react";
import { driverApplications } from "@/mock/driverApplications";

export default function DriverApplicationsPage() {
  const [applications, setApplications] = useState(driverApplications);

  function handleApprove(id: string) {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "approved" } : app
      )
    );
    alert(`Application ${id} approved (mock)`);
  }

  function handleReject(id: string) {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "rejected" } : app
      )
    );
    alert(`Application ${id} rejected (mock)`);
  }

  // only show pending applications
  const pendingApps = applications.filter(app => app.status === "pending");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">
        Driver Applications
      </h1>
      <p className="text-sm text-neutral-500">
        Review all pending driver applications before approval
      </p>

      <div className="bg-white border border-[#FFEDE9] rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF6F4] text-neutral-600">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">City</th>
              <th className="px-4 py-3 text-left">Submitted At</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {pendingApps.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-neutral-500">
                  No pending applications
                </td>
              </tr>
            ) : (
              pendingApps.map(app => (
                <tr key={app.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    {app.fullName}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{app.phone}</td>
                  <td className="px-4 py-3 text-neutral-600">{app.city}</td>
                  <td className="px-4 py-3 text-neutral-500">{app.submittedAt}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm hover:opacity-90"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:opacity-90"
                    >
                      Reject
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:opacity-90"
                    >
                      <a href={`/admin/drivers/applications/${app.id}`}>
                        view
                      </a>
                      
                    </button>                    
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* small UI helper */
function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : status === "approved"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${styles}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
