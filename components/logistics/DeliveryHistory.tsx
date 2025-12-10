// components/logistics/DeliveryHistory.tsx
import { DeliveryHistorySkeleton } from "./Skeletons";
export default function DeliveryHistory() {
  const loading = false; // replace with real loading state
  if (loading) return <DeliveryHistorySkeleton />;
  return (
    <section className="p-6 bg-cardBg dark:bg-dark-cardBg rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Delivery History</h2>
      <p className="text-sm text-muted dark:text-dark-muted">No past deliveries.</p>
    </section>
  );
}
