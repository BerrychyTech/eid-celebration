const stats = [
  {
    label: "Total Users",
    value: "5,563",
  },
  {
    label: "Active Drivers",
    value: "1,093",
  },
  {
    label: "Bookings Today",
    value: "218",
  },
  {
    label: "Wallet Balance",
    value: "₦4,812,900",
  },
    {
    label: "Deliveries Today",
    value: "318",
  },
    {
    label: "Total Fleets",
    value: "50",
  },
];


export default function AdminHome() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 bg-[var(--color-cardBg)] shadow rounded-2xl"
          >
            <p className="text-sm text-[var(--color-muted)]">
              {stat.label}
            </p>
            <h2 className="text-3xl font-bold mt-2">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
