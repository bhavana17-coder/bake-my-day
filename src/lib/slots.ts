// Delivery slot availability for the Kolkata (IST) cloud kitchen.
// Kitchen delivers 9 AM – 10 PM. Every slot closes CUTOFF_MINUTES before it starts
// so the bakers have time to bake, pack and dispatch.

export const CUTOFF_MINUTES = 90;
const DAYS_AHEAD = 3; // today + next 2 days

/** Slot windows in 24h hours: [startHour, endHour] */
const SLOT_WINDOWS: [number, number][] = [
  [9, 11],
  [11, 13],
  [13, 15],
  [15, 17],
  [17, 19],
  [19, 22],
];

export interface DeliverySlot {
  id: string; // e.g. "2026-09-01|19"
  label: string; // e.g. "Today, 7–10 PM"
  dayLabel: string;
  timeLabel: string;
  /** Minutes left before this slot stops accepting orders (only for today). */
  closesInMinutes: number;
}

/** Current wall-clock time in IST, regardless of where the code runs. */
export function nowInIST(date = new Date()): Date {
  return new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );
}

function hour12(h: number) {
  const suffix = h >= 12 ? "PM" : "AM";
  const base = h % 12 === 0 ? 12 : h % 12;
  return { base, suffix };
}

function timeLabel(start: number, end: number) {
  const a = hour12(start);
  const b = hour12(end);
  return a.suffix === b.suffix
    ? `${a.base}–${b.base} ${b.suffix}`
    : `${a.base} ${a.suffix}–${b.base} ${b.suffix}`;
}

function dayLabel(offset: number, d: Date) {
  if (offset === 0) return "Today";
  if (offset === 1) return "Tomorrow";
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

/** All slots that can still be ordered for, soonest first. */
export function getAvailableSlots(reference?: Date): DeliverySlot[] {
  const now = reference ? nowInIST(reference) : nowInIST();
  const slots: DeliverySlot[] = [];

  for (let offset = 0; offset < DAYS_AHEAD; offset++) {
    const day = new Date(now);
    day.setDate(day.getDate() + offset);

    for (const [start, end] of SLOT_WINDOWS) {
      const slotStart = new Date(day);
      slotStart.setHours(start, 0, 0, 0);
      const minutesUntilStart = Math.round(
        (slotStart.getTime() - now.getTime()) / 60000,
      );
      if (minutesUntilStart < CUTOFF_MINUTES) continue; // cutoff passed

      slots.push({
        id: `${dateKey(day)}|${start}`,
        dayLabel: dayLabel(offset, day),
        timeLabel: timeLabel(start, end),
        label: `${dayLabel(offset, day)}, ${timeLabel(start, end)}`,
        closesInMinutes: minutesUntilStart - CUTOFF_MINUTES,
      });
    }
  }

  return slots;
}

export function formatClosesIn(minutes: number) {
  if (minutes >= 60 * 24) return "";
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    return `closes in ${h} hr${h > 1 ? "s" : ""}`;
  }
  return `closes in ${Math.max(minutes, 1)} min`;
}
