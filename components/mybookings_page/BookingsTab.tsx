export function BookingTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: "upcoming" | "past";
  onTabChange: (tab: "upcoming" | "past") => void;
}) {
  return (
    <div className="flex border-b border-muted dark:border-dark-muted mb-6">
      {["upcoming", "past"].map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab as "upcoming" | "past")}
          className={`flex-1 py-2 font-medium transition ${
            activeTab === tab
              ? "border-b-4 border-primary dark:border-dark-primary text-primary dark:text-dark-primary"
              : "text-muted dark:text-dark-muted"
          }`}
        >
          {tab === "upcoming" ? "Upcoming" : "Past"}
        </button>
      ))}
    </div>
  );
}