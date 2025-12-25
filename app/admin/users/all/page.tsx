"use client";

import { useState } from "react";
import { mockUsers, NormalUser } from "@/mock/users";
import CreateNewUserModal from "@/components/admin/users/CreateNewUserModal";
export default function UsersManagementPage() {
  const [users, setUsers] = useState<NormalUser[]>(mockUsers);
  const [modalOpen, setModalOpen] = useState(false);

  function toggleSuspend(userId: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "suspended" : "active" }
          : u
      )
    );
  }

  function handleCreateUser(user: {
    name: string;
    email: string;
    phone?: string;
  }) {
    const newUser: NormalUser = {
      id: `${Date.now()}`,
      name: user.name,
      email: user.email,
      phone: user.phone ?? "",
      status: "active",
      verified: false,
      createdAt: new Date().toLocaleDateString(),
    };

    setUsers((prev) => [...prev, newUser]);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">
        User Management
      </h1>

      {/* CREATE USER */}
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm hover:opacity-90"
      >
        Create New User
      </button>

      {/* CREATE USER MODAL */}
      <CreateNewUserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateUser}
      />

      {/* USERS TABLE */}
      <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-[#FFF0ED] text-neutral-700">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Verified</th>
              <th className="p-4 text-left">Created At</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t border-[#FFEDE9] hover:bg-[#FFF9F7]"
              >
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">{u.phone}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      u.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-4">
                  {u.verified ? "Yes" : "No"}
                </td>
                <td className="p-4">{u.createdAt}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleSuspend(u.id)}
                    className={`px-3 py-1 rounded-lg text-white text-xs ${
                      u.status === "active"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {u.status === "active" ? "Suspend" : "Restore"}
                  </button>
                    <button className="px-3 py-1 rounded-lg text-white text-xs bg-red-500 hover:bg-red-600 mx-4" >
                  <a
                    href={`/admin/users/all/${u.id}`}
                    className="text-[var(--color-primary)] font-medium"
                  >
                    View
                  </a>
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-neutral-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
