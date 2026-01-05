"use client";

import { useState, useEffect } from "react";
import CreateNewUserModal from "@/components/admin/users/CreateNewAdminModal";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "super_admin";
  status: "active" | "suspended";
  createdAt: string;
}

export default function AdminsManagementPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const token = useAuthStore.getState().token;

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const res = await api.get("/admin/all-admins", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Admins API response:", res.data);
        setAdmins(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch admins");
      }
    }
    fetchAdmins();
  }, []);

  async function handleCreateAdmin(user: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    role: "admin" | "super_admin";
    gender?: string;
    state?: string;
    lga?: string;
    nin?: string;
  }) {
    try {
      const res = await api.post("/admin/create-admin", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins((prev) => [...prev, res.data.data]);
      toast.success("Admin created successfully");
      setModalOpen(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Failed to create admin");
    }
  }

  async function toggleSuspend(userId: string) {
    try {
      const admin = admins.find((a) => a.id === userId);
      if (!admin) return;

      // Don't allow suspending super_admins
      if (admin.role === "super_admin") {
        toast.error("Cannot suspend super admin users");
        return;
      }

      const isCurrentlyActive = admin.status === "active";
      
      if (isCurrentlyActive) {
        // ✅ CORRECT: Use suspend-admin endpoint for admin users
        await api.patch(
          `/admin/suspend-admin/${userId}`,
          {},  // Empty body - backend determines action based on current state
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Admin suspended");
      } else {
        // ✅ CORRECT: Use restore-admin endpoint for admin users
        await api.patch(
          `/admin/restore-admin/${userId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Admin restored");
      }

      // Update local state
      const newStatus = isCurrentlyActive ? "suspended" : "active";
      setAdmins((prev) =>
        prev.map((a) => (a.id === userId ? { ...a, status: newStatus } : a))
      );
    } catch (err: any) {
      console.error("Toggle suspend error:", err);
      toast.error(err?.response?.data?.error || "Failed to update status");
    }
  }

  async function promoteToSuper(userId: string) {
    try {
      // ✅ CORRECT: Use promote-super endpoint
      await api.patch(
        `/admin/promote-super/${userId}`,
        {},  // Empty body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAdmins((prev) =>
        prev.map((a) => (a.id === userId ? { ...a, role: "super_admin" } : a))
      );
      toast.success("Admin promoted to super admin");
    } catch (err: any) {
      console.error("Promote error:", err);
      toast.error(err?.response?.data?.error || "Failed to promote admin");
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Admin Management</h1>

      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 px-4 py-2 bg-[#FD5C63] text-white rounded-xl"
      >
        Create New Admin
      </button>

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
                <td className="p-4">{a.fullName}</td>
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
                      Promote to Super
                    </button>
                  )}
                  {/* Hide suspend button for super_admins */}
                  {a.role !== "super_admin" && (
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
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}