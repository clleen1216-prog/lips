import { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
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

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return stories.filter((story) => {
      if (category !== "All" && story.category !== category) return false;
      if (!needle) return true;
      const hay = [story.title, story.topic, story.scene, story.category, ...story.phrases.map((phrase) => phrase.text)]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [category, query]);

  return (
    <div className="rise">
      <h1 className="font-display text-4xl leading-tight">Stories</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">
        {stories.length} scenes. Fab is the quality floor — intros, meetings, the tool, customers, interviews. The rest is ordinary life.
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
      <div className="mt-4 grid gap-3">
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
                  {story.category}
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
