// src/components/auth/AuthForm.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, loginSchema, registerSchema } from "./validation";
import TextInput from "./fields/TextInput";
import PasswordInput from "./fields/PasswordInput";
import { formatPhoneForDisplay, cleanPhone } from "@/utils/formatPhone";
import { Lock, UserPlus } from "lucide-react";

export interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: AuthFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export default function AuthForm({ mode, onSubmit, isLoading = false, error }: AuthFormProps) {
  const schema = mode === "login" ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", email: "", password: "", phone: "" },
  });

  // format phone on blur for nicer UX
  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const cleaned = (e.target.value || "").replace(/\D/g, "");
    const formatted = formatPhoneForDisplay(cleaned);
    setValue("phone", formatted, { shouldValidate: true, shouldDirty: true });
  };

  const submit = handleSubmit(async (values) => {
    // clean phone before sending
    const payload = {
      ...values,
      phone: values.phone ? cleanPhone(values.phone) : "",
    };
    await onSubmit(payload);
  });

  return (
    <form onSubmit={submit} className="bg-white dark:bg-dark-card p-6 rounded-lg shadow space-y-5 max-w-md mx-auto my-20" noValidate>
      <h2 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2">
      {mode === "login" ? (
        <>
          <Lock className="w-5 h-5" /> Login to BerryGo
        </>
      ) : (
        <>
          <UserPlus className="w-5 h-5" /> Create Your Account
        </>
      )}
    </h2>


      {error && <p className="text-center text-red-600 font-medium text-sm">{error}</p>}

      {/* Using fieldset to disable everything when loading */}
      <fieldset disabled={isLoading} className="space-y-4">
        {mode === "register" && (
          <>
            <TextInput
              id="fullName"
              label="Full Name"
              placeholder="John Doe"
              {...register("fullName")}
              error={errors.fullName?.message}
            />

            <TextInput
              id="phone"
              label="Phone Number"
              placeholder="0801 234 5678"
              inputMode="numeric"
              {...register("phone")}
              onBlur={handlePhoneBlur}
              error={errors.phone?.message}
            />
          </>
        )}

        <TextInput
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="••••••••"
          {...register("password")}
          error={errors.password?.message}
        />

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
          className={`w-full py-2 rounded-md font-semibold flex items-center justify-center transition ${
            isLoading ? "bg-primary/50 cursor-not-allowed" : "bg-primary hover:bg-red-500 text-white"
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.2" />
                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              Loading...
            </>
          ) : mode === "login" ? (
            "Login"
          ) : (
            "Register"
          )}
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
      </fieldset>
    </form>
  );
}
