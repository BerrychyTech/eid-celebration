"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthForm from "@/components/auth/AuthForm";
import type { AuthFormData } from "@/components/auth/validation";
import { register as registerAPI } from "@/lib/auth";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (data: AuthFormData) => {
    setLoading(true);

    try {
      const res = await registerAPI({
        fullName: data.fullName || "",
        email: data.email,
        password: data.password,
        phone: data.phone?.replace(/\s/g, "") || "",
      });

      if (res?.token) {
        localStorage.setItem("token", res.token);
        toast.success("🎉 Registration successful!");
        router.push("/book");
      } else {
        throw new Error("Invalid response");
      }
    } catch (err: any) {
      toast.error("❌ Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <AuthForm mode="register" onSubmit={handleRegister} isLoading={loading} />
      <Footer />
    </>
  );
}
