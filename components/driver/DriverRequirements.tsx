"use client";

import {
  FaIdCard,
  FaCheckCircle,
  FaMobileAlt,
  FaRoad,
  FaUserTie,
  FaCar,
  FaCarSide,
} from "react-icons/fa";

export default function DriverRequirements() {
  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h3 className="text-2xl font-semibold text-center mt-20 mb-6">
        Requirements
      </h3>

      <div className="grid md:grid-cols-2 gap-12">
        {/* GROUP A */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-primary">
            A. Drivers Who Want to Join Without a Car
          </h4>

          <div className="grid gap-5">
            <RequirementCard icon={<FaIdCard />} title="Valid Driver’s License" />
            <RequirementCard icon={<FaCheckCircle />} title="National ID / NIN / Passport" />
            <RequirementCard icon={<FaMobileAlt />} title="Phone with Internet Access" />
            <RequirementCard icon={<FaRoad />} title="Clean Driving Record" />
            <RequirementCard icon={<FaUserTie />} title="Good Customer Conduct" />
          </div>
        </div>

        {/* GROUP B */}
        <div>
          <h4 className="text-xl font-bold mb-4 text-primary">
            B. Drivers Joining With Their Own Car
          </h4>

          <div className="grid gap-5">
            <RequirementCard icon={<FaCar />} title="Valid Papers" />
            <RequirementCard icon={<FaCarSide />} title="Good Tires + Working AC" />
            <RequirementCard icon={<FaCarSide />} title="No Major Dents" />
            <RequirementCard icon={<FaCar />} title="Model Year Requirement (Optional)" />
            <RequirementCard icon={<FaCheckCircle />} title="Clean Interior" />
            <RequirementCard icon={<FaCarSide />} title="4-Door Car Recommended" />
          </div>
        </div>
      </div>
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
