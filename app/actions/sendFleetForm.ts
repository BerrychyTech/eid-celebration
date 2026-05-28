"use server";

import api from "@/lib/api";
import { redirect } from "next/navigation";
export async function sendFleetForm(formData: FormData): Promise<void> {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      vehicles: Number(formData.get("vehicles")),
      vehicleNames: formData.get("vehicles Name(s)"),
      driver: formData.get("driver"),
      message: formData.get("message"),
    };

    await api.post("/fleet-applications", payload);
redirect("/");
    } catch (error: any) {
    console.error("Fleet form error:", error?.response?.data || error);
    throw new Error(
      error?.response?.data?.message || "Failed to submit application"
    );
  }
}