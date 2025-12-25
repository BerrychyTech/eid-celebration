"use client";

import { useState } from "react";
import { mockAdmins, AdminUser } from "@/mock/admins";
import CreateNewUserModal from "@/components/admin/users/CreateNewAdminModal";

export default function AdminsManagementPage() {
  const [admins, setAdmins] = useState<AdminUser[]>(mockAdmins);
  const [modalOpen, setModalOpen] = useState(false);

  function promoteToSuper(userId: string) {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === userId ? { ...a, role: "super_admin" } : a
      )
    );
  }

  function toggleSuspend(userId: string) {
    setAdmins((prev) =>
      prev.map((a) =>
        a.id === userId
          ? { ...a, status: a.status === "active" ? "suspended" : "active" }
          : a
      )
    );
  }

  function handleCreateAdmin(user: {
    name: string;
    email: string;
    phone?: string;
    role: "admin" | "super_admin";
  }) {
    const newAdmin: AdminUser = {
      id: `${Date.now()}`,
      name: user.name,
      email: user.email,
      role: user.role,
      status: "active",
      createdAt: new Date().toLocaleDateString(),
    };
    setAdmins((prev) => [...prev, newAdmin]);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Admin Management</h1>

      {/* Create New Admin Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 px-4 py-2 bg-[#FD5C63] text-white rounded-xl"
      >
        Create New Admin
      </button>

      {/* Create Admin Modal */}
      <CreateNewUserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateAdmin}
      />

      <div className="bg-white rounded-2xl border border-[#FFEDE9] shadow overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-[#FFF0ED] text-neutral-700">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Created At</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr
                key={a.id}
                className="border-t border-[#FFEDE9] hover:bg-[#FFF9F7]"
              >
                <td className="p-4">{a.name}</td>
                <td className="p-4">{a.email}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      a.role === "super_admin"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {a.role}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      a.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="p-4">{a.createdAt}</td>
                <td className="p-4 text-right flex gap-2 justify-end">
                  {a.role !== "super_admin" && (
                    <button
                      onClick={() => promoteToSuper(a.id)}
                      className="px-3 py-1 rounded-lg bg-blue-500 text-white text-xs hover:bg-blue-600"
                    >
                      Promote
                    </button>
                  )}
                  <button
                    onClick={() => toggleSuspend(a.id)}
                    className={`px-3 py-1 rounded-lg text-white text-xs ${
                      a.status === "active"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {a.status === "active" ? "Suspend" : "Restore"}
                  </button>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-neutral-500">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
