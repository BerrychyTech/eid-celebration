"use client";

export default function AnalyticsCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-[#FFEDE9] shadow">
      <h3 className="text-neutral-500 text-sm">{title}</h3>
      <p className="text-2xl font-semibold text-[#FD5C63] mt-2">{value}</p>
    </div>
  );
}
