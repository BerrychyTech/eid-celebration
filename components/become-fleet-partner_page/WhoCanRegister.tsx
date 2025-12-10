import { FaCar, FaBus, FaBuilding } from "react-icons/fa";

export default function WhoCanRegister() {
  const items = [
    { icon: <FaCar />, title: "Private Car Owners", desc: "Earn extra income by putting your car to work." },
    { icon: <FaBus />, title: "Minibus Operators", desc: "Perfect for transport operators running city routes." },
    { icon: <FaBuilding />, title: "Corporate Fleets", desc: "Register multiple vehicles and earn passively." },
  ];

  return (
    <section className="py-20 px-6">
      <h2 className="text-2xl font-semibold text-center mb-10">Who Can Register?</h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((i, idx) => (
          <div
            key={idx}
            className="p-6 bg-cardBg dark:bg-dark-cardBg rounded-xl shadow flex flex-col items-center text-center"
          >
            <div className="text-primary dark:text-dark-primary text-3xl">{i.icon}</div>
            <h3 className="mt-4 font-semibold text-lg">{i.title}</h3>
            <p className="text-sm text-muted dark:text-dark-muted mt-2">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
