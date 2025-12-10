"use client";

import {
  FaUserTie,
  FaCarSide,
  FaBusAlt,
  FaIdCard,
  FaMobileAlt,
  FaRoad,
  FaCar,
  FaCheckCircle,
} from "react-icons/fa";

export default function DriverEligibility() {
  return (
    <section className="py-20 px-6 font-poppins">
      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center">Who Can Apply?</h2>

      {/* TOP 3 CATEGORIES */}
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

      {/* DIVIDER */}
      <h3 className="text-2xl font-semibold text-center mt-20 mb-6">
        Requirements
      </h3>

      {/* TWO GROUPS */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* ------------------ GROUP A: Drivers Only ------------------ */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-primary">
            A. Drivers Who Want to Join Without a Car
          </h4>

          <div className="grid gap-5">
            <RequirementCard
              icon={<FaIdCard />}
              title="Valid Driver’s License"
            />

            <RequirementCard
              icon={<FaCheckCircle />}
              title="National ID / NIN / Passport"
            />

            <RequirementCard
              icon={<FaMobileAlt />}
              title="Phone with Internet Access"
            />

            <RequirementCard
              icon={<FaRoad />}
              title="Clean Driving Record"
            />

            <RequirementCard
              icon={<FaUserTie />}
              title="Good Customer Conduct"
            />
          </div>
        </div>

        {/* ------------------ GROUP B: Driver + Car Requirements ------------------ */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-primary">
            B. Drivers Joining With Their Own Car
          </h4>

          <div className="grid gap-5">
            <RequirementCard
              icon={<FaCar />}
              title="Valid Papers"
            />

            <RequirementCard
              icon={<FaCarSide />}
              title="Good Tires + Working AC"
            />

            <RequirementCard
              icon={<FaCarSide />}
              title="No Major Dents"
            />

            <RequirementCard
              icon={<FaCar />}
              title="Model Year Requirement (Optional)"
            />

            <RequirementCard
              icon={<FaCheckCircle />}
              title="Clean Interior"
            />

            <RequirementCard
              icon={<FaCarSide />}
              title="4-Door Car Recommended"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- SUB COMPONENTS ------------------------- */

function CategoryCard({ icon, title, desc }: any) {
  return (
    <div className="p-6 rounded-xl shadow bg-gray-50 dark:bg-neutral-900 text-center hover:scale-[1.02] transition">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{desc}</p>
    </div>
  );
}

function RequirementCard({ icon, title }: any) {
  return (
    <div className="p-5 rounded-xl shadow bg-white dark:bg-neutral-900 flex gap-4 items-center hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
      <div className="text-2xl text-primary">{icon}</div>
      <h4 className="text-lg font-medium">{title}</h4>
    </div>
  );
}
