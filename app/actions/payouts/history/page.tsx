import { mockPayoutTransactions } from "@/mock/mockPayoutTransactions";

/* ================= ANALYTICS TYPE ================= */

type PayoutAnalytics = {
  completedPayouts: number;
  pendingPayouts: number;
  weeklyPayouts: number[];
  topDrivers: {
    driverId: string;
    name: string;
    total: number;
  }[];
};

/* ================= ACTION ================= */

export async function getPayoutAnalytics(): Promise<PayoutAnalytics> {
  const payouts = mockPayoutTransactions.filter(t => t.type === "payout");

  const completed = payouts.filter(p => p.status === "completed");
  const pending = payouts.filter(p => p.status === "pending");

  /* ---- Total Amounts ---- */
  const completedTotal = completed.reduce((sum, p) => sum + p.amount, 0);
  const pendingTotal = pending.reduce((sum, p) => sum + p.amount, 0);

  /* ---- Weekly Buckets (mocked) ---- */
  const weeklyPayouts = [0, 0, 0, 0];

  completed.forEach((p, idx) => {
    weeklyPayouts[idx % 4] += p.amount;
  });

  /* ---- Top Drivers ---- */
  const driverMap: Record<string, { name: string; total: number }> = {};

  completed.forEach(p => {
    if (!driverMap[p.driverId]) {
      driverMap[p.driverId] = {
        name: p.driverName,
        total: 0,
      };
    }
    driverMap[p.driverId].total += p.amount;
  });

  const topDrivers = Object.entries(driverMap)
    .map(([driverId, data]) => ({
      driverId,
      name: data.name,
      total: data.total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return {
    completedPayouts: completedTotal,
    pendingPayouts: pendingTotal,
    weeklyPayouts,
    topDrivers,
  };
}
