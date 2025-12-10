export default function AppPreview() {
  return (
    <section className="py-20 px-6 bg-accentBg dark:bg-dark-accentBg">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Fleet Management App (Coming Soon)
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {["Dashboard", "Trip Allocation", "Earnings Breakdown", "Vehicle Health"].map((i) => (
          <div
            key={i}
            className="h-40 bg-cardBg dark:bg-dark-cardBg rounded-xl shadow flex items-center justify-center"
          >
            <span className="text-muted dark:text-dark-muted">{i} Mock</span>
          </div>
        ))}
      </div>
    </section>
  );
}
