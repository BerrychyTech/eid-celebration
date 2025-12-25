"use server";

import api from "@/lib/api";

export async function sendContactMessage(formData: FormData) {
    console.log("🟡 Server Action STARTED");
    try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    await api.post("/contact", payload);

    return { success: true };
  } catch (error: any) {
    console.error(
      "❌ sendContactMessage error:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      error: error?.response?.data?.message || "Request failed",
    };
  }
}
