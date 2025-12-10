import React from "react";

export default function UserDashboard() {
  return (
    <div className="min-h-screen px-6 py-10 bg-[var(--color-background)] text-[var(--color-text)] font-poppins">
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-[var(--color-muted)] mt-1">
          View and manage passengers, drivers, vendors, and fleet partners.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        
        <div className="p-6 rounded-2xl shadow bg-[var(--color-cardBg)]">
          <p className="text-sm text-[var(--color-muted)]">Passengers</p>
          <h2 className="text-2xl font-bold mt-2">4,120</h2>
        </div>

        <div className="p-6 rounded-2xl shadow bg-[var(--color-cardBg)]">
          <p className="text-sm text-[var(--color-muted)]">Drivers</p>
          <h2 className="text-2xl font-bold mt-2">1,093</h2>
        </div>

        <div className="p-6 rounded-2xl shadow bg-[var(--color-cardBg)]">
          <p className="text-sm text-[var(--color-muted)]">Vendors</p>
          <h2 className="text-2xl font-bold mt-2">298</h2>
        </div>

        <div className="p-6 rounded-2xl shadow bg-[var(--color-cardBg)]">
          <p className="text-sm text-[var(--color-muted)]">Fleet Partners</p>
          <h2 className="text-2xl font-bold mt-2">52</h2>
        </div>

      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center justify-between mb-5">
        <input
          placeholder="Search users by name, email or phone..."
          className="w-full max-w-lg px-4 py-3 border rounded-xl bg-[var(--color-formBg)] text-[var(--color-inputText)]"
        />

        <button className="ml-4 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold shadow">
          Filter
        </button>
      </div>

      {/* USER TABLE */}
      <div className="rounded-2xl overflow-hidden shadow bg-[var(--color-accentBg)]">
        <table className="w-full">
          <thead className="bg-[var(--color-cardBg)]">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {[
              { name: "John Doe", email: "john@mail.com", type: "Passenger", status: "Active" },
              { name: "Musa Bello", email: "musa@mail.com", type: "Driver", status: "Suspended" },
              { name: "Ada Vendors", email: "ada@store.com", type: "Vendor", status: "Active" },
            ].map((u, i) => (
              <tr key={i} className="border-b">
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">{u.type}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      u.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-[var(--color-link)] font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
