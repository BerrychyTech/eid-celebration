export default function FAQ() {
  const q = [
    { q: "How much can I earn weekly?", a: "₦100k–₦150k depending on trip volume." },
    { q: "Can I register more than one vehicle?", a: "Yes, you can register unlimited vehicles." },
    { q: "Do I need to provide a driver?", a: "Yes. You can also request a verified driver." },
    { q: "How long is verification?", a: "24–48 hours once documents are complete." },
  ];

  return (
    <section className="py-20 px-6">
      <h2 className="text-2xl font-semibold text-center mb-10">Frequently Asked Questions</h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {q.map((item, i) => (
          <details
            key={i}
            className="bg-cardBg dark:bg-dark-cardBg p-4 rounded-xl shadow cursor-pointer"
          >
            <summary className="font-semibold">{item.q}</summary>
            <p className="text-sm text-muted dark:text-dark-muted mt-2">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
