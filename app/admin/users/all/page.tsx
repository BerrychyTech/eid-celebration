"use client";

import { useState, useEffect } from "react";
import CreateNewUserModal from "@/components/admin/users/CreateNewUserModal";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

export interface NormalUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  status: "active" | "suspended";
  verified: boolean;
  createdAt: string;
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<NormalUser[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useAuthStore.getState().token;

  // Fetch users from API on mount
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        console.log("🔑 Token being used:", token ? "Present" : "Missing");
        
        if (!token) {
          toast.error("Please login first");
          return;
        }

        const res = await api.get("/user/users", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ ADD THIS HEADER
          },
        });
        
        console.log("📦 Users API response:", res.data);
        
        // Handle different response structures
// Handle different response structures
if (res.data.users) {  // Your API returns {success: true, users: [...], count: 6}
  setUsers(res.data.users);
} else if (res.data.data) {
  setUsers(res.data.data);
} else if (Array.isArray(res.data)) {
  setUsers(res.data);
} else {
  console.error("Unexpected response format:", res.data);
  setUsers([]);
}
      } catch (err: any) {
        console.error("❌ Fetch users error:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error(err?.response?.data?.error || "Failed to fetch users");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [token]); // ✅ Added token to dependency array

  async function handleCreateUser(user: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    gender?: string;
    state?: string;
    lga?: string;
    nin?: string;
  }) {
    try {
      console.log("📝 Creating user with data:", user);
      
      // Add role for registration
      const userData = {
        ...user,
        role: "user" // Regular users have "user" role
      };

      const res = await api.post("/auth/register", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("✅ User created response:", res.data);
      
      // Create new user object matching NormalUser interface
      const newUser: NormalUser = {
        id: res.data.data?.id || res.data.id,
        fullName: res.data.data?.fullName || res.data.fullName || user.fullName,
        email: res.data.data?.email || res.data.email || user.email,
        phone: res.data.data?.phone || res.data.phone || user.phone,
        status: "active", // Default
        verified: false, // Default
        createdAt: new Date().toISOString(),
      };
      
      setUsers((prev) => [...prev, newUser]);
      toast.success("User created successfully");
      setModalOpen(false);
    } catch (err: any) {
      console.error("❌ Create user error:", err);
      console.error("Error response:", err.response?.data);
      toast.error(err?.response?.data?.error || "Failed to create user");
    }
  }

  async function toggleSuspend(userId: string) {
    try {
      const user = users.find((u) => u.id === userId);
      if (!user) return;

      const newStatus = user.status === "active" ? "suspended" : "active";
      
      console.log(`🔄 Toggling user ${userId} status to ${newStatus}`);
      
      // Try different endpoints
      try {
        // Try the status endpoint first
        await api.patch(
          `/admin/suspend/${userId}`, 
          { status: newStatus },
          {
            headers: { 
              Authorization: `Bearer ${token}`
            }
          }
        );
      } catch (firstErr: any) {
        console.log("First endpoint failed, trying alternative...");
        
        // Try alternative endpoint
        if (newStatus === "suspended") {
          await api.patch(
            `/users/suspend/${userId}`, 
            {},
            {
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
        } else {
          await api.patch(
            `/users/restore/${userId}`, 
            {},
            {
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
        }
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, status: newStatus } : u
        )
      );
      toast.success(`User ${newStatus}`);
    } catch (err: any) {
      console.error("❌ Toggle suspend error:", err);
      console.error("Error response:", err.response?.data);
      toast.error(err?.response?.data?.error || "Failed to update status");
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">User Management</h1>

      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm hover:opacity-90"
      >
        Create New User
      </button>

      <CreateNewUserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateUser}
      />

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
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-neutral-500">
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-neutral-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-t border-[#FFEDE9] hover:bg-[#FFF9F7]">
                  <td className="p-4">{u.fullName}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">{u.phone || "-"}</td>
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
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        u.verified
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {u.verified ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-4">
                    {new Date(u.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="p-4 text-right flex gap-2 justify-end">
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

                    <Link href={`/admin/users/all/${u.id}`}>
  <button className="px-3 py-1 rounded-lg text-white text-xs bg-red-500 hover:bg-red-600 mx-4">
    View
  </button>
</Link>
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