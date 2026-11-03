import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, Volume2, X } from "lucide-react";
import { stories } from "@/data/stories";
import { zhFor } from "@/data/zh";
import { useProgress } from "@/lib/progress";
import {
  buildRound,
  retryQuestion,
  scoreLine,
  type PoolEntry,
  type QuizQuestion,
} from "@/lib/quiz";
import { canSpeak, speak, stopSpeaking } from "@/lib/speech";
import { Celebrate } from "./celebrate";

let poolCache: PoolEntry[] | null = null;
function allPool(): PoolEntry[] {
  if (!poolCache) {
    poolCache = stories.flatMap((story) => story.phrases.map((phrase) => ({ phrase, storyId: story.id })));
  }
  return poolCache;
}

type Stage = "asking" | "retry-offer" | "done";

export function Check({
  title,
  phraseIds,
  review = false,
  onClose,
  onOpenPhrase,
}: {
  title: string;
  phraseIds: string[];
  /** True for the daily review round: it also counts as today's review. */
  review?: boolean;
  onClose: () => void;
  onOpenPhrase?: (phraseId: string) => void;
}) {
  const { gradeReview, finishReviewSession, progress } = useProgress();
  const hear = useMemo(() => canSpeak(), []);
  const seed = useMemo(() => `${title}:${Date.now()}`, [title]);
  const pool = useMemo(allPool, []);
  const entries = useMemo(() => {
    const wanted = new Set(phraseIds);
    return pool.filter((item) => wanted.has(item.phrase.id));
  }, [pool, phraseIds]);

  const [round, setRound] = useState<QuizQuestion[]>(() =>
    buildRound(entries, pool, { listen: hear, max: review ? 8 : 6, seed }),
  );
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("asking");
  const [firstTry, setFirstTry] = useState<Record<string, boolean>>({});
  const [missedNow, setMissedNow] = useState<string[]>([]);
  const [retrying, setRetrying] = useState(false);
  const graded = useRef(false);

  const question = round[index];

  useEffect(() => {
    if (stage !== "asking" || !question || question.kind !== "listen" || !question.audio) return;
    const timer = window.setTimeout(() => speak(question.audio ?? ""), 300);
    return () => {
      window.clearTimeout(timer);
      stopSpeaking();
    };
  }, [question, stage]);

  const finish = (results: Record<string, boolean>) => {
    if (graded.current) return;
    graded.current = true;
    gradeReview(Object.entries(results).map(([id, ok]) => ({ id, ok })));
    if (review) finishReviewSession();
  };

  const answer = (option: string) => {
    if (!question || picked) return;
    const ok = option === question.answer;
    setPicked(option);
    if (!retrying) setFirstTry((current) => ({ ...current, [question.phraseId]: ok }));
    if (!ok) setMissedNow((current) => (current.includes(question.phraseId) ? current : [...current, question.phraseId]));
  };

  const next = () => {
    stopSpeaking();
    setPicked(null);
    if (index + 1 < round.length) {
      setIndex(index + 1);
      return;
    }
    if (!retrying && missedNow.length > 0) setStage("retry-offer");
    else {
      finish(firstTry);
      setStage("done");
    }
  };

  const startRetry = () => {
    const byId = new Map(entries.map((item) => [item.phrase.id, item]));
    const again = round
      .filter((item) => missedNow.includes(item.phraseId))
      .map((item) => {
        const entry = byId.get(item.phraseId);
        return entry ? retryQuestion(item, entry, pool, hear, seed) : item;
      });
    setRetrying(true);
    setRound(again);
    setIndex(0);
    setPicked(null);
    setStage("asking");
  };

  const skipRetry = () => {
    finish(firstTry);
    setStage("done");
  };

  const total = Object.keys(firstTry).length;
  const score = Object.values(firstTry).filter(Boolean).length;

  if (entries.length === 0) {
    return (
      <div>
        <p className="text-muted">Nothing to check yet. Walk a scene first.</p>
        <button type="button" onClick={onClose} className="press mt-3 text-sm font-medium text-primary">
          Back
        </button>
      </div>
    );
  }

  if (stage === "retry-offer") {
    return (
      <div className="rise">
        <p className="text-sm font-medium text-primary">{title}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight">
          {missedNow.length} to try again
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          Missing a line is how it sticks. Here they come once more, asked a different way.
        </p>
        <button
          type="button"
          onClick={startRetry}
          className="press mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
        >
          Try them again
        </button>
        <button type="button" onClick={skipRetry} className="press mt-2 inline-flex min-h-11 w-full items-center justify-center text-sm text-muted">
          Skip for now
        </button>
      </div>
    );
  }

  if (stage === "done") {
    const wrong = Object.entries(firstTry)
      .filter(([, ok]) => !ok)
      .map(([id]) => id);
    return (
      <div className="rise relative">
        {score === total && total > 0 && <Celebrate />}
        <p className="text-sm font-medium text-primary">{title}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight">
          {score} of {total}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{scoreLine(score, total)}</p>
        {wrong.length > 0 && (
          <>
            <h2 className="mt-6 font-display text-xl">Coming back soon</h2>
            <ul className="mt-2 space-y-2">
              {wrong.map((id) => {
                const entry = entries.find((item) => item.phrase.id === id);
                if (!entry) return null;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => onOpenPhrase?.(id)}
                      className="press w-full rounded-2xl bg-surface px-4 py-3 text-left shadow-border"
                    >
                      <span className="block font-medium text-primary">{entry.phrase.text}</span>
                      <span className="mt-0.5 block text-sm text-muted">{entry.phrase.meaning}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <p className="mt-6 text-sm text-faint">
          {Object.keys(progress.review).length} lines in your review schedule.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="press mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
        >
          Done
        </button>
      </div>
    );
  }

  if (!question) return null;
  const correct = picked === question.answer;
  const zh = zhFor(question.phraseId);

  return (
    <div>
      <button type="button" onClick={onClose} className="press inline-flex min-h-11 items-center gap-1 text-sm font-medium text-muted">
        <ArrowLeft className="size-4" />
        {title}
      </button>
      <p className="mt-3 text-sm text-muted">
        {retrying ? "Second look" : review ? "Review" : "Check yourself"} · {index + 1} of {round.length}
      </p>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {round.map((item, itemIndex) => (
          <span key={item.id} className={`h-1 flex-1 rounded-full ${itemIndex <= index ? "bg-primary" : "bg-line"}`} />
        ))}
      </div>

      <h1 className="mt-6 font-display text-3xl leading-tight">{question.prompt}</h1>
      {question.sentence && (
        <p className="mt-3 rounded-2xl bg-wash px-4 py-3 font-display text-xl leading-snug">{question.sentence}</p>
      )}
      {question.kind === "listen" && question.audio && (
        <button
          type="button"
          onClick={() => speak(question.audio ?? "")}
          className="press mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-wash px-5 text-sm font-medium text-primary"
        >
          <Volume2 className="size-4" />
          Play again
        </button>
      )}

      <div className="mt-5 grid gap-2" role="group" aria-label="Answers">
        {question.options.map((option) => {
          const chosen = picked === option;
          const isAnswer = option === question.answer;
          const state = picked ? (isAnswer ? "right" : chosen ? "wrong" : "idle") : "idle";
          return (
            <button
              key={option}
              type="button"
              disabled={Boolean(picked)}
              onClick={() => answer(option)}
              className={`press flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-base shadow-border ${
                state === "right"
                  ? "bg-primary text-primary-fg"
                  : state === "wrong"
                    ? "bg-wash text-fg ring-2 ring-primary"
                    : "bg-surface text-fg"
              }`}
            >
              <span>{option}</span>
              {state === "right" && <Check className="size-5 shrink-0" aria-label="Correct" />}
              {state === "wrong" && <X className="size-5 shrink-0 text-primary" aria-label="Not this one" />}
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="rise mt-5 rounded-3xl bg-surface p-5 shadow-border">
          <p className="text-sm font-medium text-primary">{correct ? "That's it." : "Not quite. This is the line."}</p>
          <p className="mt-2 font-display text-2xl leading-snug">{question.reply}</p>
          {progress.settings.showZh && zh && <p className="mt-2 text-sm text-muted">{zh}</p>}
          {hear && (
            <button
              type="button"
              onClick={() => speak(question.reply)}
              className="press mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-wash px-4 text-sm font-medium text-primary"
            >
              <Volume2 className="size-4" />
              Hear it
            </button>
          )}
          <button
            type="button"
            onClick={next}
            className="press mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
          >
            {index + 1 >= round.length ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
