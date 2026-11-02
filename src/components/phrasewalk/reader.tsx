import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { parseStory, storyById } from "@/data/stories";
import { useProgress } from "@/lib/progress";

export function Reader({
  storyId,
  onBack,
  onPhrase,
  onPractice,
}: {
  storyId: string;
  onBack: () => void;
  onPhrase: (phraseId: string) => void;
  onPractice: () => void;
}) {
  const story = storyById(storyId);
  const { progress, markWalked } = useProgress();
  const [opened, setOpened] = useState<string[]>([]);
  const paragraphs = useMemo(() => (story ? parseStory(story) : []), [story]);

  if (!story) {
    return (
      <p className="text-muted">
        That scene wandered off.{" "}
        <button type="button" className="text-primary" onClick={onBack}>
          Back
        </button>
      </p>
    );
  }

  return (
    <article>
      <button type="button" onClick={onBack} className="press inline-flex min-h-11 items-center gap-1 text-sm font-medium text-muted">
        <ArrowLeft className="size-4" />
        Back
      </button>
      <p className="mt-3 text-sm font-medium text-primary">
        {story.category} · {story.topic}
      </p>
      <h1 className="mt-1 font-display text-4xl leading-tight">{story.title}</h1>
      <p className="mt-2 text-base text-muted">{story.scene}</p>
      <p className="mt-3 text-sm text-faint">
        {opened.length} of {story.phrases.length} lines opened
      </p>

      <div className="mt-6 font-display text-lg leading-relaxed">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-5">
            {paragraph.map((part, partIndex) =>
              part.type === "text" ? (
                <span key={partIndex}>{part.value}</span>
              ) : (
                <button
                  key={partIndex}
                  type="button"
                  className="line-mark"
                  data-known={progress.known.includes(part.id) ? "true" : "false"}
                  data-open={opened.includes(part.id) ? "true" : "false"}
                  onClick={() => {
                    setOpened((current) => (current.includes(part.id) ? current : [...current, part.id]));
                    onPhrase(part.id);
                  }}
                >
                  {part.label}
                </button>
              ),
            )}
          </p>
        ))}
      </div>

      <section className="rounded-3xl bg-surface p-5 shadow-border">
        <h2 className="font-display text-2xl">Lines you just met</h2>
        <ul className="mt-3 space-y-2">
          {story.phrases.map((phrase) => (
            <li key={phrase.id}>
              <button type="button" onClick={() => onPhrase(phrase.id)} className="press w-full rounded-2xl bg-bg px-4 py-3 text-left">
                <span className="block font-medium text-primary">{phrase.text}</span>
                <span className="mt-0.5 block text-sm text-muted">{phrase.meaning}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            markWalked(story.id);
            onPractice();
          }}
          className="press mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 font-medium text-primary-fg"
        >
          Say it out loud
          <ArrowRight className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            markWalked(story.id);
            onBack();
          }}
          className="press mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full text-sm font-medium text-muted"
        >
          That's enough for today
        </button>
      </section>
    </article>
  );
}
