import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { partnerOf, storyById, turnsFor } from "@/data/stories";
import { zhFor } from "@/data/zh";
import { useProgress } from "@/lib/progress";
import { Celebrate } from "./celebrate";

function norm(value: string) {
  return value
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[^a-z0-9' ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function usedPhrase(typed: string, phrase: string) {
  const text = norm(typed);
  const target = norm(phrase);
  return target.length > 0 && ` ${text} `.includes(` ${target} `);
}

export function Write({ storyId, onBack, onPhrase }: { storyId: string; onBack: () => void; onPhrase: (id: string) => void }) {
  const story = storyById(storyId);
  const turns = useMemo(() => (story ? turnsFor(story) : []), [story]);
  const { gradeReview, progress } = useProgress();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<{ id: string; ok: boolean }[]>([]);
  const [done, setDone] = useState(false);

  if (!story) return null;
  const turn = turns[index];
  const phrase = turn ? story.phrases.find((item) => item.id === turn.phraseId) : undefined;

  if (done || !turn || !phrase) {
    const good = results.filter((item) => item.ok).length;
    return (
      <div className="rise relative">
        {good === results.length && results.length > 0 && <Celebrate />}
        <p className="text-sm font-medium text-primary">{story.title}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight">
          {good} of {results.length}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          You wrote the lines instead of just reading them. Typing is slower than speaking, so it shows what you really know.
        </p>
        <ul className="mt-6 space-y-2">
          {results.map((item) => {
            const found = story.phrases.find((entry) => entry.id === item.id);
            if (!found) return null;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onPhrase(item.id)}
                  className="press flex w-full items-center justify-between gap-3 rounded-2xl bg-surface px-4 py-3 text-left shadow-border"
                >
                  <span className="font-medium">{found.text}</span>
                  <span className={`text-sm font-medium ${item.ok ? "text-primary" : "text-muted"}`}>
                    {item.ok ? "Used it" : "Again soon"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={onBack}
          className="press mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
        >
          Done
        </button>
      </div>
    );
  }

  const ok = checked && usedPhrase(typed, phrase.text);
  const zh = zhFor(phrase.id);

  const submit = () => {
    if (!typed.trim()) return;
    setChecked(true);
  };

  const advance = () => {
    const next = [...results, { id: phrase.id, ok: usedPhrase(typed, phrase.text) }];
    setResults(next);
    setTyped("");
    setChecked(false);
    if (index + 1 >= turns.length) {
      gradeReview(next);
      setDone(true);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <div>
      <button type="button" onClick={onBack} className="press inline-flex min-h-11 items-center gap-1 text-sm font-medium text-muted">
        <ArrowLeft className="size-4" />
        {story.title}
      </button>
      <p className="mt-3 text-sm text-muted">
        Write it · {index + 1} of {turns.length}
        {partnerOf(story) ? ` · with ${partnerOf(story)}` : ""}
      </p>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {turns.map((item, itemIndex) => (
          <span key={item.id} className={`h-1 flex-1 rounded-full ${itemIndex <= index ? "bg-primary" : "bg-line"}`} />
        ))}
      </div>

      {turn.partner && (
        <div className="mt-6 rounded-3xl rounded-bl-md bg-surface p-4 shadow-border">
          <p className="text-sm font-medium text-muted">{partnerOf(story) ?? "Them"}</p>
          <p className="mt-1 font-display text-xl leading-snug">{turn.partner}</p>
        </div>
      )}

      <p className="mt-6 text-sm font-medium text-primary">Your reply, in writing</p>
      <h1 className="mt-1 font-display text-3xl leading-tight">{turn.cue}</h1>

      <label className="sr-only" htmlFor="reply">
        Type your reply
      </label>
      <textarea
        id="reply"
        value={typed}
        disabled={checked}
        onChange={(event) => setTyped(event.target.value)}
        rows={3}
        placeholder="Type it the way you would send it"
        className="mt-4 w-full resize-none rounded-2xl bg-surface px-4 py-3 text-base shadow-border outline-none placeholder:text-faint focus-visible:ring-2 focus-visible:ring-primary"
      />

      {!checked ? (
        <div className="mt-3 grid gap-2">
          <button
            type="button"
            onClick={submit}
            disabled={!typed.trim()}
            className="press inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg disabled:opacity-40"
          >
            Check my reply
          </button>
          <button
            type="button"
            onClick={() => setChecked(true)}
            className="press inline-flex min-h-11 w-full items-center justify-center text-sm font-medium text-muted"
          >
            Show me a model reply
          </button>
        </div>
      ) : (
        <div className="rise mt-4 rounded-3xl bg-surface p-5 shadow-border">
          <p className="text-sm font-medium text-primary">
            {typed.trim()
              ? ok
                ? `You used “${phrase.text}”.`
                : `Try to work in “${phrase.text}”.`
              : "Here is one way to say it."}
          </p>
          <p className="mt-2 font-display text-2xl leading-snug">{turn.you}</p>
          {progress.settings.showZh && zh && <p className="mt-2 text-sm text-muted">{zh}</p>}
          <button
            type="button"
            onClick={advance}
            className="press mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
          >
            {index + 1 >= turns.length ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
