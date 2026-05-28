"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export interface Route {
  id: number;
  currentState: string;
  destinationState: string;
  fromTown: string;
  toTown: string;
  basePrice: number;
  luggage: number;
  echarges: number;
}

export function useRoutes() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await api.get("/routes");

        const cleaned = res.data.data.map((r: any) => ({
          ...r,
          basePrice: Number(r.basePrice),
          luggage: Number(r.luggage),
          echarges: Number(r.echarges),
        }));

        setRoutes(cleaned);
      } catch (err) {
        console.error("Failed to load routes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return { routes, loading };
}