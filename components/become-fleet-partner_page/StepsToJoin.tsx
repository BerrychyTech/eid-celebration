export default function StepsToJoin() {
  const steps = [
    "Submit Application",
    "Vehicle Inspection & Documentation",
    "Driver Verification & Activation",
  ];

  return (
    <section className="py-20 px-6 bg-accentBg dark:bg-dark-accentBg">
      <h2 className="text-2xl font-semibold text-center mb-10">How It Works</h2>

      <div className="max-w-3xl mx-auto space-y-6">
        {steps.map((s, i) => (
          <div
            key={i}
            className="p-5 bg-cardBg dark:bg-dark-cardBg rounded-xl shadow flex items-start gap-4"
          >
            <div className="text-primary dark:text-dark-primary font-bold text-xl">{i + 1}</div>
            <p className="font-medium">{s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
