// Speaking support: show a line in full, with words hidden, as a starter, or not at all.
export type Help = "script" | "gaps" | "starter" | "none";

export const HELP_ORDER: Help[] = ["script", "gaps", "starter", "none"];

export const HELP_LABEL: Record<Help, string> = {
  script: "Script",
  gaps: "Gaps",
  starter: "Starter",
  none: "No help",
};

export type Segment = { text: string; hidden: boolean; full: string };

const STOP = new Set([
  "a", "an", "the", "i", "i'm", "i'll", "i've", "you", "you're", "it", "it's", "we", "we're", "he", "she", "they",
  "to", "of", "in", "on", "at", "for", "and", "or", "but", "is", "are", "was", "be", "my", "me", "your", "our",
  "this", "that", "so", "do", "can", "if", "with", "just", "all", "up", "no", "not", "yes", "okay",
]);

function bare(word: string) {
  return word
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "");
}

function mask(word: string): string {
  const match = /^([^A-Za-z0-9']*)([A-Za-z0-9'’]+)(.*)$/.exec(word);
  if (!match) return word;
  const [, lead, core, tail] = match;
  const letters = core!.length;
  return `${lead}${core![0]}${"_".repeat(Math.max(letters - 1, 1))}${tail}`;
}

function findPhrase(words: string[], phrase: string[]): number {
  if (phrase.length === 0) return -1;
  for (let i = 0; i + phrase.length <= words.length; i++) {
    if (phrase.every((item, offset) => words[i + offset] === item)) return i;
  }
  return -1;
}

/**
 * Hide the lesson phrase inside the model line. When the phrase does not appear
 * word for word, hide every other content word instead so there is still a gap.
 */
export function maskLine(line: string, phraseText: string): Segment[] {
  const raw = line.split(/\s+/).filter(Boolean);
  const words = raw.map(bare);
  const target = phraseText.split(/\s+/).map(bare).filter(Boolean);
  const hidden = new Set<number>();

  const at = findPhrase(words, target);
  if (at >= 0) {
    for (let i = 0; i < target.length; i++) hidden.add(at + i);
  } else {
    let seen = 0;
    words.forEach((word, index) => {
      if (word.length < 4 || STOP.has(word)) return;
      if (seen % 2 === 0) hidden.add(index);
      seen += 1;
    });
    if (hidden.size === 0 && raw.length > 0) hidden.add(raw.length - 1);
  }

  return raw.map((word, index) => ({
    text: hidden.has(index) ? mask(word) : word,
    hidden: hidden.has(index),
    full: word,
  }));
}

/** First couple of words, then a nudge. */
export function starterLine(line: string, count = 2): string {
  const words = line.split(/\s+/).filter(Boolean);
  if (words.length <= count) return `${(words[0] ?? "").slice(0, 1)}…`;
  return `${words.slice(0, count).join(" ")}…`;
}

/** Natural little reactions a listener makes before replying. Cycled, never random. */
const BACKCHANNEL = ["Okay.", "Right.", "I see.", "Got it.", "Mm-hm.", "Sure.", "Oh, nice.", "Ah, okay."];

export function backchannel(turnIndex: number): string {
  if (turnIndex <= 0) return "";
  return BACKCHANNEL[(turnIndex - 1) % BACKCHANNEL.length] ?? "";
}
