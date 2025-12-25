import Link from "next/link";
import { getUserAnalytics } from "@/app/actions/users/analytics/actions";
import { mockAdmins } from "@/mock/admins";
import { mockUsers } from "@/mock/users";

export default async function UsersDashboard() {
  const analytics = await getUserAnalytics();

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold text-[#FD5C63]">
        Users Control Tower
      </h1>

      {/* TOP METRICS */}
      <div className="grid md:grid-cols-4 gap-6">
        <MetricCard title="Total Users" value={mockUsers.length} />
        <MetricCard title="Admins" value={mockAdmins.length} />
        <MetricCard title="Active Users" value={analytics.activeUsers} />
        <MetricCard title="Suspended Accounts" value={analytics.suspendedUsers} />
      </div>

      {/* QUICK ACTIONS */}
      <h2 className="text-lg font-semibold text-neutral-700">
        User Management Actions
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <NavCard
          title="Manage Normal Users"
          desc="Create, view, suspend, or restore user accounts"
          buttonLabel="Open Users"
          href="/admin/users/all"
        />

        <NavCard
          title="Admin Management"
          desc="Create and manage admin & super admin roles"
          buttonLabel="Manage Admins"
          href="/admin/users/admins"
        />

        <NavCard
          title="Create New User"
          desc="Manually create users or admins"
          buttonLabel="Create User"
          href="/admin/users/create"
        />

        <NavCard
          title="Roles & Permissions"
          desc="Control what admins can see and do"
          buttonLabel="Configure Roles"
          href="/admin/users/roles"
        />

        <NavCard
          title="User Activity Logs"
          desc="Track logins, actions, and changes"
          buttonLabel="View Logs"
          href="/admin/users/activity"
        />

        <NavCard
          title="Security & Access"
          desc="Account lock, password resets, sessions"
          buttonLabel="Security Center"
          href="/admin/users/security"
        />

      </div>

      {/* SNAPSHOT INSIGHTS */}
      <h2 className="text-lg font-semibold text-neutral-700">
        User Insights Snapshot
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <MiniAnalyticsCard
          title="New Users (Last 4 Weeks)"
          data={analytics.newUsersWeekly}
        />

        <MiniListCard
          title="Most Active Users"
          items={analytics.topActiveUsers.map(u => ({
            label: u.name,
            value: `${u.actions} actions`
          }))}
        />

      </div>

    </div>
  );
}

/* ================= UI COMPONENTS ================= */

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

      <div className="mt-3 flex gap-3 flex-wrap">
        {data.map((v, i) => (
          <div
            key={i}
            className="px-3 py-2 bg-[#FFEDE9] rounded-xl text-sm text-[#FD5C63]"
          >
            Week {i + 1}: {v}
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
