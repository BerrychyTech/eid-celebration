// components/wallet/QuickActions.tsx

import { KeyRound, Info } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { title: "Transaction PIN", icon: <KeyRound size={20} /> },
    { title: "Funding Info", icon: <Info size={20} /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {actions.map((a, i) => (
        <div
          key={i}
          className="bg-accentBg dark:bg-dark-accentBg rounded-xl p-4 flex flex-col items-center shadow-sm"
        >
          <div className="p-3 rounded-full bg-cardBg dark:bg-dark-cardBg mb-2">
            {a.icon}
          </div>
          <p className="text-text dark:text-dark-text text-sm">{a.title}</p>
        </div>
      ))}
    </div>
  );
}
