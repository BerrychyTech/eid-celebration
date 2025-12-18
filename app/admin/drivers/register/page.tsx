// app/admin/drivers/register/page.tsx
"use client";
import React, { useState } from "react";

export default function DriverRegisterPage() {
  const [form, setForm] = useState({ fullName: "", phone: "", city: "", email: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Driver registered (mock): ${form.fullName}`);
    setForm({ fullName: "", phone: "", city: "", email: "" });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Register Driver (Manual)</h1>
      <form onSubmit={submit} className="max-w-lg space-y-3">
        <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full name" className="w-full p-3 rounded border bg-[var(--color-formBg)]" />
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full p-3 rounded border bg-[var(--color-formBg)]" />
        <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="w-full p-3 rounded border bg-[var(--color-formBg)]" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email (optional)" className="w-full p-3 rounded border bg-[var(--color-formBg)]" />
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 rounded bg-[var(--color-primary)] text-white">Register</button>
          <button type="button" className="px-4 py-2 rounded border" onClick={() => setForm({ fullName: "", phone: "", city: "", email: "" })}>Reset</button>
        </div>
      </form>
    </div>
  );
}
