import type { Phrase, Story } from "@/data/stories";

export type QuizKind = "say" | "mean" | "blank" | "listen";

export type QuizQuestion = {
  id: string;
  phraseId: string;
  kind: QuizKind;
  prompt: string;
  /** Sentence with a gap, for blank questions. */
  sentence?: string;
  /** Text to speak, for listen questions. */
  audio?: string;
  options: string[];
  answer: string;
  reply: string;
};

export type PoolEntry = { phrase: Phrase; storyId: string };

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(items: T[], rnd: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const swap = copy[i];
    copy[i] = copy[j]!;
    copy[j] = swap!;
  }
  return copy;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Replace the phrase inside its model reply with a gap. Null when it does not appear. */
export function blankOut(reply: string, text: string): string | null {
  const re = new RegExp(escapeRegExp(text).replace(/'/g, "['’]"), "i");
  if (!re.test(reply)) return null;
  return reply.replace(re, "_____");
}

function pickDistractors(entry: PoolEntry, pool: PoolEntry[], key: "text" | "meaning", rnd: () => number) {
  const used = new Set<string>([entry.phrase[key]]);
  const same = shuffle(
    pool.filter((item) => item.storyId === entry.storyId && item.phrase.id !== entry.phrase.id),
    rnd,
  );
  const others = shuffle(
    pool.filter((item) => item.storyId !== entry.storyId),
    rnd,
  );
  const out: string[] = [];
  for (const item of [...same, ...others]) {
    const value = item.phrase[key];
    if (used.has(value)) continue;
    used.add(value);
    out.push(value);
    if (out.length === 3) break;
  }
  return out;
}

function make(kind: QuizKind, entry: PoolEntry, pool: PoolEntry[], rnd: () => number): QuizQuestion {
  const { phrase } = entry;
  const base = { id: `${phrase.id}-${kind}`, phraseId: phrase.id, reply: phrase.reply };
  if (kind === "mean") {
    const options = shuffle([phrase.meaning, ...pickDistractors(entry, pool, "meaning", rnd)], rnd);
    return { ...base, kind, prompt: `What does “${phrase.text}” mean here?`, answer: phrase.meaning, options };
  }
  const options = shuffle([phrase.text, ...pickDistractors(entry, pool, "text", rnd)], rnd);
  if (kind === "blank") {
    const sentence = blankOut(phrase.reply, phrase.text);
    if (sentence) {
      return { ...base, kind, prompt: "Which line fills the gap?", sentence, answer: phrase.text, options };
    }
  }
  if (kind === "listen") {
    return {
      ...base,
      kind,
      prompt: "Listen. Which line did you hear?",
      audio: phrase.reply,
      answer: phrase.text,
      options,
    };
  }
  return { ...base, kind: "say", prompt: phrase.prompt, answer: phrase.text, options };
}

export type QuizOptions = {
  /** Include listening questions (needs speech synthesis in the browser). */
  listen: boolean;
  max?: number;
  seed?: string;
};

function kindsFor(opts: QuizOptions): QuizKind[] {
  return opts.listen ? ["say", "blank", "listen", "mean"] : ["say", "blank", "mean"];
}

/** Build a round for any set of phrases. The pool supplies wrong answers. */
export function buildRound(entries: PoolEntry[], pool: PoolEntry[], opts: QuizOptions): QuizQuestion[] {
  const rnd = mulberry32(hash(opts.seed ?? entries.map((item) => item.phrase.id).join("|")));
  const kinds = kindsFor(opts);
  const chosen = shuffle(entries, rnd).slice(0, opts.max ?? 6);
  const offset = Math.floor(rnd() * kinds.length);
  const questions = chosen.map((entry, index) => make(kinds[(index + offset) % kinds.length]!, entry, pool, rnd));
  return shuffle(questions, rnd);
}

export function buildQuiz(story: Story, opts: QuizOptions): QuizQuestion[] {
  const pool = story.phrases.map((phrase) => ({ phrase, storyId: story.id }));
  return buildRound(pool, pool, { ...opts, max: opts.max ?? 6, seed: opts.seed ?? story.id });
}

/** Retry a missed question in a different shape so it is not just memorised by position. */
export function retryQuestion(question: QuizQuestion, entry: PoolEntry, pool: PoolEntry[], listen: boolean, seed: string) {
  const rnd = mulberry32(hash(`${seed}:${question.id}`));
  const kinds = kindsFor({ listen }).filter((kind) => kind !== question.kind);
  return make(kinds[Math.floor(rnd() * kinds.length)]!, entry, pool, rnd);
}

export function scoreLine(score: number, total: number) {
  if (total === 0) return "";
  if (score === total) return "You'd sound like you've lived there.";
  if (score >= total - 1) return "Very close to how people actually talk.";
  if (score >= Math.ceil(total / 2)) return "The scene stuck. A few lines still want another walk.";
  return "Read it like a conversation, then try once more. That's the whole method.";
}
