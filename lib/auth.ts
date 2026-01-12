// File: src/lib/auth.ts
import { RegisterFormData } from "@/components/auth/validation";
import api from "./api";

export async function login(data: { email: string; password: string }) {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function register(data: RegisterFormData) {
  const res = await api.post("/auth/register", data);
  return res.data;
}


export async function requestPasswordReset(email: string) {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
}
