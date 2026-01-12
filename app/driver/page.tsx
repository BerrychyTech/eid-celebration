import DriverNavbar from "@/components/DriverNavbar";

export default function DriverDashboard() {
  return (
    <>
      <DriverNavbar />

      <div className="min-h-screen bg-background pt-20 px-4 pb-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center bg-cardBg p-4 rounded-xl shadow">
          <div>
            <h2 className="font-semibold text-lg">Welcome, Aliyu</h2>
            <p className="text-sm text-muted">
              Toyota Hiace • KANO-345-AB
            </p>
          </div>

          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            Online
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { label: "Trips Today", value: 6 },
            { label: "Deliveries Today", value: 6 },
            { label: "Earnings", value: "₦18,400" },
            { label: "Rating", value: "4.8 ⭐" },
            { label: "Distance", value: "112 km" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-cardBg p-4 rounded-xl shadow"
            >
              <p className="text-sm text-muted">{stat.label}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Active Trip */}
        <div className="bg-primary/10 border border-primary/20 p-5 rounded-xl">
          <h3 className="font-semibold text-primary mb-2">
            Active Trip
          </h3>
          <p className="text-sm sm:text-base">
            Sabon Gari → Airport Road
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button className="flex-1 bg-primary text-white py-2 rounded-lg">
              Start Trip
            </button>
            <button className="flex-1 border border-primary text-primary py-2 rounded-lg">
              Support
            </button>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-cardBg p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-1">Earnings</h3>
          <p className="text-sm text-muted">Wallet Balance</p>
          <p className="text-2xl font-semibold">₦48,000</p>

          <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg">
            Withdraw
          </button>
        </div>
      </div>
    </>
  );
}
