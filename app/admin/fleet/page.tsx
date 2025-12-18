import Link from "next/link";
import { getFleetAnalytics } from "@/app/actions/fleet/analytics/actions";
import { fleetApplications } from "@/mock/fleetApplications";
import { mockFleetVehicles } from "@/mock/mockFleet";
import { mockDrivers } from "@/mock/fleetDrivers";

export default async function FleetDashboard() {
  const analytics = await getFleetAnalytics();

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold text-[#FD5C63]">
        Fleet Control Tower
      </h1>

      {/* TOP METRICS */}
      <div className="grid md:grid-cols-4 gap-6">
        <MetricCard title="Fleet Partners" value={fleetApplications.length} />
        <MetricCard title="Vehicles" value={mockFleetVehicles.length} />
        <MetricCard title="Active Vehicles" value={analytics.activeVehicles} />
        <MetricCard title="Drivers" value={mockDrivers.length} />
      </div>

      {/* QUICK LINKS */}
      <h2 className="text-lg font-semibold text-neutral-700">Quick Actions</h2>
      <div className="grid md:grid-cols-3 gap-6">

        <NavCard
          title="Review Fleet Applications"
          desc="Approve or reject partnership submissions"
          buttonLabel="Open Applications"
          href="/admin/fleet/applications"
        />

        <NavCard
          title="Manage Vehicles"
          desc="Assign vehicles, update status, maintenance"
          buttonLabel="Open Vehicles"
          href="/admin/fleet/vehicles"
        />

        <NavCard
          title="Driver Assignments"
          desc="Assign or de-assign vehicles to drivers"
          buttonLabel="Open Drivers"
          href="/admin/fleet/drivers"
        />

        <NavCard
          title="Fleet Earnings & Analytics"
          desc="Charts, revenue, trips, performance overview"
          buttonLabel="View Analytics"
          href="/admin/fleet/analytics"
        />

        <NavCard
          title="Partner Payments"
          desc="Set weekly payments, track settlements"
          buttonLabel="Manage Payments"
          href="/admin/fleet/payments"
        />

        <NavCard
          title="Vehicle Performance"
          desc="Trips, distance, uptime per vehicle"
          buttonLabel="View Metrics"
          href="/admin/fleet/metrics"
        />

      </div>


      {/* MINI ANALYTICS SECTION */}
      <h2 className="text-lg font-semibold text-neutral-700">Snapshot Insights</h2>

      <div className="grid md:grid-cols-2 gap-6">

        <MiniAnalyticsCard
          title="Weekly Earnings (₦)"
          data={analytics.weeklyEarnings}
        />

        <MiniListCard
          title="Top Performing Vehicles"
          items={analytics.tripsPerVehicle.map(v => ({
            label: v.vehicleId,
            value: `${v.trips} trips`
          }))}
        />

      </div>

    </div>
  );
}

/* UI COMPONENTS */

function MetricCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="p-5 bg-white rounded-2xl border border-[#FFEDE9] shadow">
      <p className="text-sm text-neutral-500">{title}</p>
      <p className="text-2xl font-semibold text-[#FD5C63] mt-1">{value}</p>
    </div>
  );
}

function NavCard({
  title,
  desc,
  href,
  buttonLabel,
}: {
  title: string;
  desc: string;
  href: string;
  buttonLabel: string;
}) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-[#FFEDE9] shadow flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-neutral-800">{title}</h3>
        <p className="text-sm text-neutral-500 mt-2">{desc}</p>
      </div>

      <Link
        href={href}
        className="mt-4 inline-block px-4 py-2 rounded-xl bg-[#FD5C63] text-white text-sm text-center hover:opacity-90"
      >
        {buttonLabel}
      </Link>
    </div>
  );
}

function MiniAnalyticsCard({ title, data }: { title: string; data: number[] }) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-[#FFEDE9] shadow">
      <p className="font-medium text-neutral-700">{title}</p>
      <div className="mt-3 flex gap-3">
        {data.map((v, i) => (
          <div
            key={i}
            className="px-3 py-2 bg-[#FFEDE9] rounded-xl text-sm text-[#FD5C63]"
          >
            Week {i + 1}: ₦{v.toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniListCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-[#FFEDE9] shadow">
      <p className="font-medium text-neutral-700">{title}</p>

      <ul className="mt-3 space-y-2">
        {items.map((i, idx) => (
          <li
            key={idx}
            className="flex justify-between text-sm bg-gray-50 p-2 rounded-xl"
          >
            <span className="text-neutral-600">{i.label}</span>
            <span className="font-medium text-[#FD5C63]">{i.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
