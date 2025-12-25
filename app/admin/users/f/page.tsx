"use client";
import React, { useState } from "react";

const usersData = [
  {
    id: 1,
    name: "Musa Ibrahim",
    email: "musa@example.com",
    phone: "08012345678",
    city: "Abuja",
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Bello",
    email: "sarah@example.com",
    phone: "08098765432",
    city: "Lagos",
    status: "banned",
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = usersData.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      <div className="flex items-center gap-4 mb-6">
        <input
          className="px-4 py-2 w-80 bg-[var(--color-formBg)] border border-[var(--color-muted)]/40 rounded-xl"
          placeholder="Search by name, email or phone"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select className="px-4 py-2 bg-[var(--color-formBg)] border border-[var(--color-muted)]/40 rounded-xl">
          <option>Status</option>
          <option>Active</option>
          <option>Banned</option>
        </select>

        <select className="px-4 py-2 bg-[var(--color-formBg)] border border-[var(--color-muted)]/40 rounded-xl">
          <option>City</option>
          <option>Abuja</option>
          <option>Lagos</option>
          <option>Kano</option>
        </select>
      </div>

      <div className="bg-[var(--color-cardBg)] shadow rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-accentBg)] text-[var(--color-text)]">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">City</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map(user => (
              <tr
                key={user.id}
                className="border-b border-[var(--color-muted)]/20 hover:bg-[var(--color-accentBg)] transition"
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.phone}</td>
                <td className="p-4">{user.city}</td>

                <td className="p-4">
                  {user.status === "active" ? (
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-red-200 text-red-800 rounded-full text-xs">
                      Banned
                    </span>
                  )}
                </td>

                <td className="p-4 flex gap-3">
                  <a
                    href={`/admin/users/${user.id}`}
                    className="text-[var(--color-link)] font-medium"
                  >
                    View
                  </a>

                  <button className="text-blue-500">Edit</button>

                  {user.status === "active" ? (
                    <button className="text-red-600">Ban</button>
                  ) : (
                    <button className="text-green-600">Unban</button>
                  )}

                  <button className="text-yellow-600">Reset Password</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="p-6 text-center text-[var(--color-muted)]">No users found</p>
        )}
      </div>
    </div>
  );
}
