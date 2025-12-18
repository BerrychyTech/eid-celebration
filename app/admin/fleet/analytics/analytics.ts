"use server";
import { fleetAnalytics } from "@/mock/fleetAnalytics";

export async function getFleetAnalytics() {
  return fleetAnalytics;
}
