import { useMemo, useState } from "react";
import { Volume2 } from "lucide-react";
import { findPhrase } from "@/data/stories";
import { zhFor } from "@/data/zh";
import { useProgress } from "@/lib/progress";
import { canSpeak, speak } from "@/lib/speech";

export function Pocket({
  onOpen,
  onStory,
}: {
  onOpen: (phraseId: string) => void;
  onStory: (storyId: string) => void;
}) {
  const { progress, ready } = useProgress();
  const [tab, setTab] = useState<"saved" | "known">("saved");
  const [review, setReview] = useState(false);
  const ids = tab === "saved" ? progress.pocket : progress.known;
  const lines = useMemo(() => ids.map((id) => findPhrase(id)).filter((item) => item !== undefined), [ids]);

  return (
    <div className="rise">
      <h1 className="font-display text-4xl leading-tight">Pocket</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">
        Lines you chose to keep. They stay on this phone — no account, no cloud.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-surface p-1 shadow-border">
        {(
          [
            ["saved", "Saved"],
            ["known", "I know these"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setTab(id);
              setReview(false);
            }}
            className={`press min-h-11 rounded-full text-sm font-medium ${tab === id ? "bg-primary text-primary-fg" : "text-muted"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {!ready ? (
        <div className="mt-6 h-40 rounded-3xl bg-surface shadow-border" />
      ) : lines.length === 0 ? (
        <div className="mt-6 rounded-3xl bg-surface p-5 shadow-border">
          <h2 className="font-display text-2xl">{tab === "saved" ? "Your pocket is empty" : "Nothing marked yet"}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {tab === "saved"
              ? "Walk a scene and tap Pocket it on any line. You'll meet the phrase inside a life first — not on a list."
              : "When a line feels like yours, mark Got it. It lands here so you can see what has stuck."}
          </p>
          <button type="button" onClick={() => onStory("")} className="press mt-4 text-sm font-medium text-primary">
            Go to today's walk
          </button>
        </div>
      ) : review ? (
        <Review lines={lines} onClose={() => setReview(false)} onOpen={onOpen} />
      ) : (
        <>
          <button
            type="button"
            onClick={() => setReview(true)}
            className="press mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary font-medium text-primary-fg"
          >
            Review {lines.length} {lines.length === 1 ? "line" : "lines"}
          </button>
          <ul className="mt-4 space-y-2">
            {lines.map((item) => (
              <li key={item.phrase.id}>
                <button
                  type="button"
                  onClick={() => onOpen(item.phrase.id)}
                  className="press w-full rounded-2xl bg-surface px-4 py-3 text-left shadow-border"
                >
                  <span className="block font-medium">{item.phrase.text}</span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {item.phrase.meaning} · {item.story.title}
                  </span>
                  {progress.settings.showZh && zhFor(item.phrase.id) && (
                    <span className="mt-0.5 block text-sm text-primary">{zhFor(item.phrase.id)}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Review({
  lines,
  onClose,
  onOpen,
}: {
  lines: NonNullable<ReturnType<typeof findPhrase>>[];
  onClose: () => void;
  onOpen: (id: string) => void;
}) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const item = lines[index % lines.length];
  if (!item) return null;
  const hear = canSpeak();

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => {
          setShow((value) => !value);
        }}
        className="w-full rounded-3xl bg-surface p-6 text-left shadow-border"
      >
        <p className="text-sm text-primary">
          {item.story.title} · {index + 1} of {lines.length}
        </p>
        {show ? (
          <>
            <p className="mt-4 font-display text-4xl leading-tight">{item.phrase.text}</p>
            <p className="mt-3 text-base text-muted">{item.phrase.meaning}</p>
            {zhFor(item.phrase.id) && <p className="mt-1 text-base text-primary">{zhFor(item.phrase.id)}</p>}
            <p className="mt-4 font-display text-xl leading-snug">{item.phrase.reply}</p>
          </>
        ) : (
          <>
            <p className="mt-4 font-display text-2xl leading-snug">{item.phrase.prompt}</p>
            <p className="mt-6 text-sm text-faint">Tap the card to reveal the line.</p>
          </>
        )}
      </button>
      <div className="mt-3 flex flex-wrap gap-2">
        {show && hear && (
          <button
            type="button"
            onClick={() => speak(item.phrase.reply)}
            className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-wash px-4 text-sm font-medium text-primary"
          >
            <Volume2 className="size-4" />
            Hear it
          </button>
        )}
        <button
          type="button"
          onClick={() => onOpen(item.phrase.id)}
          className="press inline-flex min-h-11 items-center rounded-full bg-surface px-4 text-sm font-medium shadow-border"
        >
          Open
        </button>
        <button
          type="button"
          onClick={() => {
            setShow(false);
            setIndex((value) => (value + 1) % lines.length);
          }}
          className="press inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-fg"
        >
          Next
        </button>
        <button type="button" onClick={onClose} className="press inline-flex min-h-11 items-center px-3 text-sm text-muted">
          Close review
        </button>
      </div>
    </div>
  );
}
