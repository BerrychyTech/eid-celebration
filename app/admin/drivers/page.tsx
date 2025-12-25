import Link from "next/link";
import { getDriverAnalytics } from "@/app/actions/drivers/analytics/actions";
import { driverApplications } from "@/mock/driverApplications";
import { approvedDrivers } from "@/mock/approvedDrivers";

export default async function DriversDashboard() {
  const analytics = await getDriverAnalytics();

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold text-[#FD5C63]">
        Drivers Control Tower
      </h1>

      {/* TOP METRICS */}
      <div className="grid md:grid-cols-4 gap-6">
        <MetricCard title="Total Drivers" value={approvedDrivers.length} />
        <MetricCard title="Pending Applications" value={driverApplications.length} />
        <MetricCard title="Active Drivers" value={analytics.activeDrivers} />
        <MetricCard title="Suspended Drivers" value={analytics.suspendedDrivers} />
      </div>

      {/* QUICK ACTIONS */}
      <h2 className="text-lg font-semibold text-neutral-700">Quick Actions</h2>

      <div className="grid md:grid-cols-3 gap-6">

        <NavCard
          title="Register New Driver"
          desc="Manually onboard a new driver"
          buttonLabel="Register Driver"
          href="/admin/drivers/register"
        />

        <NavCard
          title="Driver Applications"
          desc="Review, approve or reject driver applications"
          buttonLabel="View Applications"
          href="/admin/drivers/applications"
        />

        <NavCard
          title="Approved Drivers"
          desc="Manage active drivers and profiles"
          buttonLabel="Manage Drivers"
          href="/admin/drivers/approved"
        />

        <NavCard
          title="Driver Assignments"
          desc="Assign drivers to vehicles or fleets"
          buttonLabel="Open Assignments"
          href="/admin/drivers/assignments"
        />

        <NavCard
          title="Driver Earnings"
          desc="View trips, payouts and performance"
          buttonLabel="View Earnings"
          href="/admin/drivers/earnings"
        />

        <NavCard
          title="Driver Safety & Compliance"
          desc="Reports, suspensions, background checks"
          buttonLabel="Open Safety"
          href="/admin/drivers/safety"
        />

      </div>

      {/* SNAPSHOT INSIGHTS */}
      <h2 className="text-lg font-semibold text-neutral-700">Snapshot Insights</h2>

      <div className="grid md:grid-cols-2 gap-6">

        <MiniAnalyticsCard
          title="Weekly Trips Completed"
          data={analytics.weeklyTrips}
        />

        <MiniListCard
          title="Top Performing Drivers"
          items={analytics.topDrivers.map((d: { driverName: any; trips: any; }) => ({
            label: d.driverName,
            value: `${d.trips} trips`
          }))}
        />

      </div>

    </div>
  );
}


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
