export function calculateBagFee(bagCount: number) {
  return Math.max(0, bagCount - 1) * 500;
}

export function isFullCar(seats: string) {
  return seats === "full-car";
}

export function calculateTotal(seats: number, luggageFee: number, fullCar: boolean) {
  const basePrice = 2500;
  const fullCarFee = fullCar ? 1500 : 0;
  return (basePrice + luggageFee) * seats + fullCarFee;
}
