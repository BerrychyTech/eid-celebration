"use client";

import { FaUserTie, FaCarSide, FaBusAlt } from "react-icons/fa";

export default function DriverCategories() {
  return (
    <div className="grid gap-6 mt-10 md:grid-cols-3 max-w-6xl mx-auto">
      <CategoryCard
        icon={<FaUserTie className="text-4xl text-primary" />}
        title="Experienced Drivers"
        desc="At least 1 year driving experience."
      />

      <CategoryCard
        icon={<FaCarSide className="text-4xl text-primary" />}
        title="Car Owners Who Want to Drive"
        desc="Register yourself + your car."
      />

      <CategoryCard
        icon={<FaBusAlt className="text-4xl text-primary" />}
        title="Professional Transport Drivers"
        desc="Interstate / long-distance drivers."
      />
    </div>
  );
}

function CategoryCard({ icon, title, desc }: any) {
  return (
    <div className="p-6 rounded-xl shadow bg-gray-50 dark:bg-neutral-900 text-center hover:scale-[1.02] transition">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{desc}</p>
    </div>
  );
}
