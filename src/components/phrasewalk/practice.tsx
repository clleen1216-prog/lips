import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Mic, Volume2 } from "lucide-react";
import { findPhrase, storyById, turnsFor } from "@/data/stories";
import { useProgress } from "@/lib/progress";
import { canListen, canSpeak, listen, saidIt, speak, stopSpeaking } from "@/lib/speech";

export function Practice({
  storyId,
  onBack,
  onRead,
  onPocket,
}: {
  storyId: string;
  onBack: () => void;
  onRead: () => void;
  onPocket: (phraseId: string) => void;
}) {
  const story = storyById(storyId);
  const turns = useMemo(() => (story ? turnsFor(story) : []), [story]);
  const [index, setIndex] = useState(0);
  const [showLine, setShowLine] = useState(false);
  const [heard, setHeard] = useState("");
  const [listening, setListening] = useState(false);
  const [hit, setHit] = useState<boolean | null>(null);
  const [hits, setHits] = useState(0);
  const [done, setDone] = useState(false);
  const [micOk, setMicOk] = useState(false);
  const { markWalked, togglePocket, progress } = useProgress();

  const turn = turns[index];

  useEffect(() => {
    setMicOk(canListen());
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

  if (done || !turn) {
    return (
      <Result
        title={story.title}
        hits={hits}
        total={turns.length}
        usedMic={micOk}
        missed={turns.filter((_, i) => i < hits).length === turns.length ? [] : []}
        phraseIds={turns.map((item) => item.phraseId)}
        hitCount={hits}
        onAgain={() => {
          setIndex(0);
          setShowLine(false);
          setHeard("");
          setHit(null);
          setHits(0);
          setDone(false);
        }}
        onRead={onRead}
        onBack={onBack}
        onPocket={onPocket}
        saved={progress.pocket}
        togglePocket={togglePocket}
      />
    );
  }

  const reveal = (matched: boolean | null) => {
    setShowLine(true);
    setListening(false);
    if (matched) setHits((value) => value + 1);
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
    const matched = saidIt(heard, phrase?.text ?? turn.you);
    reveal(matched);
  };

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
          <button
            type="button"
            onClick={() => reveal(null)}
            className="press inline-flex min-h-12 w-full items-center justify-center rounded-full bg-surface text-sm font-medium text-fg shadow-border"
          >
            Show me the line
          </button>
        </div>
      )}

      {showLine && (
        <div className="rise mt-5 rounded-3xl bg-surface p-5 shadow-border">
          <p className="text-sm font-medium text-primary">
            {hit === true ? "They'd follow you." : hit === false ? "Close. This is the shape people use." : "Say it like this."}
          </p>
          <p className="mt-2 font-display text-2xl leading-snug">{turn.you}</p>
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
          <button
            type="button"
            onClick={() => {
              stopSpeaking();
              if (index + 1 >= turns.length) {
                markWalked(story.id);
                setDone(true);
              } else {
                setIndex((value) => value + 1);
                setShowLine(false);
                setHeard("");
                setHit(null);
                setListening(false);
              }
            }}
            className="press mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
          >
            {index + 1 >= turns.length ? "Finish the conversation" : "I said it"}
          </button>
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
  onAgain,
  onRead,
  onBack,
  onPocket,
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
  hitCount: number;
  onAgain: () => void;
  onRead: () => void;
  onBack: () => void;
  onPocket: (id: string) => void;
  saved: string[];
  togglePocket: (id: string) => void;
}) {
  const line = !usedMic
    ? "You shadowed the whole conversation. Say it once more tomorrow — it gets shorter in your mouth."
    : hits === total
      ? "You'd survive that room."
      : `${hits} of ${total} landed on the first try. You still said the rest out loud. That's the method.`;

  return (
    <div className="rise">
      <p className="text-sm font-medium text-primary">{title}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight">{usedMic ? `${hits} of ${total}` : "Spoken"}</h1>
      <p className="mt-3 text-lg leading-relaxed text-muted">{line}</p>
      <ul className="mt-6 space-y-2">
        {phraseIds.map((id) => {
          const found = findPhrase(id);
          if (!found) return null;
          return (
            <li key={id} className="rounded-2xl bg-surface p-4 shadow-border">
              <button type="button" onClick={() => onPocket(id)} className="text-left">
                <span className="block font-medium text-primary">{found.phrase.text}</span>
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
        className="press mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
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
