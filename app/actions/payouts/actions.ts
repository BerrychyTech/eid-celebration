// /app/actions/payouts/actions.ts

"use server";

import { mockTransactions } from "@/mock/mockPayoutsTransactions";

export async function getPayoutAnalytics() {
  /* ================= FILTERS ================= */

  const completedEarnings = mockTransactions.filter(
    (t) =>
      (t.type === "delivery_earning" || t.type === "ride_earning") &&
      t.status === "completed"
  );

  const completedPayouts = mockTransactions.filter(
    (t) => t.type === "payout" && t.status === "completed"
  );

  const pendingPayouts = mockTransactions.filter(
    (t) => t.type === "payout" && t.status === "pending"
  );

  /* ================= TOTAL PAYABLE ================= */
  const totalEarned = completedEarnings.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const totalPaidOut = completedPayouts.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const totalPayable = Math.max(totalEarned - totalPaidOut, 0);

  /* ================= WEEKLY PAYOUTS ================= */
  // mock 4-week window
  const weeklyPayouts = [0, 0, 0, 0];

  completedPayouts.forEach((t, index) => {
    weeklyPayouts[index % 4] += t.amount;
  });

  /* ================= DRIVER RANKINGS ================= */

  const driverMap = new Map<
    string,
    { name: string; totalEarned: number }
  >();

  completedEarnings.forEach((t) => {
    if (!driverMap.has(t.driverId)) {
      driverMap.set(t.driverId, {
        name: t.driverName,
        totalEarned: 0,
      });
    }
    driverMap.get(t.driverId)!.totalEarned += t.amount;
  });

  const topDrivers = Array.from(driverMap.values())
    .sort((a, b) => b.totalEarned - a.totalEarned)
    .slice(0, 5);

  /* ================= RETURN ================= */

  return {
    totalPayable,
    pendingPayouts: pendingPayouts.length,
    completedPayouts: completedPayouts.length,
    weeklyPayouts,
    topDrivers,
  };
}

