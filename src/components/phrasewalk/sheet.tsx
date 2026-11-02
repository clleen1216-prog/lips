import { useEffect, useState } from "react";
import { Bookmark, Check, Volume2, X } from "lucide-react";
import type { Phrase, Story } from "@/data/stories";
import { useProgress } from "@/lib/progress";
import { canSpeak, speak } from "@/lib/speech";

export function PhraseSheet({
  phrase,
  story,
  onClose,
}: {
  phrase: Phrase;
  story: Story;
  onClose: () => void;
}) {
  const { progress, togglePocket, toggleKnown } = useProgress();
  const saved = progress.pocket.includes(phrase.id);
  const known = progress.known.includes(phrase.id);
  const [hear, setHear] = useState(false);

  useEffect(() => {
    setHear(canSpeak());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button type="button" className="absolute inset-0 bg-fg/40" aria-label="Close" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="phrase-title"
        className="sheet-in relative z-10 w-full max-w-lg rounded-t-3xl bg-surface px-5 pt-4 pb-6 shadow-pop nav-pad"
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />
        <div className="mb-3 flex items-start justify-between gap-3">
          <p className="text-sm text-muted">{story.title}</p>
          <button
            type="button"
            onClick={onClose}
            className="press grid size-11 place-items-center rounded-full text-muted"
            aria-label="Close phrase"
          >
            <X className="size-5" />
          </button>
        </div>
        <h2 id="phrase-title" className="font-display text-3xl leading-tight text-fg">
          {phrase.text}
        </h2>
        <p className="mt-3 text-lg leading-snug text-fg">{phrase.meaning}</p>
        <p className="mt-5 text-sm font-medium text-primary">You'd reach for it when</p>
        <p className="mt-1 text-base leading-snug text-muted">{phrase.prompt.replace(/:$/, "")}</p>
        <blockquote className="mt-4 border-l-2 border-primary pl-4 font-display text-xl leading-snug text-fg">
          {phrase.reply}
        </blockquote>
        {hear && (
          <button
            type="button"
            onClick={() => speak(phrase.reply)}
            className="press mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-wash px-4 text-sm font-medium text-primary"
          >
            <Volume2 className="size-4" />
            Hear it
          </button>
        )}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => togglePocket(phrase.id)}
            className="press inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-surface px-3 text-sm font-medium text-fg shadow-border"
          >
            <Bookmark className={`size-4 ${saved ? "fill-primary text-primary" : ""}`} />
            {saved ? "In pocket" : "Pocket it"}
          </button>
          <button
            type="button"
            onClick={() => toggleKnown(phrase.id)}
            className={`press inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium ${
              known ? "bg-primary text-primary-fg" : "bg-surface text-fg shadow-border"
            }`}
          >
            <Check className="size-4" />
            {known ? "I know this" : "Got it"}
          </button>
        </div>
      </div>
    </div>
  );
}
