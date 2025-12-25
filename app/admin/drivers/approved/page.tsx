import { approvedDrivers } from "@/mock/approvedDrivers";
import Link from "next/link";

export default function ApprovedDriversPage() {
  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#FD5C63]">
            Approved Drivers
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage all verified and onboarded drivers
          </p>
        </div>

        <Link
          href="/admin/drivers/register"
          className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm hover:opacity-90"
        >
          + Register Driver
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-[#FFEDE9] rounded-2xl shadow overflow-x-auto">

        <table className="w-full text-sm">
          <thead className="bg-[#FFF6F4] text-neutral-600">
            <tr>
              <th className="px-4 py-3 text-left">Driver</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Vehicle</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {approvedDrivers.map(d => (
              <tr key={d.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3 font-medium text-neutral-800">
                  {d.fullName}
                </td>

                <td className="px-4 py-3 text-neutral-600">
                  {d.phone}
                </td>

                <td className="px-4 py-3">
                  <StatusBadge status={d.status} />
                </td>

                <td className="px-4 py-3">
                  {d.vehicleAssigned ? (
                    <span className="text-green-600 font-medium">
                      Assigned
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium">
                      Not Assigned
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 text-neutral-500">
                  {d.joinedAt}
                </td>

                <td className="px-4 py-3 text-right space-x-2">
                  <ActionLink
                    href={`/admin/drivers/${d.id}`}
                    label="View"
                  />
                  <ActionLink
                    href={`/admin/drivers/assign/${d.id}`}
                    label="Assign Route"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}


function StatusBadge({ status }: { status: string }) {
  const styles =
    status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-200 text-gray-700";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}

function ActionLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="text-[#FD5C63] hover:underline font-medium"
    >
      {label}
    </Link>
  );
}
