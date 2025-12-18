// components/admin/drivers/OnboardingStepper.tsx
"use client";
import React from "react";

const STEPS = [
  "Submitted application",
  "Documents uploaded",
  "KYC review",
  "Vehicle assigned",
  "Training completed",
  "Activated",
];

export default function OnboardingStepper({ step }: { step: number; }) {
  return (
    <div className="p-4 rounded-2xl bg-[var(--color-cardBg)] shadow">
      <h3 className="font-semibold mb-3">Onboarding</h3>
      <div className="space-y-3">
        {STEPS.map((label, i) => {
          const idx = i + 1;
          const isDone = idx <= step;
          return (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${isDone ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-accentBg)] text-[var(--color-muted)] border"}`}>{idx}</div>
              <div>
                <div className={`font-medium ${isDone ? "" : "text-[var(--color-muted)]"}`}>{label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
