import { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { levelNames, levelOf, type Level } from "@/data/levels";
import { categories, stories, type Category } from "@/data/stories";
import { useProgress } from "@/lib/progress";

export function Library({
  todayId,
  onRead,
}: {
  todayId: string | null;
  onRead: (storyId: string) => void;
}) {
  const { progress } = useProgress();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [level, setLevel] = useState<Level | 0>(0);
  const [status, setStatus] = useState<"all" | "new" | "walked">("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return stories.filter((story) => {
      if (category !== "All" && story.category !== category) return false;
      if (level !== 0 && levelOf(story.id) !== level) return false;
      const walkedBefore = progress.walked.includes(story.id);
      if (status === "new" && walkedBefore) return false;
      if (status === "walked" && !walkedBefore) return false;
      if (!needle) return true;
      const hay = [story.title, story.topic, story.scene, story.category, ...story.phrases.map((phrase) => phrase.text)]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [category, level, status, query, progress.walked]);

  return (
    <div className="rise">
      <h1 className="font-display text-4xl leading-tight">Stories</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">
        {stories.length} scenes. Fab is the quality floor: intros, meetings, the tool, audits, customers, email. The rest is ordinary life.
      </p>
      <label className="mt-5 flex min-h-12 items-center gap-2 rounded-full bg-surface px-4 shadow-border">
        <Search className="size-4 text-faint" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a line, a hold, a meeting"
          className="w-full bg-transparent py-3 text-base outline-none placeholder:text-faint"
          type="search"
        />
      </label>
      <div className="scroller -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
        {(["All", ...categories] as const).map((item) => {
          const active = item === category;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`press shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                active ? "bg-primary text-primary-fg" : "bg-surface text-fg shadow-border"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="scroller -mx-5 mt-2 flex gap-2 overflow-x-auto px-5" role="group" aria-label="Level">
        {([0, 1, 2, 3] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={level === item}
            onClick={() => setLevel(item)}
            className={`press shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
              level === item ? "bg-fg text-bg" : "bg-surface text-muted shadow-border"
            }`}
          >
            {item === 0 ? "Any level" : levelNames[item]}
          </button>
        ))}
        {(
          [
            ["all", "All"],
            ["new", "Not yet walked"],
            ["walked", "Walked"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={status === id}
            onClick={() => setStatus(id)}
            className={`press shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
              status === id ? "bg-fg text-bg" : "bg-surface text-muted shadow-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-faint" aria-live="polite">
        {visible.length} {visible.length === 1 ? "story" : "stories"}
      </p>
      <div className="mt-2 grid gap-3">
        {visible.length === 0 && <p className="py-8 text-center text-muted">Nothing under that name. Try “late”, “coffee”, or “no”.</p>}
        {visible.map((story) => {
          const walked = progress.walked.includes(story.id);
          const known = story.phrases.filter((phrase) => progress.known.includes(phrase.id)).length;
          return (
            <button
              key={story.id}
              type="button"
              onClick={() => onRead(story.id)}
              className="press rounded-3xl bg-surface p-4 text-left shadow-border"
            >
              <span className="flex items-center justify-between gap-3 text-sm text-primary">
                <span>
                  {story.category} · {levelNames[levelOf(story.id)]}
                  {story.id === todayId ? " · Today" : ""}
                </span>
                {walked && <Check className="size-4" aria-label="Walked" />}
              </span>
              <span className="mt-1 block font-display text-2xl leading-tight">{story.title}</span>
              <span className="mt-1 block text-sm leading-snug text-muted">{story.scene}</span>
              <span className="mt-3 block text-xs text-faint">
                {story.topic} · {story.phrases.length} lines
                {known > 0 ? ` · ${known} known` : ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
