import { useMemo, useState } from "react";
import { Search, Volume2 } from "lucide-react";
import { glossary } from "@/data/glossary";
import { useProgress } from "@/lib/progress";
import { canSpeak, speak } from "@/lib/speech";

export function Words() {
  const { progress } = useProgress();
  const [query, setQuery] = useState("");
  const hear = canSpeak();

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return glossary;
    return glossary.filter((item) => [item.term, item.zh, item.plain, item.say].join(" ").toLowerCase().includes(needle));
  }, [query]);

  return (
    <div className="rise">
      <h1 className="font-display text-4xl leading-tight">Fab words</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">
        {glossary.length} terms you will hear on the floor, with a plain meaning and a line to say.
      </p>
      <label className="mt-5 flex min-h-12 items-center gap-2 rounded-full bg-surface px-4 shadow-border">
        <Search className="size-4 text-faint" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search in English or 中文"
          className="w-full bg-transparent py-3 text-base outline-none placeholder:text-faint"
          type="search"
        />
      </label>
      <ul className="mt-4 grid gap-3">
        {visible.length === 0 && <li className="py-8 text-center text-muted">No term like that yet.</li>}
        {visible.map((item) => (
          <li key={item.term} className="rounded-3xl bg-surface p-4 shadow-border">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl leading-tight">{item.term}</h2>
                {progress.settings.showZh && <p className="mt-0.5 text-sm font-medium text-primary">{item.zh}</p>}
              </div>
              {hear && (
                <button
                  type="button"
                  onClick={() => speak(`${item.term}. ${item.say}`)}
                  className="press grid size-11 shrink-0 place-items-center rounded-full bg-wash text-primary"
                  aria-label={`Hear ${item.term}`}
                >
                  <Volume2 className="size-4" />
                </button>
              )}
            </div>
            <p className="mt-2 text-base leading-snug text-muted">{item.plain}</p>
            <p className="mt-3 border-l-2 border-primary pl-3 font-display text-lg leading-snug">{item.say}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
