import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Mic, Volume2 } from "lucide-react";
import { findPhrase, storyById, turnsFor } from "@/data/stories";
import { zhFor } from "@/data/zh";
import { useProgress } from "@/lib/progress";
import { canListen, canSpeak, listen, saidIt, speak, stopSpeaking } from "@/lib/speech";
import { Celebrate } from "./celebrate";

type Outcome = { id: string; ok: boolean };

export function Practice({
  storyId,
  onBack,
  onRead,
  onPocket,
  onCheck,
}: {
  storyId: string;
  onBack: () => void;
  onRead: () => void;
  onPocket: (phraseId: string) => void;
  onCheck: (phraseIds: string[]) => void;
}) {
  const story = storyById(storyId);
  const turns = useMemo(() => (story ? turnsFor(story) : []), [story]);
  const [index, setIndex] = useState(0);
  const [showLine, setShowLine] = useState(false);
  const [heard, setHeard] = useState("");
  const [listening, setListening] = useState(false);
  const [hit, setHit] = useState<boolean | null>(null);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [done, setDone] = useState(false);
  const [micOk, setMicOk] = useState(false);
  const [micChecked, setMicChecked] = useState(false);
  const { markWalked, togglePocket, progress, gradeReview, seedReview } = useProgress();

  const turn = turns[index];

  useEffect(() => {
    setMicOk(canListen());
    setMicChecked(true);
  }, []);

  useEffect(() => {
    if (!turn?.partner) return;
    const timer = window.setTimeout(() => speak(turn.partner), 280);
    return () => {
      window.clearTimeout(timer);
      stopSpeaking();
    };
  }, [turn]);

  if (!story) return null;

  const hits = outcomes.filter((item) => item.ok).length;

  if (done || !turn) {
    return (
      <Result
        title={story.title}
        hits={hits}
        total={turns.length}
        usedMic={micOk}
        missed={outcomes.filter((item) => !item.ok).map((item) => item.id)}
        phraseIds={turns.map((item) => item.phraseId)}
        onAgain={() => {
          setIndex(0);
          setShowLine(false);
          setHeard("");
          setHit(null);
          setOutcomes([]);
          setDone(false);
        }}
        onRead={onRead}
        onBack={onBack}
        onPocket={onPocket}
        onCheck={onCheck}
        saved={progress.pocket}
        togglePocket={togglePocket}
      />
    );
  }

  const reveal = (matched: boolean | null) => {
    setShowLine(true);
    setListening(false);
    setHit(matched);
  };

  const startMic = () => {
    setHeard("");
    setHit(null);
    setListening(true);
    const handle = listen(
      (text) => setHeard(text),
      () => setListening(false),
    );
    if (!handle) {
      setListening(false);
      setMicOk(false);
      return;
    }
    window.setTimeout(() => {
      handle.stop();
    }, 7000);
  };

  const checkSpoken = () => {
    const phrase = story.phrases.find((item) => item.id === turn.phraseId);
    reveal(saidIt(heard, phrase?.text ?? turn.you));
  };

  const advance = (ok: boolean) => {
    stopSpeaking();
    const next = [...outcomes, { id: turn.phraseId, ok }];
    setOutcomes(next);
    if (index + 1 >= turns.length) {
      markWalked(story.id);
      seedReview(turns.map((item) => item.phraseId));
      gradeReview(next);
      setDone(true);
    } else {
      setIndex((value) => value + 1);
      setShowLine(false);
      setHeard("");
      setHit(null);
      setListening(false);
    }
  };

  const zh = zhFor(turn.phraseId);

  return (
    <div>
      <button type="button" onClick={onBack} className="press inline-flex min-h-11 items-center gap-1 text-sm font-medium text-muted">
        <ArrowLeft className="size-4" />
        {story.title}
      </button>
      <p className="mt-4 text-sm text-muted">
        Speak it · {index + 1} of {turns.length}
        {story.partner ? ` · with ${story.partner}` : ""}
      </p>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {turns.map((item, itemIndex) => (
          <span key={item.id} className={`h-1 flex-1 rounded-full ${itemIndex <= index ? "bg-primary" : "bg-line"}`} />
        ))}
      </div>

      {turn.partner ? (
        <div className="mt-6 rounded-3xl bg-surface p-5 shadow-border">
          <p className="text-sm font-medium text-muted">{story.partner ?? "Them"}</p>
          <p className="mt-2 font-display text-2xl leading-snug">{turn.partner}</p>
          {canSpeak() && (
            <button
              type="button"
              onClick={() => speak(turn.partner)}
              className="press mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-primary"
            >
              <Volume2 className="size-4" />
              Hear them again
            </button>
          )}
        </div>
      ) : null}

      <p className="mt-6 text-sm font-medium text-primary">Your turn</p>
      <h1 className="mt-1 font-display text-3xl leading-tight">{turn.cue}</h1>

      {!showLine && (
        <div className="mt-5 grid gap-3">
          {micOk && (
            <>
              <button
                type="button"
                onClick={listening ? undefined : startMic}
                className="press inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-base font-medium text-primary-fg"
              >
                <Mic className="size-5" />
                {listening ? "Listening…" : "Say your line"}
              </button>
              {heard && <p className="rounded-2xl bg-wash px-4 py-3 text-base leading-snug text-fg">“{heard}”</p>}
              {heard && !listening && (
                <button
                  type="button"
                  onClick={checkSpoken}
                  className="press inline-flex min-h-12 w-full items-center justify-center rounded-full bg-surface font-medium shadow-border"
                >
                  Use what I said
                </button>
              )}
            </>
          )}
          {micChecked && !micOk && (
            <p className="rounded-2xl bg-wash px-4 py-3 text-sm leading-snug text-fg">
              This browser can't listen, so you will check yourself. Say your line out loud first, then peek.
            </p>
          )}
          <button
            type="button"
            onClick={() => reveal(null)}
            className="press inline-flex min-h-12 w-full items-center justify-center rounded-full bg-surface text-sm font-medium text-fg shadow-border"
          >
            {micOk ? "Show me the line" : "I said it. Show me the line"}
          </button>
        </div>
      )}

      {showLine && (
        <div className="rise mt-5 rounded-3xl bg-surface p-5 shadow-border">
          <p className="text-sm font-medium text-primary">
            {hit === true ? "They'd follow you." : hit === false ? "Close. This is the shape people use." : "Say it like this."}
          </p>
          <p className="mt-2 font-display text-2xl leading-snug">{turn.you}</p>
          {progress.settings.showZh && zh && <p className="mt-2 text-sm text-muted">{zh}</p>}
          {canSpeak() && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => speak(turn.you)}
                className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-wash px-4 text-sm font-medium text-primary"
              >
                <Volume2 className="size-4" />
                Hear it
              </button>
              <button
                type="button"
                onClick={() => speak(turn.you, 0.78)}
                className="press inline-flex min-h-11 items-center rounded-full bg-wash px-4 text-sm font-medium text-primary"
              >
                Slower
              </button>
            </div>
          )}
          {micOk ? (
            <button
              type="button"
              onClick={() => advance(hit !== false)}
              className="press mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
            >
              {index + 1 >= turns.length ? "Finish the conversation" : "I said it"}
            </button>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => advance(true)}
                className="press inline-flex min-h-12 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-fg"
              >
                Nailed it
              </button>
              <button
                type="button"
                onClick={() => advance(false)}
                className="press inline-flex min-h-12 items-center justify-center rounded-full bg-bg text-sm font-medium text-fg"
              >
                Still shaky
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Result({
  title,
  hits,
  total,
  usedMic,
  missed,
  onAgain,
  onRead,
  onBack,
  onPocket,
  onCheck,
  saved,
  togglePocket,
  phraseIds,
}: {
  title: string;
  hits: number;
  total: number;
  usedMic: boolean;
  missed: string[];
  phraseIds: string[];
  onAgain: () => void;
  onRead: () => void;
  onBack: () => void;
  onPocket: (id: string) => void;
  onCheck: (ids: string[]) => void;
  saved: string[];
  togglePocket: (id: string) => void;
}) {
  const perfect = hits === total;
  const line = perfect
    ? usedMic
      ? "You'd survive that room."
      : "Every line felt solid. Say them once more tomorrow. They get shorter in your mouth."
    : `${hits} of ${total} felt solid. You still said the rest out loud. That's the method. The shaky ones will come back in your review.`;

  return (
    <div className="rise relative">
      {perfect && <Celebrate />}
      <p className="text-sm font-medium text-primary">{title}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight">
        {hits} of {total}
      </h1>
      <p className="mt-3 text-lg leading-relaxed text-muted">{line}</p>
      {missed.length > 0 && (
        <button
          type="button"
          onClick={() => onCheck(missed)}
          className="press mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
        >
          Check the {missed.length} shaky {missed.length === 1 ? "line" : "lines"}
        </button>
      )}
      <ul className="mt-6 space-y-2">
        {phraseIds.map((id) => {
          const found = findPhrase(id);
          if (!found) return null;
          const shaky = missed.includes(id);
          return (
            <li key={id} className="rounded-2xl bg-surface p-4 shadow-border">
              <button type="button" onClick={() => onPocket(id)} className="text-left">
                <span className="block font-medium text-primary">
                  {found.phrase.text}
                  {shaky && <span className="ml-2 text-xs font-medium text-muted">shaky</span>}
                </span>
                <span className="mt-1 block text-sm text-muted">{found.phrase.reply}</span>
              </button>
              <button type="button" onClick={() => togglePocket(id)} className="press mt-3 text-sm font-medium text-fg">
                {saved.includes(id) ? "In your pocket" : "Pocket this line"}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={onAgain}
        className={`press mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full font-medium ${
          missed.length > 0 ? "bg-surface text-fg shadow-border" : "bg-primary text-primary-fg"
        }`}
      >
        Speak it again
      </button>
      <button
        type="button"
        onClick={onRead}
        className="press mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full text-sm font-medium text-fg"
      >
        Read the scene again
      </button>
      <button type="button" onClick={onBack} className="press mt-1 inline-flex min-h-11 w-full items-center justify-center text-sm text-muted">
        Back to today
      </button>
    </div>
  );
}
