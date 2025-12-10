export default function Earnings() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-2xl font-semibold text-center">How Fleet Partners Earn</h2>

      <div className="mt-10 grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="text-muted dark:text-dark-muted">
          <ul className="space-y-3">
            <li>• Base fares</li>
            <li>• Class multipliers</li>
            <li>• Driver payout model</li>
            <li>• Weekly settlement</li>
          </ul>
        </div>

        <div className="p-6 bg-cardBg dark:bg-dark-cardBg rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-3">Sample Calculation</h3>
          <p className="text-sm text-muted dark:text-dark-muted">
            If your car completes <b>3 trips per day</b> at <b>₦7,000 per trip</b>:
          </p>
          <p className="font-semibold mt-2 text-xl">Weekly Revenue = ₦147,000</p>
        </div>
      </div>
    </section>
  );
}
