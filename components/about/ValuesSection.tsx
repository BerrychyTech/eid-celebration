export default function ValuesSection() {
  const values = [
    { title: "Customer First", desc: "Every decision focuses on improving the user experience." },
    { title: "Safety", desc: "We prioritize safety in vehicles, drivers, and operations." },
    { title: "Innovation", desc: "Constantly improving through technology and real data." },
    { title: "Transparency", desc: "Clear pricing, clear communication, no surprises." },
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center">Our Values</h2>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {values.map((v, i) => (
          <div key={i} className="p-6 rounded-2xl bg-cardBg dark:bg-dark-cardBg shadow">
            <h3 className="font-semibold">{v.title}</h3>
            <p className="text-sm text-muted dark:text-dark-muted mt-2">{v.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
