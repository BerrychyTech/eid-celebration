"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (user: {
    name: string;
    email: string;
    phone: string;
  }) => void;
};

export default function CreateNewUserModal({
  open,
  onClose,
  onCreate,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit() {
    if (!name || !email) return;

    onCreate({
      name,
      email,
      phone,
    });

    // reset form
    setName("");
    setEmail("");
    setPhone("");
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[420px] p-6 space-y-4 shadow-lg">
        <h2 className="text-lg font-semibold text-[#FD5C63]">
          Create New User
        </h2>

        {/* NAME */}
        <div>
          <label className="text-sm text-neutral-600">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="mt-1 w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-neutral-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="mt-1 w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-sm text-neutral-600">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="080xxxxxxxx"
            className="mt-1 w-full px-4 py-2 rounded-xl border border-[#FFEDE9] text-sm"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!name || !email}
            className="px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm disabled:opacity-50"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}
