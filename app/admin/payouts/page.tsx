import Link from "next/link";
import { mockDrivers } from "@/mock/fleetDrivers";
import { mockTransactions } from "@/mock/mockTransactions";
import { getPayoutAnalytics } from "@/app/actions/payouts/actions";

export default async function PayoutsDashboard() {
  const analytics = await getPayoutAnalytics();

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-[#FD5C63]">
        Payouts & Settlements Control
      </h1>

      {/* TOP METRICS */}
      <div className="grid md:grid-cols-4 gap-6">
        <MetricCard title="Active Drivers" value={mockDrivers.length} />
        <MetricCard
          title="Total Payable (₦)"
          value={analytics.totalPayable.toLocaleString()}
        />
        <MetricCard
          title="Pending Payouts"
          value={analytics.pendingPayouts}
        />
        <MetricCard
          title="Completed Payouts"
          value={analytics.completedPayouts}
        />
      </div>

      {/* QUICK ACTIONS */}
      <h2 className="text-lg font-semibold text-neutral-700">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <NavCard
          title="Driver Payouts"
          desc="Review, approve and process driver payouts"
          buttonLabel="Manage Payouts"
          href="/admin/payouts/f"
        />

        <NavCard
          title="Fleet Partner Payouts"
          desc="Review, approve and process driver payouts"
          buttonLabel="Manage Payouts"
          href="/admin/payouts/Fleet-partners"
        />

        <NavCard
          title="Settlement History"
          desc="Completed payouts & settlement logs"
          buttonLabel="View Settlements"
          href="/admin/payouts/history"
        />

        <NavCard
          title="Payout Rules"
          desc="Minimum balance, cycles, fees"
          buttonLabel="Configure Rules"
          href="/admin/payouts/settings"
        />
      </div>

      {/* SNAPSHOT INSIGHTS */}
      <h2 className="text-lg font-semibold text-neutral-700">
        Snapshot Insights
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <MiniAnalyticsCard
          title="Weekly Payout Volume"
          data={analytics.weeklyPayouts}
        />

        <MiniListCard
          title="Top Drivers by Earnings"
          items={analytics.topDrivers.map((d) => ({
            label: d.name,
            value: `₦${d.totalEarned.toLocaleString()}`,
          }))}
        />
      </div>
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="p-5 bg-white rounded-2xl border border-[#FFEDE9] shadow">
      <p className="text-sm text-neutral-500">{title}</p>
      <p className="text-2xl font-semibold text-[#FD5C63] mt-1">
        {value}
      </p>
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

function MiniAnalyticsCard({
  title,
  data,
}: {
  title: string;
  data: number[];
}) {
  return (
    <div className="p-6 bg-white rounded-2xl border border-[#FFEDE9] shadow">
      <p className="font-medium text-neutral-700">{title}</p>
      <div className="mt-3 flex gap-3 flex-wrap">
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
            <span className="font-medium text-[#FD5C63]">
              {i.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
