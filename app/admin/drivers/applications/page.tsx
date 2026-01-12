"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DriverApplicationsPage() {
const [applications, setApplications] = useState<any[]>([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
  async function fetchApplications() {
    try {
      const res = await api.get(
        "/admin/drivers/applications"
      );
        console.log("RESPONSE BODY:", res.data);
      // backend response shape:
      // { success, count, data }

      setApplications(res.data.data);
    } catch (err) {
      console.error("Failed to load applications", err);
    } finally {
      setLoading(false);
    }
  }

  fetchApplications();
}, []);


async function handleApprove(applicationId: string) {
  await api.post(`/admin/drivers/applications/${applicationId}/approve`);

setApplications(prev =>
  prev.filter(app => app.applicationId !== applicationId)
);
}


async function handleReject(applicationId: string) {
  await api.post(`/admin/drivers/applications/${applicationId}/reject`);

  setApplications(prev =>
    prev.filter(app => app.applicationId !== applicationId)
  );
}


  // only show pending applications
  const pendingApps = applications.filter(app => app.status === "new");

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
                <tr key={app.applicationId}>
                  <td className="px-4 py-3 font-medium text-neutral-800">
                    {app.fullname}
                  </td>

                  <td className="px-4 py-3 text-neutral-600">
                    {app.phone}
                  </td>

                  <td className="px-4 py-3 text-neutral-600">
                    {app.city}
                  </td>

                  <td className="px-4 py-3 text-neutral-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleApprove(app.applicationId)}
                      className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm hover:opacity-90"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(app.applicationId)}
                      className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:opacity-90"
                    >
                      Reject
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:opacity-90"
                    >
                      <a href={`/admin/drivers/applications/${app.applicationId}`}>
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
