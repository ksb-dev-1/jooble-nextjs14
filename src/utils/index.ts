import { formatDistanceToNowStrict, format } from "date-fns";

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  })
    .format(amount)
    .slice(0, -3);
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export function monthYearDate(from: Date) {
  return format(from, "dd MMM yyyy");
}

export function parseUniqueFilters(str?: string): string[] {
  return Array.from(
    new Set(
      (str || "")
        .split(",")
        .map((v) => v.trim().toLowerCase())
        .filter(Boolean)
    )
  );
}
