"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function WeeklyEarningsChart({ data }: { data: number[] }) {
  const chartData = data.map((amount, i) => ({ week: `Week ${i + 1}`, amount }));

  return (
    <div className="bg-white p-4 rounded-2xl shadow border border-[#FFEDE9]">
      <h3 className="text-sm font-medium text-neutral-600 mb-3">Weekly Earnings</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip formatter={(value: number) => `₦${value.toLocaleString()}`} />
          <Bar dataKey="amount" fill="#FD5C63" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
