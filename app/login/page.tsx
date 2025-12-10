"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Navbar";
import { login as loginAPI } from "@/lib/auth";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import { AuthFormData } from "@/components/auth/validation";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleLogin = async (data: AuthFormData) => {
    try {
      const res = await loginAPI({ email: data.email, password: data.password });

      if (res?.token && res?.user) {
        login(res.user, res.token);
        toast.success("✅ Logged in successfully!");
        router.push("/dashboard");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err: any) {
      toast.error("❌ Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={`fonts-poppins`}>
      <Header />

      <main className="min-h-screen bg-background dark:bg-dark-background text-text dark:text-dark-text flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-card dark:bg-dark-card shadow p-6 rounded-lg">
          <AuthForm mode="login" onSubmit={handleLogin} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
