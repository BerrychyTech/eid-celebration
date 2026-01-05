// src/components/auth/AuthForm.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, LoginFormData, loginSchema, registerSchema } from "./validation";
import TextInput from "./fields/TextInput";
import PasswordInput from "./fields/PasswordInput";
import { formatPhoneForDisplay, cleanPhone } from "@/utils/formatPhone";
import { Lock, UserPlus } from "lucide-react";

type AuthFormData = LoginFormData | RegisterFormData;


export interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: LoginFormData | RegisterFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}


export default function AuthForm({ mode, onSubmit, isLoading = false, error }: AuthFormProps) {
 const schema = mode === "login" ? loginSchema : registerSchema;

const form = useForm<AuthFormData>({
  resolver: zodResolver(schema),
  defaultValues:
    mode === "login"
      ? {
          email: "",
          password: "",
        }
      : {
          fullName: "",
          gender: "",
          state: "",
          lga: "",
          nin: "",
          phone: "",
          email: "",
          password: "",
        },
});

const {
  register,
  handleSubmit,
  setValue,
  formState: { errors, isSubmitting },
} = form;


  // format phone on blur for nicer UX
  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const cleaned = (e.target.value || "").replace(/\D/g, "");
    const formatted = formatPhoneForDisplay(cleaned);
    setValue("phone", formatted, { shouldValidate: true, shouldDirty: true });
  };

const submit = handleSubmit(async (values) => {
  if ("phone" in values) {
    values.phone = cleanPhone(values.phone);
  }
  await onSubmit(values);
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
      {mode === "register" && (() => {
        const registerErrors = errors as Partial<
          Record<keyof RegisterFormData, { message?: string }>
        >;

        return (
          <>
            <TextInput
              id="fullName"
              label="Full Name"
              {...register("fullName")}
              error={registerErrors.fullName?.message}
            />

            <TextInput
              id="gender"
              label="Gender"
              {...register("gender")}
              error={registerErrors.gender?.message}
            />

            <TextInput
              id="nin"
              label="NIN"
              {...register("nin")}
              error={registerErrors.nin?.message}
            />

            <TextInput
              id="state"
              label="State"
              {...register("state")}
              error={registerErrors.state?.message}
            />

            <TextInput
              id="lga"
              label="LGA"
              {...register("lga")}
              error={registerErrors.lga?.message}
            />

            <TextInput
              id="phone"
              label="Phone"
              {...register("phone")}
              error={registerErrors.phone?.message}
            />
          </>
        );
      })()}


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
