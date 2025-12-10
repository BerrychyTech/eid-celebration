export default function AdminHome() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="p-6 bg-[var(--color-cardBg)] shadow rounded-2xl">
          <p className="text-sm text-[var(--color-muted)]">Total Users</p>
          <h2 className="text-3xl font-bold mt-2">5,563</h2>
        </div>

        <div className="p-6 bg-[var(--color-cardBg)] shadow rounded-2xl">
          <p className="text-sm text-[var(--color-muted)]">Active Drivers</p>
          <h2 className="text-3xl font-bold mt-2">1,093</h2>
        </div>

        <div className="p-6 bg-[var(--color-cardBg)] shadow rounded-2xl">
          <p className="text-sm text-[var(--color-muted)]">Bookings Today</p>
          <h2 className="text-3xl font-bold mt-2">218</h2>
        </div>

        <div className="p-6 bg-[var(--color-cardBg)] shadow rounded-2xl">
          <p className="text-sm text-[var(--color-muted)]">Wallet Balance</p>
          <h2 className="text-3xl font-bold mt-2">₦4,812,900</h2>
        </div>
      </div>
    </div>
  );
}
