// utils/priceUtils.ts

/**
 * Calculate luggage fee based on extra bags
 * @param bagCount - Total number of bags
 * @param seats - Number of seats booked (1 bag per seat is free)
 * @param luggageFeePerBag - Fee per extra bag from route
 * @returns Total luggage fee
 */
export function calculateBagFee(
  bagCount: number, 
  seats: number = 1, 
  luggageFeePerBag: number = 0
): number {
  const freeBagsAllowed = seats; // 1 bag per seat is free
  const extraBags = Math.max(0, bagCount - freeBagsAllowed);
  return extraBags * luggageFeePerBag;
}

export function isFullCar(seats: string): boolean {
  return seats === "full-car";
}

/**
 * Calculate total trip cost including base fare, service charges, and luggage fees
 * @param basePrice - Base price per seat from route
 * @param seats - Number of seats
 * @param luggageFee - Total luggage fee (already calculated)
 * @param echargesPercentage - Service charge percentage from route (e.g., 25 = 25%)
 * @returns Total cost
 */
export function calculateTotal(
  basePrice: number,
  seats: number,
  luggageFee: number,
  echargesPercentage: number = 0
): number {
  const baseFare = basePrice * seats;
  const echargesAmount = baseFare * (echargesPercentage / 100);
  
  return baseFare + echargesAmount + luggageFee;
}

/**
 * Get detailed price breakdown for display
 */
export function getPriceBreakdown(
  basePrice: number,
  seats: number,
  luggageFee: number,
  echargesPercentage: number = 0
) {
  const baseFare = basePrice * seats;
  const echargesAmount = baseFare * (echargesPercentage / 100);
  const total = baseFare + echargesAmount + luggageFee;
  
  return {
    baseFare,
    echargesAmount,
    luggageFee,
    total,
    echargesPercentage
  };
}