export default function Testimonials() {
  const items = [
    { name: "Michael O.", text: "I registered 2 cars. Weekly payouts are reliable!" },
    { name: "Fatima L.", text: "BerryGo verification was fast. Smooth onboarding." },
  ];

  return (
    <section className="py-20 px-6 bg-accentBg dark:bg-dark-accentBg">
      <h2 className="text-2xl font-semibold text-center mb-10">What Partners Say</h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {items.map((t, i) => (
          <div key={i} className="p-6 bg-cardBg dark:bg-dark-cardBg rounded-xl shadow">
            <p className="text-muted dark:text-dark-muted italic">“{t.text}”</p>
            <p className="font-semibold mt-3">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
