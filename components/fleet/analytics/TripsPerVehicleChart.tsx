"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TripsPerVehicleChart({
  data,
}: {
  data: { vehicleId: string; trips: number }[];
}) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-[#FFEDE9]">
      <h3 className="text-sm font-medium text-neutral-600 mb-3">Trips Per Vehicle</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="vehicleId" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="trips" fill="#6B21A8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
