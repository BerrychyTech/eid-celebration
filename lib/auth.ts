// File: src/lib/auth.ts
import api from "./api";

export async function login(data: { email: string; password: string }) {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export async function register(data: {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function requestPasswordReset(email: string) {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
}
