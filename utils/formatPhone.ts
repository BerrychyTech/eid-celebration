// src/utils/formatPhone.ts

/**
 * formatPhoneForDisplay
 * - input: digits only (or mixed). returns grouped like: 0801 234 5678
 */
export function formatPhoneForDisplay(value: string) {
  const digits = (value || "").replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";

  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
}

/** cleanPhone: remove formatting for sending to backend */
export function cleanPhone(value: string) {
  return (value || "").replace(/\s/g, "");
}
