import { getFleetAnalytics } from "./analytics";
import AnalyticsCard from "@/components/fleet/analytics/AnalyticsCard";
import WeeklyEarningsChart from "@/components/fleet/analytics/WeeklyEarningsChart";
import TripsPerVehicleChart from "@/components/fleet/analytics/TripsPerVehicleChart";

export default async function FleetAnalyticsPage() {
  const analytics = await getFleetAnalytics();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#FD5C63]">Fleet Analytics Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <AnalyticsCard title="Total Earnings" value={`₦${analytics.totalEarnings.toLocaleString()}`} />
        <AnalyticsCard title="Total Trips" value={analytics.totalTrips} />
        <AnalyticsCard title="Active Vehicles" value={analytics.activeVehicles} />
        <AnalyticsCard title="Total Distance" value={`${analytics.totalDistance} km`} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <WeeklyEarningsChart data={analytics.weeklyEarnings} />
        <TripsPerVehicleChart data={analytics.tripsPerVehicle} />
      </div>
    </div>
  );
}
