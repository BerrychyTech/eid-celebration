"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import { requestPasswordReset } from "@/lib/auth";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestPasswordReset(email);
      setSubmitted(true);
      toast.success("✅ Check your inbox for the reset link.");
    } catch (err) {
      toast.error("❌ Failed to send reset email.");
    }
  };

  return (
    <>
      <Header />

      <main className="max-w-md mx-auto p-6 bg-white dark:bg-dark-card mt-10 rounded-md shadow my-3">
        <h1 className="text-xl font-bold mb-4 text-center">🔑 Reset Your Password</h1>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Enter your email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-red-500 text-white py-2 rounded-md font-semibold transition"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <p className="text-center text-green-600 font-medium">
            ✅ If this email is registered, you'll receive a reset link shortly.
          </p>
        )}

        <p className="text-sm text-center mt-4">
          Remember your password?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-primary underline hover:text-red-500"
          >
            Login
          </button>
        </p>
      </main>

      <Footer />
    </>
  );
}
