import type { JobSlaryCurrencyType } from "@repo/db";

export function formatSalary(
  min: number | null,
  max: number | null,
  currency: JobSlaryCurrencyType | null
) {
  if (min === null && max === null) {
    return "—";
  }

  if (currency === "INR") {
    const formatLakhs = (value: number) =>
      `${(value / 100_000).toFixed(value % 100_000 === 0 ? 0 : 1)}L`;

    if (min !== null && max !== null) {
      return `₹${formatLakhs(min)} - ₹${formatLakhs(max)} LPA`;
    }

    if (min !== null) {
      return `₹${formatLakhs(min)}+ LPA`;
    }

    return `Up to ₹${formatLakhs(max!)} LPA`;
  }

  const symbolMap: Record<string, string> = {
    USD: "$",
    EUR: "€",
  };

  const symbol = currency ? symbolMap[currency] : "$";

  const formatK = (value: number) => `${(value / 1_000).toFixed(0)}k`;

  if (min !== null && max !== null) {
    return `${symbol}${formatK(min)} - ${symbol}${formatK(max)}`;
  }

  if (min !== null) {
    return `${symbol}${formatK(min)}+`;
  }

  return `Up to ${symbol}${formatK(max!)}`;
}

export function formatApplicationDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
