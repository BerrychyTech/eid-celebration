// components/logistics/ActiveDeliveries.tsx
import { ActiveDeliveriesSkeleton } from "./Skeletons";
export default function ActiveDeliveries() {
  const loading = false; // replace with real loading state
  if (loading) return <ActiveDeliveriesSkeleton />;
  return (
    <section className="p-6 bg-cardBg dark:bg-dark-cardBg rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Active Deliveries</h2>
      <p className="text-sm text-muted dark:text-dark-muted">No active deliveries.</p>
    </section>
  );
}
