export default function TestimonialsSection() {
  const testimonials = [
    { name: "Fatima", text: "BerryGo made my inter-state travel super easy. I always know when my car is coming!" },
    { name: "Abdullahi", text: "Very reliable and clean cars. I use it weekly for school trips." },
    { name: "Maryam", text: "The booking system is fast and I feel much safer traveling now." },
  ];

  return (
    <section className="py-20 bg-accentBg dark:bg-dark-accentBg">
      <h2 className="text-3xl font-semibold text-center">What Users Say</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mt-12">
        {testimonials.map((t, i) => (
          <div key={i} className="p-6 bg-cardBg dark:bg-dark-cardBg rounded-2xl shadow">
            <p className="text-sm text-muted dark:text-dark-muted">“{t.text}”</p>
            <p className="font-semibold mt-4">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
