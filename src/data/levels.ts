export type Level = 1 | 2 | 3;

export const levelNames: Record<Level, string> = {
  1: "Starter",
  2: "Working",
  3: "Confident",
};

// Level by story id. 1 = short, common lines. 2 = everyday work talk.
// 3 = lines that carry risk, disagreement or evidence.
const levels: Record<string, Level> = {
  late: 1,
  coffee: 1,
  saturday: 1,
  favor: 1,
  cancel: 2,
  meeting: 2,
  check: 1,
  lost: 1,
  text: 2,
  desk: 1,
  rain: 1,
  boxes: 1,
  "soft-no": 2,
  gate: 2,
  sick: 1,
  bye: 1,
  win: 2,
  ear: 2,

  "fab-intro": 1,
  "fab-gown": 1,
  "fab-safety": 1,
  "fab-handoff": 2,
  "fab-yield": 2,
  "fab-lobby": 2,
  "fab-tech": 2,
  "fab-show": 2,
  "fab-supplier": 2,
  "fab-standup": 2,
  "fab-down": 2,
  "fab-email": 2,
  "fab-phone": 2,
  "fab-pm": 2,
  "fab-excursion": 2,
  "fab-slides": 3,
  "fab-qa": 3,
  "fab-interview": 3,
  "fab-push": 3,
  "fab-manager": 3,
  "fab-audit": 3,
  "fab-rootcause": 3,
  "fab-evidence": 3,
  "fab-yieldreview": 3,
};

export function levelOf(storyId: string): Level {
  return levels[storyId] ?? 2;
}
