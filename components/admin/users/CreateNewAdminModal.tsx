"use client";

import { useState } from "react";

type Role = "super_admin" | "admin";
type Gender = "male" | "female" | "other";

type CreateUserModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (user: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    role: Role;
    gender?: Gender;
    state?: string;
    lga?: string;
    nin?: string;
  }) => void;
};

export default function CreateNewUserModal({
  open,
  onClose,
  onCreate,
}: CreateUserModalProps) {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role>("super_admin");
  const [gender, setGender] = useState<Gender | "">("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [nin, setNin] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  function handleSubmit() {
    if (!fullName || !email || !password) return;
    onCreate({
      fullName,
      email,
      password,
      phone: phone || undefined,
      role,
      gender: gender || undefined,
      state: state || undefined,
      lga: lga || undefined,
      nin: nin || undefined,
    });
    // reset fields
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRole("super_admin");
    setGender("");
    setState("");
    setLga("");
    setNin("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] max-h-[90vh] overflow-y-auto">
        <h3 className="font-semibold text-lg text-[#FD5C63] mb-4">
          Create New {role === "super_admin" ? "Admin" : "User"}
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
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
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          >
            <option value="">Select Gender (optional)</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>

          <input
            type="text"
            placeholder="State (optional)"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          />

          <input
            type="text"
            placeholder="LGA (optional)"
            value={lga}
            onChange={(e) => setLga(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          />

          <input
            type="text"
            placeholder="NIN (optional)"
            value={nin}
            onChange={(e) => setNin(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          />

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
            disabled={!fullName || !email}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
