import { DriverPayout, PayoutRecord } from "@/types/payouts";

export function payDriver(
  payouts: DriverPayout[],
  history: PayoutRecord[],
  driverId: string,
  opts: { method?: "bank" | "wallet"; admin?: string; note?: string } = {}
): { payouts: DriverPayout[]; history: PayoutRecord[] } {
  const now = new Date().toISOString();
  const payoutsUpdated = payouts.map((p) =>
    p.driverId === driverId ? { ...p, status: "paid" as const } : p
  );

  const drv = payouts.find((p) => p.driverId === driverId);
  if (!drv) return { payouts: payoutsUpdated, history };

  const record: PayoutRecord = {
    id: `P-${now}-${driverId}`,
    driverId: drv.driverId,
    driverName: drv.driverName,
    amount: drv.amountDue,
    method: opts.method ?? "bank",
    admin: opts.admin ?? "system",
    date: now,
    note: opts.note,
  };

  return { payouts: payoutsUpdated, history: [record, ...history] };
}

export function holdPayout(
  payouts: DriverPayout[],
  driverId: string,
  reason?: string
): DriverPayout[] {
  return payouts.map((p) =>
    p.driverId === driverId ? { ...p, status: "on-hold" as const } : p
  );
}

export function payAllPending(
  payouts: DriverPayout[],
  history: PayoutRecord[],
  opts: { method?: "bank" | "wallet"; admin?: string } = {}
): { payouts: DriverPayout[]; history: PayoutRecord[] } {
  const pending = payouts.filter((p) => p.status === "pending");
  const now = new Date().toISOString();

  const records: PayoutRecord[] = pending.map((p) => ({
    id: `P-${now}-${p.driverId}`,
    driverId: p.driverId,
    driverName: p.driverName,
    amount: p.amountDue,
    method: opts.method ?? "bank",
    admin: opts.admin ?? "system",
    date: now,
  }));

  const payoutsUpdated = payouts.map((p) =>
    p.status === "pending" ? { ...p, status: "paid" as const } : p
  );

  return { payouts: payoutsUpdated, history: [...records, ...history] };
}
