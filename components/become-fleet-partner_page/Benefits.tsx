import { FaMoneyBillWave, FaUsersCog, FaShieldAlt, FaCarSide } from "react-icons/fa";

export default function Benefits() {
  const benefits = [
    { icon: <FaMoneyBillWave />, title: "Guaranteed Daily Earnings" },
    { icon: <FaUsersCog />, title: "Real-time Trip Allocation" },
    { icon: <FaShieldAlt />, title: "Driver Monitoring & Verification" },
    { icon: <FaCarSide />, title: "Vehicle Servicing Standards" },
  ];

  return (
    <section className="py-20 px-6 bg-accentBg dark:bg-dark-accentBg">
      <h2 className="text-2xl font-semibold text-center mb-10">Why Partner With BerryGo?</h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {benefits.map((b, i) => (
          <div key={i} className="p-6 bg-cardBg dark:bg-dark-cardBg rounded-xl shadow text-center">
            <div className="text-primary dark:text-dark-primary text-3xl mb-3">{b.icon}</div>
            <h3 className="font-semibold">{b.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
