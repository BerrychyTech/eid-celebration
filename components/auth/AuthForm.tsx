// File: src/components/auth/AuthForm.tsx
"use client";

import * as React from "react";
import Link from "next/link";

export interface AuthFormData {
  fullName?: string;
  email: string;
  password: string;
  phone?: string;
}

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: AuthFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export default function AuthForm({ mode, onSubmit, isLoading = false, error }: AuthFormProps) {
  const [form, setForm] = React.useState<AuthFormData>({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = React.useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      let digits = value.replace(/\D/g, "").slice(0, 11);
      let formatted = digits;

      if (digits.length > 4 && digits.length <= 7) {
        formatted = `${digits.slice(0, 4)} ${digits.slice(4)}`;
      } else if (digits.length > 7) {
        formatted = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
      }

      setForm((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = { fullName: "", email: "", password: "", phone: "" };
    const rawPhone = (form.phone || "").replace(/\s/g, "");
    let valid = true;

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email.";
      valid = false;
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    if (mode === "register") {
      if (!form.fullName || form.fullName.trim().length < 2) {
        newErrors.fullName = "Full name is required.";
        valid = false;
      }

      if (!/^0\d{10}$/.test(rawPhone)) {
        newErrors.phone = "Phone must start with 0 and be 11 digits (e.g. 0801 234 5678)";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const cleaned = {
      ...form,
      phone: form.phone?.replace(/\s/g, "") || "",
    };

    await onSubmit(cleaned);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-dark-card p-6 rounded-lg shadow space-y-5 max-w-md mx-auto my-20"
      noValidate
    >
      <h2 className="text-xl font-bold text-center mb-4">
        {mode === "login" ? "🔐 Login to BerryGo" : "🆕 Create Your Account"}
      </h2>

      {error && <p className="text-center text-red-600 font-medium text-sm">{error}</p>}

      {mode === "register" && (
        <>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary"
            />
            {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onKeyDown={(e) => {
                const allowed = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"];
                if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) e.preventDefault();
              }}
              inputMode="numeric"
              pattern="\d*"
              className="w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary"
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
          </div>
        </>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 pr-10 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-2 text-sm text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
      </div>

      {mode === "login" && (
        <div className="text-right text-sm">
          <Link href="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 rounded-md font-semibold transition ${
          isLoading
            ? "bg-primary/50 cursor-not-allowed"
            : "bg-primary hover:bg-red-500 text-white"
        }`}
      >
        {isLoading ? "Loading..." : mode === "login" ? "Login" : "Register"}
      </button>

      <div className="text-center text-sm mt-4">
        {mode === "login" ? (
          <>
            Don’t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </>
        )}
      </div>
    </form>
  );
}
