import type { Phrase, Story } from "@/data/stories";

export type QuizQuestion = {
  id: string;
  phraseId: string;
  kind: "say" | "mean";
  prompt: string;
  options: string[];
  answer: string;
  reply: string;
};

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rnd: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const swap = copy[i];
    copy[i] = copy[j]!;
    copy[j] = swap!;
  }
  return copy;
}

function distractors(pool: Phrase[], current: Phrase, take: number, rnd: () => number) {
  return shuffle(
    pool.filter((phrase) => phrase.id !== current.id),
    rnd,
  ).slice(0, take);
}

export function buildQuiz(story: Story): QuizQuestion[] {
  const rnd = mulberry32(hash(story.id));
  const say = story.phrases.map((phrase) => {
    const others = distractors(story.phrases, phrase, 3, rnd);
    return {
      id: `${phrase.id}-say`,
      phraseId: phrase.id,
      kind: "say" as const,
      prompt: phrase.prompt,
      answer: phrase.text,
      reply: phrase.reply,
      options: shuffle([phrase.text, ...others.map((item) => item.text)], rnd),
    };
  });
  const mean = story.phrases.map((phrase) => {
    const others = distractors(story.phrases, phrase, 3, rnd);
    return {
      id: `${phrase.id}-mean`,
      phraseId: phrase.id,
      kind: "mean" as const,
      prompt: `What does “${phrase.text}” mean here?`,
      answer: phrase.meaning,
      reply: phrase.reply,
      options: shuffle([phrase.meaning, ...others.map((item) => item.meaning)], rnd),
    };
  });
  const said = shuffle(say, rnd).slice(0, 3);
  const meant = shuffle(mean, rnd).slice(0, 2);
  return shuffle([...said, ...meant], rnd);
}

export function scoreLine(score: number, total: number) {
  if (score === total) return "You'd sound like you've lived there.";
  if (score === total - 1) return "Very close to how people actually talk.";
  if (score >= Math.ceil(total / 2)) return "The scene stuck. A few lines still want another walk.";
  return "Read it like a conversation, then try once more. That's the whole method.";
}
