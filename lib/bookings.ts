import api from "./api";

export async function createBooking(
  data: Record<string, any>,
  token: string
) {
  try {
    const res = await api.post("/bookings", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    // Optional: log or transform backend error
    throw error?.response?.data || error;
  }
  
}
