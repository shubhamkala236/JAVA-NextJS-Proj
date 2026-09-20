const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

const LOCAL_DATE_TIME = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;

/**
 * Formats the API's LocalDateTime strings ("2026-09-20T17:43:12.123456" — ISO
 * with no zone or offset) for display.
 *
 * Deliberately does NOT use `new Date(...)`:
 *   - a zoneless string is parsed as LOCAL time, so a server in UTC and a
 *     browser in UTC+8 would disagree about what instant it names;
 *   - `toLocaleString()` output depends on the runtime's ICU data, which differs
 *     between Node and the browser even for the same locale.
 *
 * Either one produces a React hydration mismatch. Formatting the literal fields
 * is deterministic everywhere.
 */
export const formatLocalDateTime = (value: string | null | undefined): string | null => {
  if (!value) return null;

  const match = LOCAL_DATE_TIME.exec(value);
  if (!match) return null;

  const [, year, month, day, hour, minute] = match;
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName) return null;

  const hour24 = Number(hour);
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const meridiem = hour24 < 12 ? "AM" : "PM";

  return `${Number(day)} ${monthName} ${year}, ${hour12}:${minute} ${meridiem}`;
};
