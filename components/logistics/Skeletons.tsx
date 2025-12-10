// components/logistics/Skeletons.tsx
export function ActiveDeliveriesSkeleton() {
  return <div className="animate-pulse h-40 bg-cardBg dark:bg-dark-cardBg rounded-xl"></div>;
}

export function DeliveryHistorySkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse h-20 bg-cardBg dark:bg-dark-cardBg rounded-xl w-full"></div>
      ))}
    </div>
  );
}
