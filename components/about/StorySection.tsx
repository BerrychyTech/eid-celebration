export default function StorySection() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center">Our Story</h2>

      <div className="mt-8 grid md:grid-cols-2 gap-10">
        <div className="space-y-4 text-muted dark:text-dark-muted">
          <p>
            BerryGo started as a response to real transportation challenges faced by 
            travelers in northern Nigeria — unpredictable vehicles, delays, and lack of information.
          </p>
          <p>
            Our team observed how difficult it was for people to move reliably between towns, 
            especially students and workers who depend on interstate travel.
          </p>
          <p>
            Today, BerryGo is building the future of organized mobility — reliable schedules, 
            real-time tracking, verified drivers, and a transparent system built for the modern traveler.
          </p>
        </div>

        <div className="bg-cardBg dark:bg-dark-cardBg rounded-2xl shadow h-64"></div>
      </div>
    </section>
  );
}
