// Leitner-box spaced review. Box 0 is new or missed; higher boxes wait longer.
export type ReviewCard = { box: number; due: string };
export type ReviewMap = Record<string, ReviewCard>;

export const INTERVALS = [1, 2, 4, 8, 16];
export const MAX_BOX = INTERVALS.length - 1;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function dayString(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function addDays(day: string, days: number) {
  const [y, m, d] = day.split("-").map(Number);
  const date = new Date(y ?? 1970, (m ?? 1) - 1, (d ?? 1) + days);
  return dayString(date);
}

export function seedCard(today: string, delay = 1): ReviewCard {
  return { box: 0, due: addDays(today, delay) };
}

export function grade(card: ReviewCard | undefined, ok: boolean, today: string): ReviewCard {
  if (!ok) return { box: 0, due: today };
  const box = Math.min((card?.box ?? -1) + 1, MAX_BOX);
  return { box, due: addDays(today, INTERVALS[box] ?? 1) };
}

export function dueIds(review: ReviewMap, today: string): string[] {
  return Object.entries(review)
    .filter(([, card]) => card.due <= today)
    .sort((a, b) => a[1].box - b[1].box || a[1].due.localeCompare(b[1].due))
    .map(([id]) => id);
}

export function sanitizeReview(value: unknown): ReviewMap {
  const out: ReviewMap = {};
  if (!value || typeof value !== "object") return out;
  for (const [id, raw] of Object.entries(value as Record<string, unknown>)) {
    if (!raw || typeof raw !== "object") continue;
    const card = raw as { box?: unknown; due?: unknown };
    if (typeof card.box !== "number" || typeof card.due !== "string") continue;
    out[id] = { box: Math.max(0, Math.min(MAX_BOX, Math.floor(card.box))), due: card.due };
  }
  return out;
}

// The seven days of the current week, Monday first, with whether each day had activity.
export function weekDots(activity: string[], now: Date) {
  const offset = (now.getDay() + 6) % 7;
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - offset);
  const today = dayString(now);
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  return labels.map((label, index) => {
    const day = dayString(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index));
    return { label, day, active: activity.includes(day), today: day === today };
  });
}
