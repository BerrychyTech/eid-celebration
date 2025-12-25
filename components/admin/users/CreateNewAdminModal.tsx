"use client";

import { useState } from "react";

type Role = "super_admin" | "admin";

type CreateUserModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (user: {
    name: string;
    email: string;
    phone?: string;
    role: Role;
  }) => void;
};

export default function CreateNewUserModal({
  open,
  onClose,
  onCreate,
}: CreateUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role>("super_admin");

  if (!open) return null;

  function handleSubmit() {
    if (!name || !email) return;
    onCreate({ name, email, phone: phone || undefined, role });
    setName("");
    setEmail("");
    setPhone("");
    setRole("super_admin");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px]">
        <h3 className="font-semibold text-lg text-[#FD5C63] mb-4">
          Create New {role === "super_admin" ? "User" : "Admin"}
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          />

          <input
            type="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          >
            <option value="user">Normal User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm"
            disabled={!name || !email}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
